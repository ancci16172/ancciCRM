import { useEffect, useMemo, useState } from "react";
import {
  getMessagesRequest,
  getAvailableMessageGroupsRequest,
  insertNewMessageGroupRequest,
  deleteMessageGroupRequest,
  updateMessagesRequest,
} from "../api/whatsapp.api";

export const useMessages = () => {
  // El formato de los mensajes : {msg : "texto"}
  //   const [messages, setMessages] = useState([
  //     { ID_MESSAGE_GROUP: 0, ID_MESSAGE: 0, TEXT: "Mensaje1" },
  //   ]);

  const [selectedMessageGroup, setSelectedMessageGroup] = useState({});
  const [messages, setMessages] = useState([]);
  const [prevMessages,setPrevMessages] = useState([]);
  const [changedSaved, setChangedSaved] = useState(true);
  const [availableMessageGroups, setAvaliableMessageGroups] = useState([]);
  const [editableMessage, setEditableMessage] = useState({});
  

  const messageVariables = useMemo(() => {
    console.log("Calculando variables de mensajes");
    const matches = messages.reduce((acum, msg) => {
      const matches = msg.TEXT.match(/\{[^{}]+\}/g);
      if (matches) return [...acum, ...matches];
      return [...acum];
    }, []);
    const formatedMatches = matches.map((match) =>
      match.replaceAll(/({|})/g, "")
    );
    return [...new Set(formatedMatches)];
  }, [messages]);


  


  const addMessage = (message) => {
    setMessages([...messages, {ES_MULTIMEDIA : 0,IS_DELETED : false,...message}]);
  };



  const updateMessagesGroup = async () => {
    const { ID_MESSAGE_GROUP } = selectedMessageGroup;
    try {
      const res = await updateMessagesRequest(messages, ID_MESSAGE_GROUP);
      setChangedSaved(true);
      fetchGroupData(ID_MESSAGE_GROUP)
      console.log("Respuesta al actaulizar mensajes", res);
    } catch (error) {
      console.log("Error no se pudieron guardar los mensajes.", error);
    }
  };

  const fetchGroupData = async (groupId) => {
    try {
      const groupData = await getMessagesRequest(groupId);
      console.log("new selected message group", groupData.data);
      setSelectedMessageGroup(groupData.data);
      setMessages(groupData.data.messages);
      setPrevMessages(groupData.data.messages)
    } catch (error) {
      console.log("ERROR FETCHMESSAGES", error);
    }
  };

  const fetchAvailableMessageGroup = async () => {
    try {
      const messageGroups = await getAvailableMessageGroupsRequest();
      setAvaliableMessageGroups(messageGroups.data);
    } catch (error) {
      console.log(error);
    }
  };
  const insertNewMessageGroup = async (newGroupMessageName) => {
    try {
      const response = await insertNewMessageGroupRequest(newGroupMessageName);
      fetchAvailableMessageGroup();
      return response;
    } catch (error) {
      console.log(error);
    }
  };
  const deleteMessageGroup = async (ID_MESSAGE_GROUP) => {
    try {
      const response = await deleteMessageGroupRequest(ID_MESSAGE_GROUP);
      console.log("Elimina grupo de mensajes ", response);
      fetchAvailableMessageGroup();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMessage = (messageToDelete) => {
    setMessages([...messages.filter((msg) => msg != messageToDelete),{...messageToDelete,IS_DELETED : true}]);
  };

  const editMessage = (messageToEdit, newMessageData) => {
    const { TEXT } = newMessageData;

    setMessages(
      messages.map((msg) => {
        if (msg == messageToEdit) return { ...msg, TEXT };
        return msg;
      })
    );
  };

  useEffect(() => {

    if(JSON.stringify(prevMessages) != JSON.stringify(messages))
      return setChangedSaved(false);
    return setChangedSaved(true)
  }, [messages]);



  useEffect(() => {

    fetchAvailableMessageGroup();
  }, []);

 

  return {
    messages,
    selectedMessageGroup,
    addMessage,
    updateMessagesGroup,
    availableMessageGroups,
    fetchGroupData,
    insertNewMessageGroup,
    deleteMessageGroup,
    deleteMessage,
    setEditableMessage,
    editableMessage,
    editMessage,
    messageVariables,
    setMessages,
    changedSaved,
  };
};
