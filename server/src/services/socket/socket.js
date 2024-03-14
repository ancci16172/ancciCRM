import { Server as SocketServer } from "socket.io";
import server from "../../http.js"

const io = new SocketServer(server, {
    cors: {
        origin: "http://localhost:5173",
    },

});




io.on("connection",(socket) => {
    console.log("Socket connected",socket.id);
})


export default io