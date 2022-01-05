import pkg from 'sequelize';
const { Op } = pkg;

import AbstractService from '../abstract.service.mjs';

class UserService extends AbstractService {
    constructor(userModel) {
        super(userModel);
    }

    async getAutoSuggestUsers(loginSubstring, limit = 1) {
        const users = await this.userModel.findAll({
            where: {
                login: {
                    [Op.iLike]: `%${loginSubstring}%`
                }
            },
            order: [['login', 'ASC']],
            limit
        });
        return users;
    }

    async findByCredentials(login, password) {
        const data = await this.model.findAll({
            where: {
                login,
                password,
                is_deleted: {
                    [Op.not]: true
                }
            },
            limit: 1
        });

        return data;
    }
}

export default UserService;