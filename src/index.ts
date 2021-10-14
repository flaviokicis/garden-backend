import App from "./main/app";
import dotenv from "dotenv";

// Config .env
dotenv.config();

const app = new App();

const port: string | number = process.env.APP_PORT || 3000;

const closeFunction = () => {
    server.close();
}


const server = app.start(port, closeFunction);


export default server;