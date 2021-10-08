import { EntityType } from "../../enums/entity-type";


export default abstract class BaseEntity {

    protected name: string;

    constructor(name: string) {
        this.name = name;
    }

    public abstract performPrimaryAction();

    public abstract performSecondaryAction();

    public abstract getEntityType(): EntityType;

    public abstract getName(): String;

}