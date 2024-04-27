import { createContext, useContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useLines } from "../hooks/useLines";
import { useMessages } from "../hooks/useMessages.js";
import { useWhatsappSocketAddLines } from "../socket/socket.addLine.js";
import { useWhatsappSocketSendMessages } from "../socket/socket.sendMessages.js";
import { useMedia } from "../hooks/useMedia.js";
import { useSocket } from "../../shared/hooks/useSocket.js";

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
  const { socket } = useSocket();
  const {
    availableLines,
    deleteLine,
    fetchAvaiableLines,
    removePersistentLine,
  } = useLines({ socket });
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
    updateMessageGroupName,
    setEditableMessageGroup
  } = useMessages();

  const {
    selectedLine,
    setSelectedLine,
    sendMessages,
    trackedMessages,
    sendingMessagesData,
  } = useWhatsappSocketSendMessages({ socket });

  const { activatePersistentLine, qr, insertLine, newLineName, cancelQr } =
    useWhatsappSocketAddLines({
      socket,
      fetchAvaiableLines,
    });

  const { availableMedia, submitNewFile, deleteMedia } = useMedia();



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
    MessagesSent: false,
    AvailableMedia: false,
    AddContactMessage : false
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
        deleteLine,
        trackedMessages,
        availableMedia,
        submitNewFile,
        deleteMedia,
        cancelQr,
        activatePersistentLine,
        removePersistentLine,
        updateMessageGroupName,
        setEditableMessageGroup
      }}
    >
      <Outlet />
    </WhatsappContext.Provider>
  );
}
