
const { connect } = require('mongoose')
const DATABASE_URL = process.env.DB_URL

/* Database Connection */
const dbConnection = async () => {
    try {
        await connect(DATABASE_URL, {
            useUnifiedTopology: true,
            useCreateIndex: true,
            useNewUrlParser: true
        })
        console.log('Database connection established.')
    } catch (error) {
        if (error) console.log(error.message)
    }
}

module.exports = {
    dbConnection
}