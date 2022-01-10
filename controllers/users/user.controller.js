const createError = require('http-errors');

const userService = require('../../services/user.service.js');
const validateData = require('../../services/user.validator.js');
const authorizationService = require('../../services/authorization.service.js');

const userController = {
    async getUserById(req, res, next, id) {
        if (!id) {
            createError(404);
        }
        const data = await userService.findById(id);

        req.data = data ? data : createError(404);
        next();
    },

    async login(req, res, next) {
        try {
            const { username, password } = req.body;
            const user = await userService.findByCredentials(username, password);

            if (user.length) {
                const token = authorizationService.login({
                    username,
                    password,
                });

                res.json(token);
            } else {
                res.sendStatus(403);
            }
        } catch (err) {
            return next(err);
        }
    },

    async getSuggest(req, res, next) {
        try {
            let suggestedUsers = [];
            if (req.query && Object.keys(req.query).length !== 0) {
                suggestedUsers = await userService.getAutoSuggestUsers(req.query.login, req.query.limit);
            }
            res.send(suggestedUsers);
        } catch (err) {
            return next(err);
        }
    },

    async getUsers(req, res, next) {
        try {
            res.json(await userService.findAll());
        } catch (err) {
            return next(err);
        }
    },

    getUser(req, res, next) {
        try {
            res.status(200).json(req.data);
        } catch (err) {
            return next(err);
        }
    },

    async putUser(req, res, next) {
        try {
            if (req.data?.id) {
                const error = validateData(req.body, true);

                if (error) {
                    res.status(400).json({ errorResponse: error.details });
                } else {
                    await userService.update(req.body, req.data);
                    res.status(204).json({
                        message: `User with id = ${req.params.user_id} successfully updated`,
                    });
                }
            } else {
                const error = validateData(req.body);

                if (error) {
                    res.status(400).json({ errorResponse: error.details });
                }
                await userService.create(req.body, req.params.user_id);
                res.status(204).json({
                    message: `User with id = ${req.params.user_id} successfully created`,
                });
            }
        } catch (err) {
            return next(err);
        }
    },

    async deleteUser(req, res, next) {
        try {
            if (req.data) {
                const user = await userService.remove(req.data);
                res.status(204).json({
                    message: `User with id = ${user.id} successfully removed`,
                });
            }
        } catch (err) {
            return next(err);
        }
    },

    async postUser(req, res, next) {
        try {
            const error = validateData(req.body);

            if (error) {
                res.status(400).json({ errorResponse: error.details });
            }
            const user = await userService.create(req.body);
            res.status(204).json({
                message: `User with id = ${user.id} successfully created`,
            });
        } catch (err) {
            return next(err);
        }
    },
};

module.exports = userController;
