import express from 'express';
import createError from 'http-errors';

import UserSerice from '../services/user.service.mjs';
import validateData from '../services/user.validator.mjs';
import userModel from '../models/user.model.mjs';

const router = express.Router();
const userService = new UserSerice(userModel);

router.param('user_id', async (req, res, next, id) => {
    const data = await userService.findById(id);

    req.data = data ? data : createError(404);
    next();
});

router.route('/users/suggest').get(async (req, res) => {
    let suggestedUsers = [];
    if (req.query) {
        suggestedUsers = await userService.getAutoSuggestUsers(req.query.login, req.query.limit);
    }
    res.send(suggestedUsers);
});

router.route('/users').get(async (req, res) => {
    res.json(await userService.findAll());
});

router
    .route('/user/:user_id')
    .get((req, res) => {
        res.json(req.data);
    })
    .put(async (req, res) => {
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
            } else {
                await userService.create(req.body, req.params.user_id);
                res.status(204).json({
                    message: `User with id = ${req.params.user_id} successfully created`
                });
            }
        }
    })
    .delete(async (req, res) => {
        if (req.data) {
            const user = await userService.remove(req.data);
            res.status(204).json({
                message: `User with id = ${user.id} successfully removed`
            });
        } else {
            res.json(req.data);
        }
    });

router.route('/user').post(async (req, res) => {
    const error = validateData(req.body);

    if (error) {
        res.status(400).json({ errorResponse: error.details });
    } else {
        await userService.create(req.body);
        res.status(204).json({
            message: `User with id = ${req.index} successfully created`
        });
    }
});

export default router;
