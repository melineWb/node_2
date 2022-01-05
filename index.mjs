import express from 'express';
import logger from './config/winston.mjs';
import cors from 'cors';
import dotenv from 'dotenv';

import usersRouter from './routers/users/users.mjs';
import groupsRouter from './routers/groups.mjs';
import userGroupRouter from './routers/userGroup.mjs';
import logService from './services/logService.mjs';
import utilService from './services/utilsService.mjs';
import middlewareService from './services/middlewareService.mjs';

dotenv.config();
const port = process.env.port || '3000';
const app = express();

app.listen(port, () => {
    console.log(`CORS-enabled web server listening on port http://localhost:${port}`);
});

app.use(express.json());
app.use(logService);
app.use(cors());

app.use('/', usersRouter);
app.use('/', middlewareService.authenticateToken, groupsRouter);
app.use('/', middlewareService.authenticateToken, userGroupRouter);

app.get('/', middlewareService.authenticateToken, (req, res) => {
    res.send('hello world');
});

app.use((error, req, res, next) => {
    if (!error.statusCode) error.statusCode = 500;
    return res.status(error.statusCode).json({ error: error.toString() });
});

process.on('uncaughtException', (err) => {
    const log = `[${utilService.getTime()}] UncaughtException: ${err.message}`;
    logger.error(log);
    process.exit(1);
});
