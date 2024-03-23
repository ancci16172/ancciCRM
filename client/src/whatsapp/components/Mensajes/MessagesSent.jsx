import { useWhatsapp } from "../../context/WhatsappContext";
import { AbsoluteFormContainer } from "../ui/AbsoluteFormContainer";
import { GreenButtonBg } from "../ui/GreenButtonBg";
import {
  MessageContainer,
  MessageContainerHeader,
} from "../ui/Mensajes/ContainerMensaje";
import {
  Table,
  TableContainer,
  TableHead,
  Td,
  Th,
  Tr,
} from "../ui/TableElements";
import { Loading } from "../../../shared/components/ui/Loading.jsx";
import { useEffect } from "react";
import { PError } from "../../../shared/components/Form/PError.jsx";
import {MessageAckMessages} from "../../constants/MessageAck.js"
export function MessagesSent() {
  // const { selectedLine, messageVariables, sendMessages, changedSaved,selectedMessageGroup } =  useWhatsapp();
  const { trackedMessages, sendingMessagesData ,selectedLine} = useWhatsapp();

  useEffect(() => {
    console.log({ sendingMessagesData });
  }, [sendingMessagesData]);

  if (sendingMessagesData.isLoading) {
    return (
      <AbsoluteFormContainer>
        <div className="grid place-items-center p-4 cursor-wait">
          <Loading />
          {sendingMessagesData.loadingMessage}{" "}
          {sendingMessagesData.loadingPercentage + "%"}
        </div>
      </AbsoluteFormContainer>
    );
  }

  return (
    <MessageContainer>
      <div>
        <MessageContainerHeader
          title={`Enviando mensajes desde ${selectedLine} : `}
          toggleString={"MessagesSent"}
        />
        <TableContainer>
          <Table>
            <colgroup span="1" className="w-[15ch]"></colgroup>
            <TableHead>
              <tr>
                <Th>Telefono</Th>
                {trackedMessages[0].messages.map((_, i) => (
                  <Th key={i}>Mensaje {i + 1}</Th>
                ))}
              </tr>
            </TableHead>

            <tbody>
              {trackedMessages.map(({ phoneNumber, messages }, i) => (
                <Tr key={i}>
                  <Td>{phoneNumber}</Td>
                  {messages.map((message, j) => (
                    <Td key={j}>
                      {MessageAckMessages[message.ack] || "Enviado"}
                    </Td>
                  ))}
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableContainer>
        <div className="pb-3 px-4 grid gap-4">
          <ResponseMessage response={sendingMessagesData.response} />
          <ResponseResume response={sendingMessagesData.response}/>
          <GreenButtonBg>Cancelar</GreenButtonBg>
          {/* setSendingMessagesData.response.resume */}
        </div>
      </div>
    </MessageContainer>
  );
}

function ResponseMessage({ response }) {
  if (!response) return;

  if (response.isGood) return <p className="text-verde_wsp">{response.msg}</p>;

  return <PError>{response.msg}</PError>;
}

function ResponseResume({response}) {
  if (!response) return;
  if(!response.isGood) return;
  // const response = {resume : {[-1]: 5,1 : 2,2 : 3,5 : 2}};
  const keys = Object.keys(response.resume.data)
  // grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); /* Columnas dinámicas */

  return (
    <div>
      <div className="text-2xl mb-1">Total : {response.resume.total}</div>
      <div className="grid gap-1.5 grid-cols-[repeat(auto-fill,minmax(150px,1fr))] whitespace-nowrap ">
        {keys.map((k,i) => 
        <div className="flex-1" key={i}>{MessageAckMessages[k] || "Enviado"} : {response.resume.data[k]}</div>
        )}
      </div>
    </div>
  );
}
