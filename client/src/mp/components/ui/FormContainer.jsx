import styles from "./AppearContainer.module.css";

export function FormContainer({ children, visible }) {
  return (
    <div
      className={
        styles["container--appear"] +
        " border border-solid border-gray-500 rounded-md flex flex-col " +
        (visible ? "" : "oculto")
      }
    >
      {children}
    </div>
  );
}
