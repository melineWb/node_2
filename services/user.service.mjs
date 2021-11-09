import pkg from 'sequelize';
const { Op } = pkg;

class UserSerice {
    constructor(userModel) {
        this.userModel = userModel;
    }

    async findAll() {
        return await this.userModel.findAll();
    }

    async findById(id) {
        return await this.userModel.findByPk(id);
    }

    async update(newData, user) {
        return await user.update({ ...user, ...newData });
    }

    async create(data) {
        return await this.userModel.create(data);
    }

    async remove(user) {
        if (user) {
            return await user.update({
                ...user,
                ...{
                    is_deleted: true
                }
            });
        }
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

export default UserSerice;
