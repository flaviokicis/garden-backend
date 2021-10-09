import EntityType from "../../enums/entity-type";
import ActionType from '../../enums/action-type';

abstract class BaseEntity {

    protected id: number;

    constructor(id: number) {
        this.id = id;
    }

    public getEntityId(): number {
        return this.id;
    }

    public abstract getEntityType(): EntityType;

    public abstract getName(): String;

    protected abstract init(): void;

    public abstract canPerform(action: ActionType): boolean;

    public abstract execute(action: ActionType): void;

    public abstract toState(): Object;

}

export default BaseEntity;