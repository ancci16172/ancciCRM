import { useForm } from "react-hook-form";
import {
  MessageContainer,
  MessageContainerHeader,
} from "../ui/Mensajes/ContainerMensaje";
import { GreenButtonBg } from "../ui/GreenButtonBg.jsx";
import { useWhatsapp } from "../../context/WhatsappContext";
import { useRef, useState } from "react";
import { useTimeouts } from "../../../shared/hooks/useTimeouts.js";
import { PError, PSuccess } from "../../../shared/components/Form/PError.jsx";

import { DeleteCross } from "../ui/icons/DeleteCross.jsx";

export function AvailableMedia() {
  const { availableMedia, submitNewFile, addMessage ,deleteMedia} = useWhatsapp();
  const [queryErrors,setQueryErrors] = useState({addMessage : {},deleteMedia : {}})
  const {
    register,
    formState: { errors },
    handleSubmit,
    clearErrors,
    reset,
  } = useForm();

  const [fileToSubmit, setFileToSubmit] = useState({ name: "" });
  const [selectedFileToLoad, setSelectedFileToLoad] = useState({});
  const { clearOnTimeout } = useTimeouts();
  clearOnTimeout(errors, clearErrors, 3000);
  const { ref: registerRef, ...rest } = register("media", {
    required: "No hay ningun archivo seleccionado.",
  });

  const inputFileRef = useRef(null);

  const handleDelete = async (media) => {
    const response = await deleteMedia(media)
    setQueryErrors(prev => ({...prev,deleteMedia : response}))
  } 

  const handleLoadFile = () => {
    addMessage({ TEXT: selectedFileToLoad,ES_MULTIMEDIA : true });
  };

  const handleSelectedMedia = (media) => () => {
    setSelectedFileToLoad(media);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFileToSubmit(file);
  };

  const handleButtonClick = () => {
    inputFileRef.current.click();
  };

  const onSubmit = (values) => {
    const formData = new FormData();
    formData.append("media", fileToSubmit);
    submitNewFile(formData);
    reset();
    setFileToSubmit({ name: "" });
  };

  return (
    <MessageContainer>
      <MessageContainerHeader
        title={`Imagenes/videos disponibles`}
        toggleString={"AvailableMedia"}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-4 ">
          <ContainerMediaOptions>
            {availableMedia.map((media, k) => (
              <MediaOption
                media={media}
                key={k}
                isSelected={selectedFileToLoad == media}
                onClick={handleSelectedMedia(media)}
                onDelete={handleDelete}
              />
            ))}
          </ContainerMediaOptions>
        </div>

        <div className="p-4 grid gap-2">
          <div className="grid grid-flow-col gap-3 grid-cols-2">
            <GreenButtonBg onClick={handleButtonClick} submitOnClick={false}>
              Agregar nuevo
            </GreenButtonBg>

            <input
              type="file"
              {...rest}
              ref={(e) => {
                registerRef(e);
                inputFileRef.current = e;
              }}
              onChange={handleFileChange}
              style={{ display: "none" }}
            />

            <GreenButtonBg submitOnClick={false} onClick={handleLoadFile}>
              Agregar mensaje
            </GreenButtonBg>
          </div>

          <div className="flex justify-between items-center gap-6">
            <div className="flex-1">Por cargar : {fileToSubmit?.name}</div>
            <GreenButtonBg submitOnClick={true}>Cargar</GreenButtonBg>
          </div>
          <div>{errors.media && <PError>{errors.media.message}</PError>}</div>
          {queryErrors.deleteMedia.error && <PError>{queryErrors.deleteMedia.data.msg}</PError>}
          {queryErrors.deleteMedia.error == false && <PSuccess>{queryErrors.deleteMedia.data.msg}</PSuccess>}
        </div>
      </form>
    </MessageContainer>
  );
}

function ContainerMediaOptions({ children }) {
  return (
    <div className="bg-[#F8F8F8] p-4 border border-solid border-gray-200 grid gap-1 max-h-[50vh] overflow-y-auto">
      {children}
    </div>
  );

}

function MediaOption({ media, isSelected, onClick,onDelete }) {
  const handleDeleteFile = async () => {
    await onDelete(media)
  }

  return (
    <div
      className={`px-2 rounded-md flex items-center gap-1 whitespace-nowrap cursor-pointer hover:bg-slate-300 ${
        isSelected && "bg-slate-300"
      }`}
    >
      <span onClick={onClick} className="py-2 flex-1">
        {media}
      </span>
      <span onClick={handleDeleteFile}>
        <DeleteCross className={"text-slate-400 hover:text-slate-500"} />
      </span>
    </div>
  );
}
