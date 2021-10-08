import { Document, model, Schema } from "mongoose";


interface Stats extends Document {
    _id: String;
    connections: Number;
    totalFruitsHarvested: Number;
    totalFlowersPollinated: Number;
    totalMinutesSatOnBench: Number;
    totalAnimalsFed: Number;

}

const statsSchema = new Schema
    ({
        _id: String,
        connections: {
            type: Number,
            default: 0
        },
        totalFruitsHarvested: {
            type: Number,
            default: 0
        },
        totalFlowersPollinated: {
            type: Number,
            default: 0
        },
        totalMinutesSatOnBench: {
            type: Number,
            default: 0
        },
        totalAnimalsFed: {
            type: Number,
            default: 0
        }
    },
        {
            timestamps: true
        }
    );

statsSchema.pre('save', function (next) {
    let record = this;
    record._id = new Date().toISOString().slice(0, 10);
    next();
});

export default model<Stats>('Stat', statsSchema);