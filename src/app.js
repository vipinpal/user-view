import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import bodyParser from 'body-parser';

import { DbConnection } from './dbs/mongoose-db-connect';
import { appRoutes } from './routes/routes';
import { Logger } from './shared/middleware/logger.mw';

const app = express();
const port = 3002;
 
// appmiddelware
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
appRoutes(app);

// error handling
app.use((err, req, res, next)=>{
    if(err){
        return res.status(500).send(err);
    }
    return res.status(500).send('Something happen wrong!!!');
});
 
// connect with db and checking is db connected or not once db connection is up then listen app at given port
const dbConnection = async () => {
    try {
        const db = await DbConnection();
        if (db) {
            //can start server here!!!
            app.listen(port, (error, result) => {
                if (error) return Logger.log(error);
                Logger.log(`your server is start on port ${port} on ==> ${new Date()}`);
            });
        }
    } catch (e) {
        if (e) return Logger.log(e);
    };
}

dbConnection();