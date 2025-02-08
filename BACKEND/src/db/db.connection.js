import mongoose from "mongoose";
import config from "../config/config.js";
import 'dotenv/config';

export const connect = () => {

    mongoose.connect(`${config.MONGODB_URI}`)
        .then(() => {
            console.log("DB connected")
        })
        .catch((err) => {
            console.log(err)
        })

}
export default connect;