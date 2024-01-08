import styles from "./AppearContainer.module.css"




export function FormButton({ children, onClick }) {
  return (
    <button
      className={
        "cursor-pointer rounded-md w-2/3 text-center border px-4 py-1 " +
        styles["btn--green"]
      }
      onClick={onClick}
    >
      {children}
    </button>
  );
}
