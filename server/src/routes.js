import mpRouter from "./mp/routes/mp.routes.js"
import authRouter from "./auth/routes/auth.routes.js"
import whatsappRoutes from "./whatsapp/routes/whatsapp.routes.js"
import app from "./app.js"
import { getDirName } from "./lib/dirname.js";
import path from "path"


app.use("/api/auth/", authRouter);
// app.use("/api/mp",isLoggedIn,mpRouter)
app.use("/api/mp/",mpRouter)
app.use("/api/whatsapp/",whatsappRoutes)


app.get('*', (req, res) => {
    res.sendFile(path.join(getDirName(import.meta.url), "..","..", "client","dist" ,"index.html"));
});