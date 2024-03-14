import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors"
const app = express();


app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())




export default app