import GardenConfig from "../../main/config";
import Dog from "../entities/animals/dog";
import Duck from "../entities/animals/duck";
import BaseEntity from "../entities/base/base-entity";
import Bench from "../entities/decorations/bench";
import Orchid from "../entities/flowers/orchid";
import Rose from "../entities/flowers/rose";
import Sunflower from "../entities/flowers/sunflower";
import Apple from "../entities/fruits/apple";
import Strawberry from "../entities/fruits/strawberry";


class GardenFactory {

    // IDs will be -1 for they have no register for now

    public createApple(): Apple {
        return new Apple(-1, GardenConfig.fruits.apple.harvesting_interval,
            GardenConfig.fruits.apple.watering_interval);
    }

    public createStrawberry(): Strawberry {
        return new Strawberry(-1, GardenConfig.fruits.strawberry.harvesting_interval,
            GardenConfig.fruits.strawberry.watering_interval);
    }

    public createOrchid(): Orchid {
        return new Orchid(-1, GardenConfig.flowers.orchid.pollination_interval,
            GardenConfig.flowers.orchid.watering_interval);
    }

    public createSunflower(): Sunflower {
        return new Sunflower(-1, GardenConfig.flowers.sunflower.pollination_interval,
            GardenConfig.flowers.sunflower.watering_interval);
    }

    public createRose(): Rose {
        return new Rose(-1, GardenConfig.flowers.rose.pollination_interval,
            GardenConfig.flowers.rose.watering_interval);
    }

    public createDog(): Dog {
        return new Dog(-1, GardenConfig.animals.dog.petting_interval,
            GardenConfig.animals.dog.feeding_interval);
    }

    public createDuck(): Duck {
        return new Duck(-1, GardenConfig.animals.duck.petting_interval,
            GardenConfig.animals.duck.feeding_interval);
    }

    public createBench(): Bench {
        return new Bench(-1, GardenConfig.decorations.bench.cleaning_interval);
    }

}

export default GardenFactory;