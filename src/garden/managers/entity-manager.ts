import BaseEntity from "../entities/base/base-entity";

class EntityManager {

    private entities: Map<number, BaseEntity>;

    private idCounter: number = 0;

    constructor() {
        this.entities = new Map<number, BaseEntity>();
    }

    public registerEntity(entity: BaseEntity): number {
        const id = this.idCounter++;
        this.entities.set(id, entity);
        return id;
    }

    public getEntity(id: number): BaseEntity {
        return this.entities.get(id) as BaseEntity;
    }

    public isEntity(id: number): boolean {
        return this.entities.has(id);
    }

}

export default new EntityManager();