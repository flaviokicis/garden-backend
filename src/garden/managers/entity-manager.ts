import BaseEntity from "../entities/base/base-entity";

class EntityManager {

    private entities: Map<number, BaseEntity>;

    // Could use UUID
    private idCounter: number = 0;

    constructor() {
        this.entities = new Map<number, BaseEntity>();
    }

    public registerEntity(entity: BaseEntity): number {
        let id = ++this.idCounter;
        while (this.entities.has(id)) {
            id = id + 1;
        }
        this.entities.set(id, entity);
        entity.updateID(id);
        return id;
    }

    public getEntity(id: number): BaseEntity {
        return this.entities.get(id) as BaseEntity;
    }

    public isEntity(id: number): boolean {
        return this.entities.has(id);
    }

    public getAllEntities(): Array<BaseEntity> {
        const entities = [...this.entities.values()];
        return entities;
    }

}

export default new EntityManager();