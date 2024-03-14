import { ImCross } from "react-icons/im";

export function DeleteCross({onClick,className}) {
  return (
    <ImCross
      className={"text-red-700 hover:text-rojo  text-xl " + className}
      onClick={onClick}
    />
  );
}
