// import server from "./http.js"
import server from "./https.js";
import "./routes.js" //Carga las rutas en app








server.listen(5000,() => {console.log("SERVER ON PORT 5000");})


