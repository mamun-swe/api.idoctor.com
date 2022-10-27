const { cpus } = require("os");
const process = require("process");
const cluster = require("cluster");
const { app } = require("./api/app");
const { dbConnection } = require("./api/config/db.config");

const numCPUs = cpus().length;
const PORT = process.env.PORT || 5007;

if (cluster.isMaster) {
  console.log(`Primary ${process.pid} is running`);

  /* Fork workers. */
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {

/* Start app to specific PORT & establish database connection */
  app.listen(PORT, () => {
    dbConnection();
    console.log(`App running on ${PORT} port`);
  });
}
