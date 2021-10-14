import UserRepository from "../repositories/user-repository";
import ActionType from "../../garden/enums/action-type";
import StatsRepository from "../repositories/stats-repository";
import mongoose from "mongoose";
import createResponse from "../../factory/response-factory";
import httpError from 'http-status-enum'
import { ControllerInstance } from "../../garden/utils/database-instance";
import GardenUser from "../../garden/entities/user";

class UserController extends ControllerInstance {

    public async createUser(nickname) {
        const user = await UserRepository.createNew({nickname: nickname});
        return user._id;
    }

    public async getUser(id) {
        return await UserRepository.getById(id);
    }

    public async getTopUsers(action: ActionType) {
        // TODO
    }

    public async addInteraction(user: GardenUser, action: ActionType, extra?) {
        if (!action) {
            StatsRepository.increase('connections', 1);
        } else {
            switch (action) {
                case ActionType.STAND_UP:
                    StatsRepository.increase('totalMinutesSatOnBench', extra);
                    UserRepository.increase(user.getId(), 'totalMinutesSatOnBench', extra);
                    break; 
                case ActionType.CLEAN:
                    StatsRepository.increase('totalDecorationsCleaned', 1);
                    UserRepository.increase(user.getId(), 'decorationsCleaned', 1);
                    break; 
                case ActionType.FEED:
                    StatsRepository.increase('totalAnimalsFed', 1);
                    UserRepository.increase(user.getId(), 'animalsFed', 1);
                    break; 
                case ActionType.PET:
                    StatsRepository.increase('totalAnimalsPetted', 1);
                    UserRepository.increase(user.getId(), 'animalsPetted', 1);
                    break;
                case ActionType.POLLINATE:
                    StatsRepository.increase('totalFlowersPollinated', 1);
                    UserRepository.increase(user.getId(), 'flowersPollinated', 1);
                    break;
                case ActionType.HARVEST:
                    StatsRepository.increase('totalFruitsHarvested', 1);
                    UserRepository.increase(user.getId(), 'fruitsHarvested', 1);
                    break; 
                case ActionType.WATER:
                    StatsRepository.increase('totalGallonsOfWater', 1);
                    break;
            }
            }
    }

}

export default UserController;