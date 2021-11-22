class UserGroupService {
    constructor(userGroupModel) {
        this.model = userGroupModel;
    }

    async findAll() {
        return await this.model.findAll();
    }

    async addUsersToGroup(groupId, userIds) {
        await userIds.forEach(async (userId) => {
            await this.model.create({ userId, groupId });
        });
    }
}

export default UserGroupService;
