import BaseEntity from "../../base/base-entity";
import ActionType from '../../../enums/action-type';
import GardenUser from "../../user";


abstract class BaseDecoration extends BaseEntity {

    constructor(id: number) {
        super(id);
    }

    public abstract getSitter(): GardenUser;

    public abstract canSit(): boolean;

    public abstract canClean(): boolean;

    public abstract canStandUp(user: GardenUser): boolean;

    public abstract sit(user: GardenUser): void;

    public abstract leave(user: GardenUser): any;

    public abstract clean(user: GardenUser): void;

    protected abstract init(): void;

    public execute(user: GardenUser, action: ActionType): any {
        if (action === ActionType.SIT_DOWN) {
            this.sit(user);
        } else if (action === ActionType.STAND_UP) {
            return this.leave(user);
        } else if (action == ActionType.CLEAN) {
            this.clean(user);
        }
    }

    public canPerform(user: GardenUser, action: ActionType): boolean {
        if (action === ActionType.SIT_DOWN) {
            if (this.canClean()) {
                return false;
            }
            return this.canSit();
        } else if (action === ActionType.STAND_UP) {
            return this.canStandUp(user);
        } else if (action === ActionType.CLEAN) {
            return this.canClean();
        } else return false;
    }

}

export default BaseDecoration;