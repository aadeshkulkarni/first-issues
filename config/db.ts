import mongoose from "mongoose";
let connected = false;
export let db :any;
export const start = async () => {
    if (connected == true) return
    db = await mongoose.connect(process.env.MONGODB_URI!);
    connected = true;
}
start();