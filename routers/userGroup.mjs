import express from 'express';
import userGroupModel from '../models/userGroup.model.mjs';
import UserGroupService from '../services/userGroup.service.mjs';

const router = express.Router();
const userGroupService = new UserGroupService(userGroupModel);

router.route('/userGroup').get(async (req, res) => {
    res.json(await userGroupService.findAll());
});

router.route('/userGroup/:group_id').post(async (req, res) => {
    const userIds = [...req.body.users];
    await userGroupService.addUsersToGroup(req.params.group_id, userIds);
    res.status(204).json({
        message: `Users (${userIds}) added to group with id ${req.params.group_id}`
    });
});

export default router;
