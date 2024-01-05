import { AppearContainer } from "../AppearContainer";
import styles from "./AdministrarCuentas.module.css";

export function AgregarCuentas({ showAdd, setShowAdd }) {
  return (
    <AppearContainer
      title={"Agregar cuenta"}
      btnText={"Agregar"}
      setVisible={setShowAdd}
      visible={showAdd}
    >
      <div
        className={
          styles["container--item__item"] +
          " border-b border-solid border-gray-500 flex justify-between items-center px-4 text-xl"
        }
      >
        <span>Alias</span>
        <input
          className="outline-none border border-slate-300 px-2 w-3/4"
          type="text"
          defaultValue={"Rodrigo"}
        />

      </div>
      <div
        className={
          styles["container--item__item"] +
          " border-b border-solid border-gray-500 flex justify-between items-center px-4 text-xl"
        }
      >
        <span>Alias</span>
        <input
          className="outline-none border border-slate-300 px-2 w-3/4"
          type="text"
          defaultValue={"Rodrigo"}
        />

      </div>
    </AppearContainer>
  );
}
