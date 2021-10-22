import express from 'express';
import createError from 'http-errors';
import * as userHelpers from './userHelpers.mjs';

console.log(userHelpers);

const port = process.env.port || '3000';
const app = express();
const router = express.Router();

app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});

router.param('user_id', function (req, res, next, id) {
    const user = userHelpers.default.find((element) => {
        return element.id === +id;
    });

    req.data = user ?? createError(404);
    next();
});

router
    .route('/user/:user_id')
    .get(function (req, res) {
        res.json(req.data);
    })
    .put(function (req, res) {
        req.user.name = req.params.name;
        res.json(req.user);
    })
    .post(function (req, res) {
        console.log('b =' + req.body);
        res.end();
    })
    .delete(function (req, res, next) {
        next(new Error('not implemented'));
    });

app.use('/', router);

app.get('/', function (req, res) {
    res.send('hello world');
});
