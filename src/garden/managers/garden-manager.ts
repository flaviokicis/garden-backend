import Logger from "../../logger/winston-logger";
import BaseEntity from "../entities/base/base-entity";
import Scheduler from "../entities/scheduler";
import EntityManager from "./entity-manager";

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
    public async updateState(entity: BaseEntity) {
        this.listeners.forEach((callback) => {
            callback(entity.toState());
        });
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