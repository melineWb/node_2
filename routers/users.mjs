import express from 'express';
import createError from 'http-errors';

import UserService from '../services/user.service.mjs';
import validateData from '../services/user.validator.mjs';
import userModel from '../models/user.model.mjs';
import middlewareService from '../services/middlewareService.mjs';
import authorizationService from '../services/authorization.service.mjs';

const router = express.Router();
const userService = new UserService(userModel);

router.param('user_id', async (req, res, next, id) => {
    const data = await userService.findById(id);

    req.data = data ? data : createError(404);
    next();
});

router.route('/login').post(async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await userService.findByCredentials(username, password);

        if (user.length) {
            const token = authorizationService.login({
                username,
                password
            });

            res.json(token);
        } else {
            res.sendStatus(403);
        }
    } catch (err) {
        return next(err);
    }
});

router.route('/users/suggest').get(middlewareService.authenticateToken, async (req, res, next) => {
    try {
        let suggestedUsers = [];
        if (req.query) {
            suggestedUsers = await userService.getAutoSuggestUsers(req.query.login, req.query.limit);
        }
        res.send(suggestedUsers);
    } catch (err) {
        return next(err);
    }
});

router.route('/users').get(middlewareService.authenticateToken, async (req, res, next) => {
    try {
        res.json(await userService.findAll());
    } catch (err) {
        return next(err);
    }
});

router
    .route('/user/:user_id')
    .get(middlewareService.authenticateToken, (req, res, next) => {
        try {
            res.status(200).json(req.data);
        } catch (err) {
            return next(err);
        }
    })
    .put(middlewareService.authenticateToken, async (req, res, next) => {
        try {
            if (req.data?.id) {
                const error = validateData(req.body, true);

                if (error) {
                    res.status(400).json({ errorResponse: error.details });
                } else {
                    await userService.update(req.body, req.data);
                    res.status(204).json({
                        message: `User with id = ${req.params.user_id} successfully updated`
                    });
                }
            } else {
                const error = validateData(req.body);

                if (error) {
                    res.status(400).json({ errorResponse: error.details });
                }
                await userService.create(req.body, req.params.user_id);
                res.status(204).json({
                    message: `User with id = ${req.params.user_id} successfully created`
                });
            }
        } catch (err) {
            return next(err);
        }
    })
    .delete(middlewareService.authenticateToken, async (req, res, next) => {
        try {
            if (req.data) {
                const user = await userService.remove(req.data);
                res.status(204).json({
                    message: `User with id = ${user.id} successfully removed`
                });
            }
            res.json(req.data);
        } catch (err) {
            return next(err);
        }
    });

router.route('/user').post(middlewareService.authenticateToken, async (req, res, next) => {
    try {
        const error = validateData(req.body);

        if (error) {
            res.status(400).json({ errorResponse: error.details });
        }
        await userService.create(req.body);
        res.status(204).json({
            message: `User with id = ${req.index} successfully created`
        });
    } catch (err) {
        return next(err);
    }
});

export default router;
