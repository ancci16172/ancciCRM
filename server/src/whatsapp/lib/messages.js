import { getMessageGroupDb } from "../model/whatsapp.model.js"

export const getMessagesText = async (ID_MESSAGE_GROUP) => {
    const {messages} = await getMessageGroupDb(ID_MESSAGE_GROUP)
    return messages.map(m => m.TEXT);

}