import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const ConnectDb = async () => {
    try {
        const mongooseconnectRS = await mongoose.connect(
            `${process.env.MONGODB_KA_URI}/${DB_NAME}`
        );
        console.log("mongoDB is connected");
    } catch (error) {
        console.log("CONNECT DB FN ERROR", error);
        process.exit(1);
    }
};
export default ConnectDb;
