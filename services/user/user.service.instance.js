const UserService = require('./user.service.js');
const userModel = require('../../models/user.model.js');
const instance = new UserService(userModel);

module.exports = instance;
