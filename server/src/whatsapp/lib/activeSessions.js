
const activeSessions = new Map();
import io from "../../services/socket/socket.js"

export function existsInActiveSessions(clientId) {
  return activeSessions.has(clientId);
}

export function checkExistsInActiveSessions(clientId) {
  if (activeSessions.has(clientId))
    throw {
      type: "unavailable",
      msg: `La linea '${clientId}', esta siendo usada por otro usuario, vuelva a intentar mas tarde.`,
    };
}

export function addInActiveSessions(clientId, data) {

  activeSessions.set(clientId, data);
  io.sockets.emit("lineStateChanged",{clientId,isActive:true})
  logActiveSessions();
}

export function deleteFromActiveSessions(clientId) {
  activeSessions.delete(clientId);
  io.sockets.emit("lineStateChanged",{clientId,isActive:false})
  logActiveSessions();
}

export function getFromActiveSessions(clientId) {
  return activeSessions.get(clientId);
}

function logActiveSessions() {
  console.log("--active sessions updated--");
  console.log([...activeSessions.keys()]);
}
