import { useForm } from "react-hook-form";
import { AbsoluteFormContainer } from "../ui/AbsoluteFormContainer";
import {
  Input,
  InputContainer,
  NewWhatsappData,
} from "../ui/NewWhatsappData/NewWhatsappData.jsx";
import { useWhatsapp } from "../../context/WhatsappContext.jsx";
import {  useState } from "react";
import { useTimeouts } from "../../../shared/hooks/useTimeouts.js";

export function NuevoGrupoDeMensajes() {
  const {clearErrors, register, handleSubmit, reset ,formState : {errors}} = useForm();
  const { insertNewMessageGroup } = useWhatsapp();
  const [response, setResponse] = useState("");
  const {clearOnTimeout} = useTimeouts()


  const onSubmit = async (values) => {
    const { NAME } = values;
    const response = await insertNewMessageGroup(NAME);
    setResponse(response.data.msg);
    reset();
  };
  
  clearOnTimeout(response,() => setResponse(""),3000)
  clearOnTimeout(errors.NAME,() => clearErrors("NAME"),3000)

  return (
    <AbsoluteFormContainer>
      <NewWhatsappData
        handleSubmit={handleSubmit}
        functionOnSubmit={onSubmit}
        
      >
        <InputContainer toggleString={"NewMessageGroupForm"}>
          <Input register={register} name={"NAME"} errorMessage={"El nombre del grupo no puede estar vacio."} placeholder={"Nombre del grupo..."}/>
        </InputContainer>
      </NewWhatsappData>
      <div className="px-3 pb-2">
        {response && <p className=" text-verde_wsp">{response}</p>}
        {errors.NAME && <p className="text-rojo ">{errors.NAME.message} </p>}
      </div>
    </AbsoluteFormContainer>
  );
}
