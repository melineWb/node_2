const express = require('express');
const logger = require('./config/winston.js');
const cors = require('cors');
const dotenv = require('dotenv');

const usersRouter = require('./routers/users.js');
const groupsRouter = require('./routers/groups.js');
const userGroupRouter = require('./routers/userGroup.js');
const logService = require('./services/logService.js');
const utilService = require('./services/utilsService.js');
const middlewareService = require('./services/middlewareService.js');

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
