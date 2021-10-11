import Logger from "../../logger/winston-logger";
import BaseEntity from "../entities/base/base-entity";
import Scheduler from "../entities/scheduler";
import GardenUser from "../entities/user";
import ActionType from "../enums/action-type";
import EventType from "../enums/event-type";
import entityManager from "./entity-manager";
import EntityManager from "./entity-manager";
import userManager from "./user-manager";

class GardenManager {

    private listeners: Array<Function> = [];

    private scheduler: Scheduler | undefined;

    // Register a listener to receive garden state updates
    public registerListener(callback: Function) {
        this.listeners.push(callback);
        if (process.env.ENV_TYPE == 'DEV') {
            Logger.info("Registered Garden Listener.");
        }
    }

    // Sends garden entity state to listeners
    public async updateState(entity: BaseEntity, user?: GardenUser) {
        this.listeners.forEach((callback) => {
            const state = entity.toState();
            if (user)
            state["user"] = user.getId();
            callback(state);
        });
    }

    public async interact(userId: string, action: string, entityId: number) {
        if (!userManager.hasUser(userId)) {
            throw new Error("User not found.");
        }
        if (!Object.values(ActionType).includes(action.toUpperCase())) {
            throw new Error("Unknown Action Type.");
        }
        if (entityManager.isEntity(entityId)) {
            throw new Error("No such entity with provided ID.");
        }
        const user: GardenUser = userManager.getUser(userId) as GardenUser;
        const actionType: ActionType = Object.values(ActionType)
            .find((type) => (type === action.toUpperCase())) as ActionType;
        const entity: BaseEntity = entityManager.getEntity(entityId);
        // Check if it's bench
        if (!entity.canPerform(user, actionType)) {
            throw new Error("That action cannot be performed on this entity");
        }

        entity.execute(user, actionType);
    }

    public setScheduler(scheduler: Scheduler) {
        this.scheduler = scheduler;
    }

    public getScheduler(): Scheduler {
        return this.scheduler as Scheduler;
    }

    public createEntities() {

    }

}

export default new GardenManager();