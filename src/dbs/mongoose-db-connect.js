const mongoose = require('mongoose')
import { Logger } from '../shared/middleware/logger.mw';

// Config Files
const dbConfig = require('../config/dbs')

// Database Connection Mongoose

mongoose.connection.on('error', (err) => {
    Logger.log('Database error ' + err)
});

mongoose.connection.on("disconnected", () => {
    Logger.log("mongodb is disconnected");
});

const DbConnection = async () => {
    try {
        let db = await mongoose.connect(dbConfig.database, { useNewUrlParser: true, useUnifiedTopology: true });
        return db
    } catch (e) {
        Logger.log('error occur while connecting DB ' + e);
        throw new Error('error occur while connecting DB ' + e);
    }
}

export { DbConnection }