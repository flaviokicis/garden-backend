import BaseEntity from "../../base/base-entity";
import ActionType from '../../../enums/action-type';


abstract class BaseFruit extends BaseEntity {

    constructor(id: number) {
        super(id);
    }

    public abstract canHarvest(): boolean;

    public abstract canWater(): boolean;

    public abstract harvestFruit(): void;

    public abstract waterFruit(): void;

    protected abstract init(): void;

    public execute(action: ActionType): void {
        if (action === ActionType.HARVEST) {
            this.harvestFruit();
        } else if (action == ActionType.WATER) {
            this.waterFruit();
        }
    }

    public canPerform(action: ActionType): boolean {
        if (action === ActionType.HARVEST)
            return this.canHarvest();
        else if (action === ActionType.WATER) {
            return this.canWater();
        } else return false;
    }

}

export default BaseFruit;