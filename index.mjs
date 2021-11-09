import express from 'express';
import router from './routers/users.mjs';

const port = process.env.port || '3000';
const app = express();

app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});

app.use(express.json());

app.use('/', router);

app.get('/', (req, res) => {
    res.send('hello world');
});
