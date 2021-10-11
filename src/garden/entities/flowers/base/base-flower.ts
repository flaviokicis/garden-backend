import BaseEntity from "../../base/base-entity";
import ActionType from '../../../enums/action-type';
import GardenUser from "../../user";


abstract class BaseFlower extends BaseEntity {

    constructor(id: number) {
        super(id);
    }

    public abstract canPollinate(): boolean;

    public abstract canWater(): boolean;

    public abstract pollinateFlower(user: GardenUser): void;

    public abstract waterFlower(user: GardenUser): void;

    protected abstract init(): void;

    public execute(user: GardenUser, action: ActionType): void {
        if (action === ActionType.POLLINATE) {
            this.pollinateFlower(user);
        } else if (action == ActionType.WATER) {
            this.waterFlower(user);
        }
    }

    public canPerform(user: GardenUser, action: ActionType): boolean {
        if (action === ActionType.POLLINATE)
            return this.canPollinate();
        else if (action === ActionType.WATER) {
            return this.canWater();
        } else return false;
    }

}

export default BaseFlower;