import express from 'express';
import usersRouter from './routers/users.mjs';
import groupsRouter from './routers/groups.mjs';
import userGroupRouter from './routers/userGroup.mjs';
import logService from './services/logService.mjs';
import utilService from './services/utilsService.mjs';
import logger from './config/winston.mjs';

const port = process.env.port || '3000';
const app = express();

app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});

app.use(express.json());
app.use(logService);

app.use('/', usersRouter);
app.use('/', groupsRouter);
app.use('/', userGroupRouter);

app.get('/', (req, res) => {
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
