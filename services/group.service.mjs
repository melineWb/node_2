import AbstractService from './abstract.service.mjs';

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

export default GroupService;
