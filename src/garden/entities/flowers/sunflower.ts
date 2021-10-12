import EntityType from "../../enums/entity-type";
import gardenManager from "../../managers/garden-manager";
import Scheduler from "../scheduler";
import GardenUser from "../user";
import BaseFlower from "./base/base-flower";

export default class Sunflower extends BaseFlower {

    private pollinateTime: string;

    private waterTime: string;

    private ableToPollinate: boolean = true;

    private ableToWater: boolean = false;

    private scheduler: Scheduler;

    constructor(id: number, pollinateTime: string, waterTime: string) {
        super(id);
        this.scheduler = gardenManager.getScheduler();
        this.pollinateTime = pollinateTime;
        this.waterTime = waterTime;
        this.init();
    }

    protected init() {
        this.waterFlower(undefined);
    }

    public getEntityType(): EntityType {
        return EntityType.FLOWER;
    }

    public getName(): String {
        return "Sunflower";
    }

    public canPollinate(): boolean {
        return this.ableToPollinate;
    }

    public canWater(): boolean {
        return this.ableToWater;
    }

    public pollinateFlower(user: GardenUser): void {
        this.ableToPollinate = false;
        gardenManager.updateState(this, user);
        this.scheduler.scheduleTask(this.pollinateTime, async () => {
            this.ableToPollinate = true;
            gardenManager.updateState(this);
        });
    }

    public waterFlower(user: GardenUser): void {
        this.ableToWater = false;
        gardenManager.updateState(this, user);
        this.scheduler.scheduleTask(this.waterTime, async () => {
            this.ableToWater = true;
            gardenManager.updateState(this);
        });
    }

    public toState(): Object {
        return {
            entityId: this.id,
            type: EntityType[this.getEntityType()],
            name: this.getName(),
            ableToPollinate: this.ableToPollinate,
            ableToWater: this.ableToWater
        };
    }

}