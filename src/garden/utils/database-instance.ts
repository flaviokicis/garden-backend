import GardenUser from "../entities/user";
import ActionType from "../enums/action-type";


export abstract class ControllerInstance {

    public abstract addInteraction(user: GardenUser, action: ActionType, extra?): void;

    public abstract createUser(nickname: string): Promise<string>;

}

class ControllerInstanceManager {

    private instance: ControllerInstance;

    public setInstance(instance: ControllerInstance) {
        this.instance = instance;
    }

    public getInstance(): ControllerInstance {
        return this.instance;
    }

}

export default new ControllerInstanceManager();