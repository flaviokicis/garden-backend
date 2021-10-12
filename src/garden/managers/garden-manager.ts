import Logger from "../../logger/winston-logger";
import GardenConfig from "../../main/config";
import AbstractConnectionManager from "../../wrappers/connection-manager-wrapper";
import BaseEntity from "../entities/base/base-entity";
import Scheduler from "../entities/scheduler";
import GardenUser from "../entities/user";
import ActionType from "../enums/action-type";
import EntityType from "../enums/entity-type";
import EventType from "../enums/event-type";
import GardenFactory from "../factory/garden-factory";
import entityManager from "./entity-manager";
import EntityManager from "./entity-manager";
import userManager from "./user-manager";

class GardenManager {

    private scheduler: Scheduler | undefined;

    private factory: GardenFactory;

    private connectionManager: AbstractConnectionManager;

    constructor() {
        this.factory = new GardenFactory();
    }

    public getGardenFactory() {
        return this.getGardenFactory();
    }

    public setConnectionManager(conManager: AbstractConnectionManager) {
        this.connectionManager = conManager;
    }

    // Sends garden entity state to listeners
    public async updateState(entity: BaseEntity, user?: GardenUser) {
        const state = entity.toState();
            if (user)
            state["user"] = user.getId();
        this.connectionManager.update(state);
    }

    public async interact(userId: string, action: string, entityId: number) {
        if (!userManager.hasUser(userId)) {
            throw new Error("User not found.");
        }

        if (!Object.values(ActionType).includes(action.toUpperCase())) {
            throw new Error("Unknown Action Type.");
        }

        if (!entityManager.isEntity(entityId)) {
            throw new Error("No such entity with provided ID.");
        }

        const user: GardenUser = userManager.getUser(userId) as GardenUser;

        // Get action type
        const actionType: ActionType = Object.values(ActionType)
            .find((type) => (type === action.toUpperCase())) as ActionType;

        const entity: BaseEntity = entityManager.getEntity(entityId);

        // Check if it's bench


        if (!entity.canPerform(user, actionType)) {
            throw new Error("That action cannot be performed right now.");
        }

        entity.execute(user, actionType);
    }

    public setScheduler(scheduler: Scheduler) {
        this.scheduler = scheduler;
    }

    public getScheduler(): Scheduler {
        return this.scheduler as Scheduler;
    }

    public async getGardenState() {
        const fruits = [];
        const animals = [];
        const flowers = [];
        const decorations = [];
        const objState = {};
        for (let entity of entityManager.getAllEntities()) {
           if (entity.getEntityType() === EntityType.FRUIT) {
               fruits.push(entity.toState());
           } else if (entity.getEntityType() === EntityType.FLOWER) {
               flowers.push(entity.toState());
           } else if (entity.getEntityType() === EntityType.ANIMAL) {
               animals.push(entity.toState());
           }
           else if (entity.getEntityType() === EntityType.DECORATION) {
               decorations.push(entity.toState());
           }
        }
        objState["fruits"] = fruits;
        objState["animals"] = animals;
        objState["flowers"] = flowers;
        objState["decorations"] = decorations;
        objState["extra"] = {playersOnline: await this.connectionManager.getGardenersOnline()};
        return objState;
    }

    // When server is initialized, setup some initial entities
    public setupGarden() {
        // Apples
        for (let apples = 0; apples < GardenConfig.garden.fruits.apples; apples++) {
            entityManager.registerEntity(this.factory.createApple());
        }
        // Strawberries
        for (let strawberries = 0; strawberries < GardenConfig.garden.fruits.strawberries; strawberries++) {
            entityManager.registerEntity(this.factory.createStrawberry());
        }
        for (let orchids = 0; orchids < GardenConfig.garden.flowers.orchids; orchids++) {
            entityManager.registerEntity(this.factory.createOrchid());
        }
        for (let roses = 0; roses < GardenConfig.garden.flowers.roses; roses++) {
            entityManager.registerEntity(this.factory.createRose());
        }
        for (let sunflowers = 0; sunflowers < GardenConfig.garden.flowers.sunflowers; sunflowers++) {
            entityManager.registerEntity(this.factory.createSunflower());
        }
        for (let dogs = 0; dogs < GardenConfig.garden.animals.dogs; dogs++) {
            entityManager.registerEntity(this.factory.createDog());
        }
        for (let ducks = 0; ducks < GardenConfig.garden.animals.ducks; ducks++) {
            entityManager.registerEntity(this.factory.createDuck());
        }
    }

}

export default new GardenManager();