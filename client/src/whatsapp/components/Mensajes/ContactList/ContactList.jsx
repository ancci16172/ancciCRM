import { useFieldArray, useForm } from "react-hook-form";
import { GreenButtonBg } from "../../ui/GreenButtonBg";
import {
  MessageContainer,
  MessageContainerHeader,
} from "../../ui/Mensajes/ContainerMensaje";
import { useWhatsapp } from "../../../context/WhatsappContext";
import { useClipBoard } from "../../../../shared/hooks/useClipBoard";
import { useEffect, useState } from "react";
import { checkContactObjectFromClipboard } from "./ContactList.js";
import { PError } from "../../../../shared/components/Form/PError.jsx";
import {useTimeouts} from "../../../../shared/hooks/useTimeouts.js"

export function ContactList() {
  const { selectedLine, messageVariables, sendMessages, changedSaved } =
    useWhatsapp();
  const [rows, setRows] = useState([{}]);
  const { createObjectByClipboard } = useClipBoard();
  const {clearOnTimeout} = useTimeouts();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,clearErrors,
  } = useForm();
  
  const { fields, append } = useFieldArray({
    control,
    name: "contacts",
  });

  clearOnTimeout(errors.contacts,() => clearErrors(),3000)

  const handleFillTableFromClipboard = async () => {
    const objectFromClipboard = await createObjectByClipboard();

    if (checkContactObjectFromClipboard(objectFromClipboard)) {
      reset();
      setRows(objectFromClipboard);
    }
  };

  const onSubmit = ({ contacts }) => {
    const existsEmptyCell = contacts.some((contact) => {
      const values = Object.values(contact);
      return values.includes("");
    });

    if (
      existsEmptyCell &&
      !confirm(`Existen campos vacios, ¿estas seguro de enviar los mensajes?`)
    ) {
      return;
    }
    if (!changedSaved) {
      alert(
        `No se pueden enviar mensajes debido a cambios sin guardar. Por favor, guarde los cambios antes de intentar enviar los mensajes.`
      );
      return;
    }

    // console.log("errors", errors);
    sendMessages(contacts);
  };

  useEffect(() => {
    console.log("contacts", errors.contacts);
  }, [errors.contacts]);



  return (
    <MessageContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <MessageContainerHeader
          title={`Enviar desde ${selectedLine}: `}
          toggleString={"ContactList"}
        />
        <div className="overflow-auto p-4 ">
          <table className="min-w-full odd:backdrop-red-800">
            <thead className="bg-[#F2F2F2]">
              <tr>
                <th>Telefono</th>
                {messageVariables.map((variable, i) => (
                  <th key={i}>{variable}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, indexRow) => (
                <Tr key={indexRow}>
                  <Td>
                    <Input
                      name={`contacts.${indexRow}.phoneNumber`}
                      placeholder={"Numero de telefono"}
                      register={register}
                      propsAtRegister={{
                        required: `El numero de telefono de la fila ${
                          indexRow + 1
                        } se encuentra vacio.`,
                      }}
                      type={"number"}
                      defaultValue={row["TELEFONO"]}
                    />
                  </Td>
                  {messageVariables.map((variable, i) => (
                    <Td key={i}>
                      <Input
                        name={`contacts.${indexRow}.${variable}`}
                        placeholder={variable.toLowerCase()}
                        register={register}
                        propsAtRegister={{ required: false }}
                        type={"text"}
                        defaultValue={row[variable.toUpperCase()]}
                      />
                    </Td>
                  ))}
                </Tr>
              ))}
            </tbody>
          </table>
  
          {errors.contacts && errors.contacts.map((contactError,i) =>
          <PError key={i}>{contactError.phoneNumber.message}</PError>
          )}
  
        </div>
        <div className="pb-3 px-4 flex">

          <GreenButtonBg className={"flex-1"}>Enviar</GreenButtonBg>
          <GreenButtonBg
            className={"flex-1"}
            onClick={handleFillTableFromClipboard}
            submitOnClick={false}
          >
            Llenar desde portapapeles
          </GreenButtonBg>
        </div>
      </form>
    </MessageContainer>
  );
}

function Tr({ children }) {
  return <tr className="border-t border-b border-gray-300">{children}</tr>;
}

function Td({ children }) {
  return <td className="relative py-4 min-w-[5rem]">{children}</td>;
}

function Input({
  placeholder,
  type,
  register,
  name,
  propsAtRegister,
  defaultValue,
}) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      autoComplete="false"
      className="absolute inset-0 px-2 rounded-md  outline-none appearance-none remove-arrow"
      defaultValue={defaultValue}
      {...register(name, propsAtRegister)}
    />
  );
}
