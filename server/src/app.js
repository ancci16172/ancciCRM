import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"
import path from "path"
import { _dirname } from "./lib/dirname.js";


const app = express();


app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())

const cliendServerPath = path.join(_dirname(import.meta.url),"..","..","client","dist");
app.use(express.static(cliendServerPath))



export default app