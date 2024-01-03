import express from "express";
import morgan from "morgan";
import authRouter from "./auth/routes/auth.routes.js";
import cors from "cors";
import { FRONTEND_URL } from "./config.js";
import cookieParser from "cookie-parser";
import { isLoggedIn } from "./auth/middleware/isLoggedIn.js";
import mpRouter from "./mp/routes/mp.routes.js";

const app = express();


app.use(cors({
    credentials: true,
    origin: "http://localhost:5173"
}))
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())


app.use("/api/auth", authRouter);
// app.use("/api/mp",isLoggedIn,mpRouter)
app.use("/api/mp",mpRouter)

export default app