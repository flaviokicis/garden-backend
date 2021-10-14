import ActionType from "../../enums/action-type";
import EntityType from "../../enums/entity-type";
import gardenManager from "../../managers/garden-manager";
import Scheduler from "../scheduler";
import GardenUser from "../user";
import BaseAnimal from "./base/base-animal";

export default class Duck extends BaseAnimal {

    private petTime: string;

    private feedTime: string;

    private ableToPet: boolean = true;

    private ableToFeed: boolean = false;

    private scheduler: Scheduler;

    constructor(id: number, petTime: string, feedTime: string) {
        super(id);
        this.scheduler = gardenManager.getScheduler();
        this.petTime = petTime;
        this.feedTime = feedTime;
        this.init();
    }

    protected init() {
        this.feedAnimal(undefined);
    }

    public getEntityType(): EntityType {
        return EntityType.ANIMAL;
    }

    public getName(): String {
        return "Duck";
    }

    public canPet(): boolean {
        return this.ableToPet;
    }

    public canFeed(): boolean {
        return this.ableToFeed;
    }

    public petAnimal(user: GardenUser): void {
        this.ableToPet = false;
        gardenManager.updateState(this, user, ActionType.PET);
        this.scheduler.scheduleTaskOnce(this.petTime, async () => {
            this.ableToPet = true;
            gardenManager.updateState(this);
        });
    }

    public feedAnimal(user: GardenUser): void {
        this.ableToFeed = false;
        gardenManager.updateState(this, user, ActionType.FEED);
        this.scheduler.scheduleTaskOnce(this.feedTime, async () => {
            this.ableToFeed = true;
            gardenManager.updateState(this);
        });
    }

    public toState(): Object {
        return {
            entityId: this.id,
            type: EntityType[this.getEntityType()],
            name: this.getName(),
            ableToPet: this.ableToPet,
            ableToFeed: this.ableToFeed
        };
    }

}