import express from "express";
import morgan from "morgan";
import authRouter from "./auth/routes/auth.routes.js";

const app = express();


app.use(express.json());
app.use(morgan("dev"))


app.use("/api/auth",authRouter);


export default app