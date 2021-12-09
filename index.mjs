import express from 'express';
import usersRouter from './routers/users.mjs';
import groupsRouter from './routers/groups.mjs';
import userGroupRouter from './routers/userGroup.mjs';
import logService from './services/logService.mjs';

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
