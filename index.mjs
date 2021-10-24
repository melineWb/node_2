import express from 'express';
import createError from 'http-errors';

import * as userHelpers from './userHelpers.mjs';
import validateData from './userValidator.mjs';

const port = process.env.port || '3000';
const app = express();
const router = express.Router();

app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
});

router.param('user_id', (req, res, next, id) => {
    let index;
    const user = userHelpers.default.find((element, i) => {
        const isCurrent = element.id === id;
        if (isCurrent) {
            index = i;
        }
        return isCurrent;
    });

    req.data = user ? { user, index } : createError(404);
    next();
});

app.use(express.json());

router.route('/users/suggest').get((req, res) => {
    let suggestedUsers = [];
    if (req.query) {
        suggestedUsers = userHelpers.getAutoSuggestUsers(req.query.login, req.query.limit);
    }
    res.send(suggestedUsers);
});

router.route('/users').get((req, res) => {
    res.json(userHelpers.default);
});

router
    .route('/user/:user_id')
    .get((req, res) => {
        if (req.data?.user) {
            res.json(req.data.user);
        } else {
            res.json(req.data);
        }
    })
    .put((req, res) => {
        if (req.data?.user) {
            const error = validateData(req.body, true);

            if (error) {
                res.status(400).json({ errorResponse: error.details });
            } else {
                userHelpers.update(req.body, req.data);
                res.status(204).json({
                    message: `User with id = ${req.params.user_id} successfully updated`
                });
            }
        } else {
            const error = validateData(req.body);

            if (error) {
                res.status(400).json({ errorResponse: error.details });
            } else {
                userHelpers.create(req.body, req.params.user_id);
                res.status(204).json({
                    message: `User with id = ${req.params.user_id} successfully created`
                });
            }
        }
    })
    .delete((req, res) => {
        if (req.data?.user) {
            const user = userHelpers.remove(req.data.user);
            res.status(204).json({
                message: `User with id = ${user.id} successfully removed`
            });
        } else {
            res.json(req.data);
        }
    });

router.route('/user').post((req, res) => {
    const error = validateData(req.body);

    if (error) {
        res.status(400).json({ errorResponse: error.details });
    } else {
        userHelpers.create(req.body);
        res.status(204).json({
            message: `User with id = ${req.index} successfully created`
        });
    }
});

app.use('/', router);

app.get('/', (req, res) => {
    res.send('hello world');
});
