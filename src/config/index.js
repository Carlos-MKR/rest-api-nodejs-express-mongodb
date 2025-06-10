

require('dotenv').config();

module.exports.Config = {
    port: process.env.PORT,
    mongoUrl: process.env.MONGO_URL,
    mongoDbName: process.env.MONGO_DB_NAME
}