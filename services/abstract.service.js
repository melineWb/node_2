class AbstractService {
    constructor(model) {
        this.model = model;
    }

    async findAll() {
        return await this.model.findAll();
    }

    async findById(id) {
        return await this.model.findByPk(id);
    }

    async update(newData, data) {
        return await data.update({ ...data, ...newData });
    }

    async create(data) {
        return await this.model.create(data);
    }

    async remove(data) {
        if (data) {
            return await data.update({
                ...data,
                ...{
                    is_deleted: true
                }
            });
        }
    }
}

module.exports = AbstractService;
