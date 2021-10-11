import UserRepository from "../repositories/user-repository";
import ActionType from "../../garden/enums/action-type";
import StatsRepository from "../repositories/stats-repository";
import mongoose from "mongoose";
import createResponse from "../../factory/response-factory";
import httpError from 'http-status-enum'
import { ControllerInstance } from "../../garden/utils/DatabaseInstance";
import GardenUser from "../../garden/entities/user";

class UserController extends ControllerInstance {

    public async createUser(nickname) {

    }

    public async getUser(id) {
        if (!id) {
            createResponse(httpError.BAD_REQUEST, "ID is not valid");
        }
        let objID: mongoose.Types.ObjectId;
        try {
            objID = new mongoose.Types.ObjectId(id);
        } catch (error) {
            throw new Error("ID is not a valid Mongo id");
        }
        return await UserRepository.getById(id);
    }

    public async getTopUsers(action: ActionType) {

    }

    public async addInteraction(user: GardenUser, action: ActionType, extra?) {
            try {
                switch (action) {
                    case ActionType.STAND_UP:
                        StatsRepository.increase('totalMinutesSatOnBench', extra);
                        break; 
                }
            } catch (error) {
                throw error;
            }
    }

}

export default UserController;