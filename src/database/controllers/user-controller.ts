import UserRepository from "../repositories/user-repository";
import ActionType from "../../garden/enums/action-type";
import StatsRepository from "../repositories/stats-repository";
import mongoose from "mongoose";
import createResponse from "../../factory/response-factory";
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

    public async getTopUsers(action: string): Promise<Array<string>> {
        if (!Object.values(ActionType).includes(action.trim().toUpperCase().replace(" ", "_"))) {
            throw new Error("Action does not exist");
        }
        const actionType: number = parseInt(ActionType[Object.values(ActionType)
            .find((type) => (type === action.trim().toUpperCase().replace(" ", "_"))) as ActionType]);
        const field = this.getFieldRelated(actionType);
        const results = await UserRepository.getAll(field, false, 10, "nickname " + field);
        const array = [];
        for (let i = 0; i < 10; i++) {
            if (results.length > i) {
            let obj = results[i];
            array.push(obj.nickname + " - " + obj[field]);
            } else {
            array.push("---");
            }
        }
        return array;
    }

    public async addInteraction(user: GardenUser, action: ActionType, extra?) {
        if (!action) {
            StatsRepository.increase('connections', 1);
        } else {
            const field = this.getFieldRelated(action) as string;
            const globalField = "total" + field.charAt(0).toUpperCase() + field.slice(1);
            StatsRepository.increase(globalField, (action === ActionType.STAND_UP ? extra : 1));
            if (action !== ActionType.WATER)
            UserRepository.increase(user.getId(), field, (action === ActionType.STAND_UP ? extra : 1));
            }
    }

    private getFieldRelated(type: ActionType): string {
        switch (+type) {
            case ActionType.HARVEST:
                return 'fruitsHarvested';
            case ActionType.WATER:
                return 'gallonsOfWater';
            case ActionType.PET:
                return 'animalsPetted'
            case ActionType.FEED:
                return 'animalsFed';
            case ActionType.CLEAN:
                return 'decorationsCleaned';
            case ActionType.POLLINATE:
                return 'flowersPollinated';
            case ActionType.STAND_UP:
                return 'minutesSatOnBench';
        }
    }

}

export default UserController;