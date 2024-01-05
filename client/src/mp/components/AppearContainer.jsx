import { Cruz } from "../../shared/icons/Cruz/Cruz";
import styles from "./AppearContainer.module.css";

export function AppearContainer({
  children,
  btnText,
  btnOnClick,
  title,
  visible,
  setVisible,

}) {

  return (
    <div
      className={
        styles["container--appear"] +
        " border border-solid border-gray-500 rounded-md flex flex-col " +
        (visible ? "" : "oculto")
      }
    >
      <header className="text-center text-2xl py-1 border-b border-solid border-gray-500 relative">
        {title}
        <Cruz onClick={() => setVisible(false)} />
      </header>
      <div className={styles["container--items"]}>{children}</div>
      <div className="mt-auto py-4 flex justify-center">
        <div
          className={
            "cursor-pointer rounded-md w-2/3 text-center border px-4 py-1 " +
            styles["btn--green"]
          }
          onClick={e => btnOnClick(e)}
        >
          {btnText}
        </div>
      </div>
    </div>
  );
}
