const sequelize = require('../data-access/user.connection.js');
const userModel = require('./user.model.js');
const groupModel = require('./group.model.js');

const userGroupModel = sequelize.define('user-group', {}, { timestamps: false });

userModel.belongsToMany(groupModel, { through: userGroupModel });
groupModel.belongsToMany(userModel, { through: userGroupModel });

module.exports = userGroupModel;
