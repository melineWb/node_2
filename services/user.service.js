const pkg = require('sequelize');
const { Op } = pkg;

const AbstractService = require('./abstract.service');
const userModel = require('../models/user.model');

class UserService extends AbstractService {
    constructor(userModel) {
        super(userModel);
    }

    async getAutoSuggestUsers(loginSubstring, limit = 1) {
        const users = await this.userModel.findAll({
            where: {
                login: {
                    [Op.iLike]: `%${loginSubstring}%`,
                },
            },
            order: [['login', 'ASC']],
            limit,
        });
        return users;
    }

    async findByCredentials(login, password) {
        const data = await this.model.findAll({
            where: {
                login,
                password,
                is_deleted: {
                    [Op.not]: true,
                },
            },
            limit: 1,
        });

        return data;
    }
}

const userService = new UserService(userModel);

module.exports = userService;
