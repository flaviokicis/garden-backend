import mongoose, { Model } from 'mongoose';

class RepositoryBase {

    public model: Model<any>;

    constructor(name: string) {
        this.model = mongoose.model(name);
    }

    public async create(data) {
        return await this.model.create(data);
    }

    public async update(id, data) {
        return await this.model.findByIdAndUpdate(
            id,
            { $set: data },
            { new: true }
        );
    }

    public async updateIncrease(id, data) {
        return await this.model.findByIdAndUpdate(
            id,
            { $inc: data },
            { new: true }
        );
    }

    public async getAll(filterParams, projection = "") {
        const { filter, limit, sort } = filterParams;

        const data = await this.model
            .find(filter, projection)
            .limit(limit)
            .sort(sort)

        return data
    }

    public async getById(id, projection = "") {
        return await this.model.findById(id, projection);
    }

    public async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

}

export default RepositoryBase;