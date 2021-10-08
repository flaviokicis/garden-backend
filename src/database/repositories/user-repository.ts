import userModel from "../models/user-model";
import RepositoryBase from "./base/repository-base";


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

}

export default new UserRepository();