import { useEffect, useState } from "react";

export const useWhatsappSocketSendMessages = ({ socket }) => {
  /*sendMessages COMIENZA EL PROCESO DE ENVIAR MENSAJES */
  const [selectedLine, setSelectedLine] = useState("");
  const initValues = {
    trackedMessages: [{ phoneNumber: "", messages: [] }],
    sendingMessagesData: {
      isLoading: false,
      isSendingMessages: true,
      loadingMessage: "Cargando...",
      loadingPercentage: 0,
      response: null,
    },
  };
  const [trackedMessages, setTrackedMessages] = useState(
    initValues["trackedMessages"]
  );
  const [sendingMessagesData, setSendingMessagesData] = useState(
    initValues["sendingMessagesData"]
  );

  const resetSendingMessage = () => {
    setTrackedMessages(initValues["trackedMessages"]);
    setSendingMessagesData(initValues["sendingMessagesData"]);
  };


  //Start to send messages
  const sendMessages = async (contacts, ID_MESSAGE_GROUP) => {
    resetSendingMessage();
    
    const messageData = {
      clientId: selectedLine,
      contacts,
      ID_MESSAGE_GROUP,
    };
    setSendingMessagesData({ ...sendingMessagesData, isLoading: true });
    
    setTrackedMessages(
      contacts.map((c) => ({ phoneNumber: c.phoneNumber, messages: [] }))
    );

    try {
      const res = await socket.emitWithAck("sendMessages/start", messageData);

      console.log("respuesta al evniar mensajes", res);
    } catch (error) {
      console.log("error no pudo enviar los mensajes", error);
    }
  };


  useEffect(() => {
    console.log("tracked messages",trackedMessages);
  },[trackedMessages])



  //Set events
  useEffect(() => {
    const onGoodResponse = (response) => {
      console.log("good response sending messages", response);
      setSendingMessagesData({
        ...sendingMessagesData,
        response: { ...response, isGood: true },
      });
    };
    const onBadResponse = (response) => {
      console.log("Bad response", response);
      setSendingMessagesData({
        ...sendingMessagesData,
        response: { ...response, isGood: false },
      });
    };
    const onTrackedMessages = (trackedMessages) => {
      setTrackedMessages(trackedMessages);
    };
    const onLoading = ({ msg, percentage }) => {
      setSendingMessagesData({
        ...sendingMessagesData,
        loadingMessage: msg,
        loadingPercentage: percentage,
        isLoading: true,
      });
    };
    const onLoaded = () => {
      setSendingMessagesData({ ...sendingMessagesData, isLoading: false });
    };
    
    socket.on("sendMessages/loading", onLoading);
    socket.on("sendMessages/loaded", onLoaded);
    socket.on("sendMessages/good_response", onGoodResponse);
    socket.on("sendMessages/bad_response", onBadResponse);
    socket.on("sendMessages/messages_tracked_ack", onTrackedMessages);

    return () => {
      socket.off("sendMessages/good_response", onGoodResponse);
      socket.off("sendMessages/bad_response", onBadResponse);
      socket.off("sendMessages/messages_tracked_ack", onTrackedMessages);
      socket.off("sendMessages/loading", onLoading);
      socket.off("sendMessages/loaded", onLoaded);
    };
  }, []);

  return {
    sendMessages,
    selectedLine,
    setSelectedLine,
    trackedMessages,
    sendingMessagesData,
  };
};
