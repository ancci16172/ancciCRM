import { useForm } from "react-hook-form";
import { AbsoluteFormContainer } from "../ui/AbsoluteFormContainer.jsx";
import {
  OneDataForm,
  OneDataFormContainer,
  OneDataInput,
} from "../ui/Forms/OneDataForm.jsx";
import { useTimeouts } from "../../../shared/hooks/useTimeouts.js";
import { PError } from "../../../shared/components/Form/PError.jsx";
import { useWhatsapp } from "../../context/WhatsappContext.jsx";

export function AddContactMessage() {
  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { clearOnTimeout } = useTimeouts();
  const { toggleShowComponent, addMessage } = useWhatsapp();
  clearOnTimeout(errors.phoneNumber, clearErrors, 4500);

  const onSubmit = ({ phoneNumber }) => {
    addMessage({ TEXT: phoneNumber, IS_CONTACT: true });
  };

  return (
    <AbsoluteFormContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <OneDataFormContainer >
          <OneDataForm
            handleBack={() => toggleShowComponent("AddContactMessage")}
          >
            <OneDataInput
              type={"number"}
              placeholder={"Numero de contacto, ej:1144225522"}
              registration={register("phoneNumber", {
                required: "El numero de telefono no puede estar vacio",
                minLength : {value : 8 ,message : "El telefono debe tener almenos 8 numeros"}
              })}
            />
          </OneDataForm>
          {errors.phoneNumber && (
            <PError className={"mt-2"}>{errors.phoneNumber.message}</PError>
          )}
        </OneDataFormContainer>
      </form>
    </AbsoluteFormContainer>
  );
}
