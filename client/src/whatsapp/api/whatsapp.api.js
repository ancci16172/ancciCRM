import axios from "../../shared/api/axios.js";

/*LINES */
export const getAvailableLinesRequest = async ()  => await axios.get("/whatsapp/getAvailableLines");

export const insertLineRequest = async (data) => await axios.post("/whatsapp/insertLine",data);

export const deleteLineRequest = async (clientId) => await axios.delete(`/whatsapp/deleteLine/${clientId}`)


export const removePersistentLineRequest = async (clientId) => await axios.delete(`/whatsapp/persistentLine/${clientId}`)


/*Messages */
export const getMessagesRequest = async (groupId) => await axios.get(`/whatsapp/getMessages/${groupId}`);
export const updateMessagesRequest = async (messages,groupId) => await axios.post(`/whatsapp/updateMessagesGroup`,{messages,groupId});

export const getAvailableMessageGroupsRequest = async () => await axios.get(`/whatsapp/getAvailableMessageGroups`);

export const insertNewMessageGroupRequest = async (newGroupMessageName) => await axios.post(`/whatsapp/insertNewMessageGroup`,{newGroupMessageName});
export const deleteMessageGroupRequest = async (ID_MESSAGE_GROUP) => await axios.delete(`/whatsapp/deleteMessageGroup/${ID_MESSAGE_GROUP}`)


/*Media  */

export const getAvailableMediaRequest = async () => await axios.get(`/whatsapp/getAvailableMedia`);

export const insertNewMediaRequest = async (data) => await axios.post("/whatsapp/addNewMedia",data);

export const deleteMediaRequest = async (mediaName) => await axios.delete(`/whatsapp/deleteMedia/${mediaName}`)

/* Whatsapp client*/
export const sendWhatsappMessages = async (data) => await axios.post("/whatsapp/sendMassiveMessages",data);

//data : {clientId:{} ,contacts : [{phone : 541124659963},{phone:541124659963}]}
// export const sendMessagesRequest = async (data) => await axios.post(`/whatsapp/sendMessages`,data);



