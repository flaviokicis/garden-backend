
export interface ConfigWrapper {

    garden: GardenType;
    fruits: FruitsType;
    flowers: FlowersType;
    decorations: DecorationsType;
    animals: AnimalsType;
    users: UsersType;

}

export interface GardenType {

    fruits: Array<string>,
    flowers: Array<string>,
    decorations: Array<string>,
    animals: Array<string>

}

export interface FruitsType {

    apple: {harvesting_interval: string, watering_interval: string},
    strawberry: {harvesting_interval: string, watering_interval: string}

}

export interface FlowersType {

    sunflower: {pollination_interval: string, watering_interval: string},
    rose: {pollination_interval: string, watering_interval: string},
    orchid: {pollination_interval: string, watering_interval: string}

}

export interface DecorationsType {

    bench: { bench: {cleaning_interval: string, limit: number}}

}

export interface AnimalsType {
    
    dog: {feeding_interval: string},
    duck: {feeding_interval: string}

}

export interface UsersType {

    max_users: number;
    max_nickname_length: number;

}