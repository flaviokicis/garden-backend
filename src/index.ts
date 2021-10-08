import App from "./main/app";
import dotenv from "dotenv";

dotenv.config();

const app = new App();

const port: string | number = process.env.APP_PORT || 3000;

app.start(port);