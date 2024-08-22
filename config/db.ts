import mongoose from "mongoose";
let connected = false;
export let db :any;
export const connectDb = async () => {
    if (connected == true) return
    db = await mongoose.connect(process.env.MONGODB_URI as string);
    connected = true;
}
