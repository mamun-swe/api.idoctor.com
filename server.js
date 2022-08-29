

const { cpus } = require("os")
const process = require("process")
const cluster = require("cluster")
const { app } = require("./api/app")
const { dbConnection } = require('./api/config/db.config')

const numCPUs = cpus().length
const PORT = process.env.APP_PORT || 5000

if (cluster.isMaster) {
    console.log(`Primary ${process.pid} is running`)

    /* Fork workers. */
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork()
    }

    cluster.on("exit", (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`)
    })
}

/* Start app to specific PORT & establish database connection */
else {
    app.listen(PORT, () => {
        dbConnection()
        console.log(`App running on ${PORT} port`)
    })
}