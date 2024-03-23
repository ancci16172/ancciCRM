let activeSessions = [];

export function checkExistsInActiveSessions(cliendId) {
  if (activeSessions.includes(cliendId))
    throw {
      type: "unavailable",
      msg: `La linea '${cliendId}', esta siendo usada por otro usuario, vuelva a intentar mas tarde.`,
    };

}

export function addInActiveSessions(cliendId){
    activeSessions.push(cliendId)
    logActiveSessions()
}

export function deleteFromActiveSessions(cliendId){
    activeSessions = activeSessions.filter(id => id != cliendId);
    logActiveSessions()
}

function logActiveSessions(){
  console.log("--active sessions updated--")
  console.log(activeSessions);
}