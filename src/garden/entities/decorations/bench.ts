import ActionType from "../../enums/action-type";
import EntityType from "../../enums/entity-type";
import gardenManager from "../../managers/garden-manager";
import Scheduler from "../scheduler";
import GardenUser from "../user";
import BaseDecoration from "./base/base-decoration";

export default class Bench extends BaseDecoration {

    private userSat: GardenUser;

    private cleanTime: string;

    private ableToClean: boolean = false;

    private scheduler: Scheduler;

    constructor(id: number, cleanTime: string) {
        super(id);
        this.scheduler = gardenManager.getScheduler();
        this.cleanTime = cleanTime;
        this.init();
    }

    protected init() {
        this.clean(null);
    }

    public getEntityType(): EntityType {
        return EntityType.DECORATION;
    }

    public getName(): String {
        return "Bench";
    }

    public canSit(): boolean {
        return !this.userSat;
    }

    public canClean(): boolean {
        return this.ableToClean;
    }

    public canStandUp(user: GardenUser): boolean {
        return this.userSat.getId() === user.getId();
    }

    public sit(user: GardenUser): void {
        this.userSat = user;
        this.userSat.sit();
        gardenManager.updateState(this, user, ActionType.SIT_DOWN);
    }
    
    public leave(user: GardenUser): any {
        if (this.userSat.getId() === user.getId()) {
        const minutes = this.userSat.standUp();
        this.userSat = undefined;
        gardenManager.updateState(this, user, ActionType.STAND_UP);
        return minutes;
        }
    }

    public getSitter(): GardenUser {
        return this.userSat;
    }

    public clean(user: GardenUser): void {
        this.ableToClean = false;
        gardenManager.updateState(this, user, ActionType.CLEAN);
        this.scheduler.scheduleTaskOnce(this.cleanTime, async () => {
            this.ableToClean = true;
            gardenManager.updateState(this);
        });
    }

    public toState(): Object {
        return {
            entityId: this.id,
            type: EntityType[this.getEntityType()],
            name: this.getName(),
            userSatId: (this.userSat ? this.userSat.getId() : "NONE"),
            ableToClean: this.ableToClean
        };
    }

}