
const mongoose = require('mongoose')

/* Database Connection */
const dbConnection = async () => {
    const DATABASE_URL = process.env.DB_URL
    try {
        await mongoose.connect(`${DATABASE_URL}`, {
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