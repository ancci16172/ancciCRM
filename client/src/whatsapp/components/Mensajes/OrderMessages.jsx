import { useEffect, useRef, useState } from "react";
import { useWhatsapp } from "../../context/WhatsappContext";
import { RxCross2 } from "react-icons/rx";
import { TbEdit } from "react-icons/tb";
import { useJQueryOrder } from "../../../shared/hooks/useJQueryOrder.js";

export function OrderMessages() {
  const {
    messages,
    selectedMessageGroup,
    deleteMessage,
    toggleShowComponent,
    setEditableMessage,
    setMessages,
  } = useWhatsapp();

  const { orderContainerRef } = useJQueryOrder(setMessages);

  const handleDeleteMessage = (message) => () => {
    if (confirm(`¿Estas seguro de eliminar el mensaje?`))
      deleteMessage(message);
  };

  const handleEditMessage = (message) => () => {
    toggleShowComponent("EditMessage");
    setEditableMessage(message);
  };

  return (
    <div className="mt-5 mx-2 whitespace-nowrap">
      <div className="text-[1.4rem]">
        {selectedMessageGroup.NAME || "No seleccionado"}
      </div>
      <div
        className="text-[#777777]  border border-[#333] min-h-10 "
        ref={orderContainerRef}
      >
        {messages.map((message, id) => {
          return (
            !message.IS_DELETED &&
            <MessageContainer key={id} sortId={id}>
              <span className="overflow-hidden text-ellipsis max-w-[80%]">
                {message.TEXT}
              </span>
              <div className="flex text-2xl">
                <TbEdit
                  title="Editar"
                  className="text-blue-800 hover:text-blue-600 cursor-pointer"
                  onClick={handleEditMessage(message)}
                />
                <RxCross2
                  className="hover:text-[#FF6C5C] text-rojo cursor-pointer stroke-[1.3] "
                  onClick={handleDeleteMessage(message)}
                />
              </div>
            </MessageContainer>
          );
        })}
      </div>
    </div>
  );
}

function MessageContainer({ children, sortId }) {
  return (
    <div
      sortid={sortId}
      className="px-2 py-1.5 odd:bg-[#F2F2F2] even:bg-[#DFDFDF] overflow-hidden text-ellipsis flex justify-between items-center select-none cursor-all-scroll"
    >
      {children}
    </div>
  );
}
