import mongoose, { Mongoose } from "mongoose";
import Logger from "../logger/winston-logger";

class MongoDatabase {

    public async connect(con_string: string) {
        try {
            await mongoose.connect(con_string);
            Logger.info("Successfully connected to MongoDB!");
        } catch (error) {
            Logger.error("There was an error when attempting to connect to MongoDB. "
                + "Check connection string and Database.");
            Logger.error(error);
        }
    }

}

export default MongoDatabase;
