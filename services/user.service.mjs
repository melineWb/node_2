import pkg from 'sequelize';
const { Op } = pkg;

import AbstractService from './abstract.service.mjs';

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
}

export default UserService;
