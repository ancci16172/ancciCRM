import { FaPowerOff } from "react-icons/fa6";
import { useWhatsapp } from "../../../context/WhatsappContext.jsx";
import { ActiveLine, InactiveLine } from "./LineStates.jsx";
export function PersistentLines() {
  const { availableLines, activatePersistentLine, removePersistentLine,toggleShowComponent } =
    useWhatsapp();



  const handleInactiveLine = (line) => async () => {
    toggleShowComponent("NewPhoneLine");
    const response = await activatePersistentLine(line);
  };

  const handleActiveLine = (line) => async () => {
    const response = await removePersistentLine(line);
  };

  return (
    <div>
      <div className="text-2xl mb-2">Lineas persistentes</div>

      <div className="grid text-xl  gap-y-3">
        {availableLines.map((line) =>
          line.isActive ? (
            <ActiveLine line={line} onClick={handleActiveLine(line)} />
          ) : (
            <InactiveLine line={line} onClick={handleInactiveLine(line)} />
          )
        )}
      </div>
    </div>
  );
}
