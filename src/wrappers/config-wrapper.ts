
export interface ConfigWrapper {

    garden: GardenType;
    fruits: FruitsType;
    flowers: FlowersType;
    decorations: DecorationsType;
    animals: AnimalsType;
    users: UsersType;

}

export interface GardenType {

    fruits: {apples: number, strawberries: number},
    flowers: {orchids: number, roses: number, sunflowers: number},
    decorations: {benches: number},
    animals: {dogs: number, ducks: number}

}

export interface FruitsType {

    apple: {max: number, respawn_interval: string, harvesting_interval: string, watering_interval: string},
    strawberry: {max: number, respawn_interval: string, harvesting_interval: string, watering_interval: string}

}

export interface FlowersType {

    sunflower: {pollination_interval: string, watering_interval: string},
    rose: {pollination_interval: string, watering_interval: string},
    orchid: {pollination_interval: string, watering_interval: string}

}

export interface DecorationsType {

    bench: { bench: {cleaning_interval: string}}

}

export interface AnimalsType {
    
    dog: {petting_interval: string, feeding_interval: string},
    duck: {petting_interval: string, feeding_interval: string}

}

export interface UsersType {

    max_users: number;
    max_nickname_length: number;

}