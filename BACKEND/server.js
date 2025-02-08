import http from "http";
import app from "./app.js";
import 'dotenv/config';
import config from './src/config/config.js';
import dbConnection from "./src/db/db.connection.js";

dbConnection()
const port = config.PORT || 3000; 
const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});
