import { FaPowerOff } from "react-icons/fa6";
import {
  LineBodyContainer,
  LineContainer,
  LineStatesContainer,
} from "./Containers";

export function ActiveLine({ line, onClick }) {
  const handleLine = () => {
    const advText = `Estas apunto de desactivar la linea ${line.clientId}.\n¿Estás seguro de que deseas continuar?`;
    if (!confirm(advText)) return;

    onClick();
  };

  return (
    <LineContainer className="bg-green-300">
      <LineBodyContainer>
        <FaPowerOff color={`green`} cursor={"pointer"} onClick={handleLine} />
        <span className="ml-2">{line.clientId}</span>
      </LineBodyContainer>

      <LineStatesContainer>
        <span>(Activo)</span>
      </LineStatesContainer>
    </LineContainer>
  );
}

export function InactiveLine({ line, onClick }) {
  const handleLine = () => {
    const advText = `Estas apunto de activar la linea ${line.clientId} como una linea persistente.\n¿Estás seguro de que deseas continuar?`;
    if (!confirm(advText)) return;

    onClick();
  };
  //
  return (
    <LineContainer className="bg-blue-400">
      <LineBodyContainer>
        <FaPowerOff color={`red`} cursor={"pointer"} onClick={handleLine} />
        <span className="ml-2">{line.clientId}</span>
      </LineBodyContainer>

      <LineStatesContainer>
        <span>(Inactivo)</span>
      </LineStatesContainer>
    </LineContainer>
  );
}
