import express from 'express';
import createError from 'http-errors';

import groupModel from '../models/group.model.mjs';
import GroupService from '../services/group.service.mjs';

const router = express.Router();
const groupService = new GroupService(groupModel);

router.param('group_id', async (req, res, next, id) => {
    const data = await groupService.findById(id);

    req.data = data ? data : createError(404);
    next();
});

router.route('/groups').get(async (req, res) => {
    res.json(await groupService.findAll());
});

router
    .route('/group/:group_id')
    .get((req, res) => {
        res.json(req.data);
    })
    .put(async (req, res) => {
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
    })
    .delete(async (req, res) => {
        if (req.data) {
            const group = await groupService.remove(req.data);
            res.status(204).json({
                message: `Group with id = ${group.id} successfully removed`
            });
        } else {
            res.json(req.data);
        }
    });

router.route('/group').post(async (req, res) => {
    await groupService.create(req.body);
    res.status(204).json({
        message: `Group with id = ${req.index} successfully created`
    });
});

export default router;
