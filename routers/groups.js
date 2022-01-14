const express = require('express');
const groupController = require('../controllers/groups/group.controller.js');

const router = express.Router();

router.param('group_id', groupController.geGroupById);

router.route('/groups').get(groupController.getGroups);

router.route('/group/:group_id').get(groupController.getGroup).put(groupController.putGroup).delete(groupController.deleteGroup);

router.route('/group').post(groupController.postGroup);

module.exports = router;
