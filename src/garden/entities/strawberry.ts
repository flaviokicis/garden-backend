import { EntityType } from "../enums/entity-type";
import BaseEntity from "./base/base-entity";

export default class Strawberry extends BaseEntity {

    private regrowthTime: number;

    private harvestTime: number;

    private waterTime: number;

    constructor(name: string, regrowthTime: number,
        harvestTime: number, waterTime: number) {
        super(name);
        this.regrowthTime = regrowthTime;
        this.harvestTime = harvestTime;
        this.waterTime = waterTime;
    }

    public performPrimaryAction() {
        // TODO
    }
    public performSecondaryAction() {
        // TODO
    }
    public getEntityType(): EntityType {
        return EntityType.FRUIT;
    }
    public getName(): String {
        return "Strawberry";
    }

}