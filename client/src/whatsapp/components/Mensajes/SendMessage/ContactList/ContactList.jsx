import { useFieldArray, useForm } from "react-hook-form";
import { GreenButtonBg } from "../../../ui/GreenButtonBg.jsx";
import {
  MessageContainer,
  MessageContainerHeader,
} from "../../../ui/Mensajes/ContainerMensaje.jsx";
import { useWhatsapp } from "../../../../context/WhatsappContext.jsx";
import { useClipBoard } from "../../../../../shared/hooks/useClipBoard.js";
import { useEffect, useState } from "react";
import { checkContactObjectFromClipboard } from "./ContactList.js";
import { PError } from "../../../../../shared/components/Form/PError.jsx";
import { useTimeouts } from "../../../../../shared/hooks/useTimeouts.js";
import {
  Table,
  TableContainer,
  TableHead,
  Td,
  TdInput,
  Tr,
} from "../../../ui/TableElements.jsx";

export function ContactList() {
  const {
    selectedLine,
    messageVariables,
    sendMessages,
    changedSaved,
    selectedMessageGroup,
    toggleShowComponent,
  } = useWhatsapp();
  const [rows, setRows] = useState([{}]);
  const { createObjectByClipboard } = useClipBoard();
  const { clearOnTimeout } = useTimeouts();
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
    clearErrors,
  } = useForm();

  const { fields, append } = useFieldArray({
    control,
    name: "contacts",
  });

  clearOnTimeout(errors.contacts, clearErrors, 3000);

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
        `No se pueden enviar mensajes debido a que existen cambios sin guardar. Por favor, guarde los cambios antes de intentar enviar los mensajes.`
      );
      return;
    }

    console.log("contacts", contacts);

    if (!selectedMessageGroup.ID_MESSAGE_GROUP)
      return alert(
        "No hay ningun grupo de mensajes seleccionados, no se pueden enviar los mensajes."
      );

    toggleShowComponent("MessagesSent");
    toggleShowComponent("ContactList");

    sendMessages(contacts, selectedMessageGroup.ID_MESSAGE_GROUP);
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
        <TableContainer>
          <Table>
            <TableHead>
              <tr>
                <th>Telefono</th>
                {messageVariables.map((variable, i) => (
                  <th key={i}>{variable}</th>
                ))}
              </tr>
            </TableHead>
            <tbody>
              {rows.map((row, indexRow) => (
                <Tr key={indexRow}>
                  <TdInput>
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
                  </TdInput>
                  {messageVariables.map((variable, i) => (
                    <TdInput key={i}>
                      <Input
                        name={`contacts.${indexRow}.${variable}`}
                        placeholder={variable.toLowerCase()}
                        register={register}
                        propsAtRegister={{ required: false }}
                        type={"text"}
                        defaultValue={row[variable.toUpperCase()]}
                      />
                    </TdInput>
                  ))}
                </Tr>
              ))}
            </tbody>
          </Table>

          {errors.contacts &&
            errors.contacts.map((contactError, i) => (
              <PError key={i}>{contactError.phoneNumber.message}</PError>
            ))}
        </TableContainer>
        <div className="pb-3 px-4 flex gap-4">
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
