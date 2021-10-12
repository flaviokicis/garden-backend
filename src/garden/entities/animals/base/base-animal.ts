import BaseEntity from "../../base/base-entity";
import ActionType from '../../../enums/action-type';
import GardenUser from "../../user";


abstract class BaseAnimal extends BaseEntity {

    constructor(id: number) {
        super(id);
    }

    public abstract canPet(): boolean;

    public abstract canFeed(): boolean;

    public abstract petAnimal(user: GardenUser): void;

    public abstract feedAnimal(user: GardenUser): void;

    protected abstract init(): void;

    public execute(user: GardenUser, action: ActionType): void {
        if (action === ActionType.PET) {
            this.petAnimal(user);
        } else if (action == ActionType.FEED) {
            this.feedAnimal(user);
        }
    }

    public canPerform(user: GardenUser, action: ActionType): boolean {
        if (action === ActionType.PET)
            return this.canPet();
        else if (action === ActionType.FEED) {
            return this.canFeed();
        } else return false;
    }

}

export default BaseAnimal;