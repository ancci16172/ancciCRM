import { getAvailableMediaFromRepo } from "../model/media.model.js";

export const checkMediaMessagesExists = (messages) => {
  const availableMedia = getAvailableMediaFromRepo();

  for (const message of messages) {
    if (!message.ES_MULTIMEDIA) continue;
    if (!availableMedia.includes(message.TEXT))
      throw {
        errno: 404,
        status : 404,
        type: "file",
        msg: `El archivo ${message.TEXT} no existe.`,
      };
  }

  return true;
};
