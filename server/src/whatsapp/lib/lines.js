import { getGeneratedLines } from "../model/whatsapp.model.js";

export const existsLineFolder = (clientId) => {
  const avaiableSessions = getGeneratedLines();

  if (!avaiableSessions.includes(clientId)) {
    return false;
  }
  return true;
};
