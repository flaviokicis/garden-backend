import Logger from "../../logger/winston-logger";
import statsModel from "../models/stats-model";
import RepositoryBase from "./base/repository-base";


class StatsRepository {

    private base: RepositoryBase;

    constructor() {
        this.base = new RepositoryBase(statsModel.modelName);
    }

    public async increase(field, value) {
        const id = new Date().toISOString().slice(0, 10);
        const data = {};
        data[field] = value;
        if (!(await this.base.getById(id)))
            return await this.base.create(data);
        else {
            return await this.base.updateIncrease(id, data);
        }
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

export default new StatsRepository();