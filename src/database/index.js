

const { MongoClient } = require('mongodb');
const debug = require('debug')('app:database');

const { Config } = require('../config/index');

var connection = null;

module.exports.Database = (collection) => new Promise( async (resolve, reject) => {
    try {
        if (!connection) {
        
            const client = new MongoClient(Config.mongoUrl);
            connection = await client.connect();
            debug('Connected to MongoDB');
        }
        debug('using existing connection');
        const db = connection.db(Config.mongoDbName);
        resolve(db.collection(collection));
    } catch (error) {
        reject(error);
    }
});