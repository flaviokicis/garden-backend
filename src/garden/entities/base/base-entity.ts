import EntityType from "../../enums/entity-type";
import ActionType from '../../enums/action-type';
import GardenUser from "../user";

abstract class BaseEntity {

    protected id: number;

    constructor(id: number) {
        this.id = id;
    }

    public getEntityId(): number {
        return this.id;
    }

    public updateID(id: number): void {
        this.id = id;
    }

    public abstract getEntityType(): EntityType;

    public abstract getName(): String;

    protected abstract init(): void;

    public abstract canPerform(user: GardenUser, action: ActionType): boolean;

    public abstract execute(user: GardenUser, action: ActionType): void;

    public abstract toState(user?: GardenUser): Object;

}

export default BaseEntity;