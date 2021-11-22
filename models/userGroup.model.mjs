import sequelize from '../data-access/user.connection.mjs';
import userModel from './user.model.mjs';
import groupModel from './group.model.mjs';

const userGroupModel = sequelize.define('user-group', {}, { timestamps: false });

userModel.belongsToMany(groupModel, { through: userGroupModel });
groupModel.belongsToMany(userModel, { through: userGroupModel });

export default userGroupModel;
