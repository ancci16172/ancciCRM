import mpRouter from "./mp/routes/mp.routes.js"
import authRouter from "./auth/routes/auth.routes.js"
import whatsappRoutes from "./whatsapp/routes/whatsapp.routes.js"
import app from "./app.js"



app.use("/api/auth/", authRouter);
// app.use("/api/mp",isLoggedIn,mpRouter)
app.use("/api/mp/",mpRouter)
app.use("/api/whatsapp/",whatsappRoutes)
