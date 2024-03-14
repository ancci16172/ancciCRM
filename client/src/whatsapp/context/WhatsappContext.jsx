import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLines } from "../hooks/useLines";
import socket from "../../services/socket/socket.js";
import { useMessages } from "../hooks/useMessages.js";
import { useWhatsappSocket } from "../socket/whatsapp.socket.js";

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
  socket.connect();

  const {
    
    availableLines,
    selectedLine,
    setSelectedLine,
    deleteLine,fetchAvaiableLines
  } = useLines();

  const {
    messages,
    addMessage,
    sendMessages,
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
  } = useMessages(selectedLine);
  
  const { qr,insertLine,newLineName } = useWhatsappSocket({ socket ,fetchAvaiableLines});

  const [showComponents, setShowComponents] = useState({
    NewPhoneLine: true,
    AvailableLines: false,
    SetName: true,
    ShowQr: false,
    AddMessage: false,
    AvailableGroups: false,
    NewMessageGroupForm: false,
    EditMessage: false,
    ContactList: false,
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
        deleteLine,
      }}
    >
      <Outlet />
    </WhatsappContext.Provider>
  );
}
