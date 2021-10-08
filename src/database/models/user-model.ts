import { Document, model, Schema } from "mongoose";


interface User extends Document {

    nickname: String;
    fruitsHarvested: Number;
    flowersPollinated: Number;
    minutesSatOnBench: Number;
    animalsFed: Number;

}

const userSchema = new Schema
    ({
        nickname: {
            type: String,
            required: true
        },
        fruitsHarvested: {
            type: Number,
            default: 0
        },
        flowersPollinated: {
            type: Number,
            default: 0
        },
        minutesSatOnBench: {
            type: Number,
            default: 0
        },
        animalsFed: {
            type: Number,
            default: 0
        }
    },
        {
            timestamps: true
        }
    );

export default model<User>('User', userSchema);