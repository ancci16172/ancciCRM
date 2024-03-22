import { createContext, useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLines } from "../hooks/useLines";
import socket from "../../services/socket/socket.js";
import { useMessages } from "../hooks/useMessages.js";
import { useWhatsappSocket } from "../socket/whatsapp.socket.js";
import { useWhatsappSocketSendMessages } from "../socket/socket.sendMessages.js";
import {useMedia} from "../hooks/useMedia.js"

const WhatsappContext = createContext();
export const useWhatsapp = () => {
  const context = useContext(WhatsappContext);
  if (!context)
    throw new Error(
      "No existe el WhatsappContext debido a que el elemento no se encuentra dentro del Provider"
    );
  return context;
};

export function WhatsappProvider() {
  const {    
    availableLines,
    deleteLine,fetchAvaiableLines
  } = useLines();
  const {
    messages,
    addMessage,
    updateMessagesGroup,
    availableMessageGroups,
    selectedMessageGroup,
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
  } = useMessages();

  const {   selectedLine,setSelectedLine,sendMessages,trackedMessages,sendingMessagesData} = useWhatsappSocketSendMessages({socket})
  const { qr,insertLine,newLineName } = useWhatsappSocket({ socket ,fetchAvaiableLines});

  const {availableMedia,submitNewFile,deleteMedia} = useMedia();

  useEffect(() => {
    console.log("available media",availableMedia);  
  },[availableMedia])

  const [showComponents, setShowComponents] = useState({
    NewPhoneLine: false,
    AvailableLines: false,
    SetName: true,
    ShowQr: false,
    AddMessage: false,
    AvailableGroups: false,
    NewMessageGroupForm: false,
    EditMessage: false,
    ContactList: false,
    MessagesSent : false,
    AvailableMedia : true,
  });

  const toggleShowComponent = (ComponentName) => {
    if (showComponents[ComponentName] == undefined)
      throw new Error("No existe el componente en la lista de showComponents");

    setShowComponents((prev) => ({
      ...prev,
      [ComponentName]: !prev[ComponentName],
    }));
  };

  return (
    <WhatsappContext.Provider
      value={{
        availableLines,
        showComponents,
        setShowComponents,
        toggleShowComponent,
        insertLine,
        qr,
        newLineName,
        sendingMessagesData,
        messages,
        addMessage,
        sendMessages,
        updateMessagesGroup,
        selectedLine,
        fetchGroupData,
        setSelectedLine,
        availableMessageGroups,
        selectedMessageGroup,
        insertNewMessageGroup,
        deleteMessageGroup,
        deleteMessage,
        editableMessage,
        setEditableMessage,
        editMessage,
        messageVariables,
        setMessages,
        changedSaved,
        deleteLine,trackedMessages,availableMedia,submitNewFile,deleteMedia
      }}
    >
      <Outlet />
    </WhatsappContext.Provider>
  );
}
