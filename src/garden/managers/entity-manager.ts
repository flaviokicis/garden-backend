import BaseEntity from "../entities/base/base-entity";

class EntityManager {

    private entities: Map<number, BaseEntity>;

    // Could use UUID
    private idCounter: number = 0;

    constructor() {
        this.entities = new Map<number, BaseEntity>();
    }

    // Adds entity to registry
    public registerEntity(entity: BaseEntity): number {
        let id = ++this.idCounter;
        while (this.entities.has(id)) {
            id = id + 1;
        }
        this.entities.set(id, entity);
        entity.updateID(id);
        return id;
    }

    // Returns an entity or null depending on the ID
    public getEntity(id: number): BaseEntity {
        return this.entities.get(id) as BaseEntity;
    }

    // Checks if it's an entity
    public isEntity(id: number): boolean {
        return this.entities.has(id);
    }

    // Returns all entities
    public getAllEntities(): Array<BaseEntity> {
        const entities = [...this.entities.values()];
        return entities;
    }

    // Counts entities with a specific name
    public async countEntities(name: string) {
        let count = 0;
        for (const entity of this.entities.values()) {
            if (entity.getName() === name) count++;
        }
        return count;
    }

    public async removeEntity(id: number) {
        this.entities.delete(id);
    }

}

export default new EntityManager();