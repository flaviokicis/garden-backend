import userModel from "../models/user-model";
import RepositoryBase from "./base/repository-base";
import mongoose from 'mongoose';


class UserRepository {

    private base: RepositoryBase;

    constructor() {
        this.base = new RepositoryBase(userModel.modelName);
    }

    public async createNew(data) {
        return await this.base.create(data);
    }

    public async getById(id, projection = "") {
        return await this.base.getById(id, projection);
    }

    public async getAll(sort?: any, asc?: boolean, limit?: number, projection?: string) {
        const params = {};
        if (sort) {
            params["sort"] = { sort: (asc === true ? 1 : -1) }
        }
        if (limit) {
            params["limit"] = limit;
        }
        return await this.base.getAll(params, projection);
    }

    public async increase(id, field, value) {
        const data = {};
        data[field] = value;
        const objId = new mongoose.Types.ObjectId(id);
        if (!(await this.base.getById(objId)))
            return await this.base.create(data);
        else {
            return await this.base.updateIncrease(objId, data);
        }
    }

}

export default new UserRepository();