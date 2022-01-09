const AbstractService = require('./abstract.service');

class GroupService extends AbstractService {
    constructor(groupModel) {
        super(groupModel);
    }

    async remove(data) {
        if (data) {
            return await data.destroy({ where: { id: data.id } });
        }
    }
}

module.exports = GroupService;
