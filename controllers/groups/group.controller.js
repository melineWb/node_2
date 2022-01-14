const createError = require('http-errors');
const groupService = require('../../services/group.service');

const groupController = {
    async geGroupById(req, res, next, id) {
        if (!id) {
            createError(404);
        }
        const data = await groupService.findById(id);

        req.data = data ? data : createError(404);
        next();
    },

    async getGroups(req, res, next) {
        try {
            res.json(await groupService.findAll());
        } catch (err) {
            return next(err);
        }
    },

    getGroup(req, res, next) {
        try {
            res.status(200).json(req.data);
        } catch (err) {
            return next(err);
        }
    },

    async putGroup(req, res, next) {
        try {
            if (req.data?.id) {
                await groupService.update(req.body, req.data);
                res.status(204).json({
                    message: `Group with id = ${req.params.group_id} successfully updated`
                });
            } else {
                await groupService.create(req.body, req.params.group_id);
                res.status(204).json({
                    message: `Group with id = ${req.params.group_id} successfully created`
                });
            }
        } catch (err) {
            return next(err);
        }
    },

    async deleteGroup(req, res, next) {
        try {
            if (req.data) {
                const group = await groupService.remove(req.data);
                res.status(204).json({
                    message: `Group with id = ${group.id} successfully removed`
                });
            } else {
                res.json(req.data);
            }
        } catch (err) {
            return next(err);
        }
    },

    async postGroup(req, res, next) {
        try {
            const group = await groupService.create(req.body);
            res.status(204).json({
                message: `Group with id = ${group.id} successfully created`
            });
        } catch (err) {
            return next(err);
        }
    }
};

module.exports = groupController;
