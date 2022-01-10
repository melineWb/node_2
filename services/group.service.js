const AbstractService = require('./abstract.service');
const groupModel = require('../models/group.model');

class GroupService extends AbstractService {
    constructor(model) {
        super(model);
    }

    async remove(data) {
        if (data) {
            return await data.destroy({ where: { id: data.id } });
        }
    }
}

const userService = new GroupService(groupModel);

module.exports = userService;
