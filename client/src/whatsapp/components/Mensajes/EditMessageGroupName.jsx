import {
  OneDataForm,
  OneDataFormContainer,
  OneDataInput,
} from "../ui/Forms/OneDataForm";
import { useForm } from "react-hook-form";
import { useWhatsapp } from "../../context/WhatsappContext.jsx";
import { AbsoluteFormContainer } from "../ui/AbsoluteFormContainer.jsx";
import { useEffect, useState } from "react";
import {useTimeouts} from "../../../shared/hooks/useTimeouts.js"
import {PSuccess,PError} from "../../../shared/components/Form/PError.jsx";


export function EditMessageGroupName({handleBack,editableMessageGroup}) {
  //editableMessagrGroup = {ID_MESSAGE_GROUP,NAME};

  const { register, handleSubmit,clearErrors,formState : {errors} } = useForm();
  const { updateMessageGroupName } = useWhatsapp();
  const {clearOnTimeout} = useTimeouts()
  const [responseMessage,setResponseMessage] = useState(null);

  clearOnTimeout(errors.NAME,clearErrors);
  clearOnTimeout(responseMessage,() => setResponseMessage(null));

  const onSubmit = async ({ NAME }) => {
    const {ID_MESSAGE_GROUP} = editableMessageGroup;
    const response = await updateMessageGroupName(NAME,ID_MESSAGE_GROUP);
    setResponseMessage(response);
  };



  return (
    <AbsoluteFormContainer >
      <OneDataFormContainer >
        <form onSubmit={handleSubmit(onSubmit)} >
          <OneDataForm handleBack={handleBack}>
            <OneDataInput
              defaultValue={editableMessageGroup.NAME}
              type={"text"}
              placeholder={"Nombre del grupo"}
              registration={register("NAME", {
                required: "El campo no puede estar vacio",
                maxLength : {value : 24,message : "El nombre del mensaje no puede exceder los 24 caracteres"},
              })}
            ></OneDataInput>
          </OneDataForm>
        </form>
        {
          errors.NAME && <PError>{errors.NAME.message}</PError> 
        }
        {
          responseMessage && (responseMessage.isError ?
          <PError>{responseMessage.msg}</PError> :
          <PSuccess>{responseMessage.msg}</PSuccess>)
        }
    </OneDataFormContainer>
    </AbsoluteFormContainer>
  );
}
