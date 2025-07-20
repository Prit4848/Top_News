import mongoose from "mongoose";
import config from "../config/config.js";
import 'dotenv/config';

export const connect = () => {

    mongoose.connect(`${config.MONGODB_URI}`)
        .then((result) => {
            console.log("DB connected AT Host",result.connection.host)
        })
        .catch((err) => {
            console.log(err)
        })

}
export default connect;