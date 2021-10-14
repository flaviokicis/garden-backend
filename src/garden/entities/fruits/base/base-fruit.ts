import BaseEntity from "../../base/base-entity";
import ActionType from '../../../enums/action-type';
import GardenUser from "../../user";


abstract class BaseFruit extends BaseEntity {

    constructor(id: number) {
        super(id);
    }

    public abstract hasBeenHarvested(): boolean;

    public abstract canHarvest(): boolean;

    public abstract canWater(): boolean;

    public abstract harvestFruit(user: GardenUser): void;

    public abstract waterFruit(user: GardenUser): void;

    protected abstract init(): void;

    public execute(user: GardenUser, action: ActionType): void {
        if (action === ActionType.HARVEST) {
            this.harvestFruit(user);
        } else if (action == ActionType.WATER) {
            this.waterFruit(user);
        }
    }

    // Water first, harvest second
    public canPerform(user: GardenUser, action: ActionType): boolean {
        if (action === ActionType.HARVEST) {
            if (this.canWater()) {
                return false;
            }
            return this.canHarvest();
        }
        else if (action === ActionType.WATER) {
            return this.canWater();
        } else return false;
    }

}

export default BaseFruit;