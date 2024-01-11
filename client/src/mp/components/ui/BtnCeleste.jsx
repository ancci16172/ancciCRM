import styles from "./BtnCeleste.module.css"


export function BtnCeleste({onClick,children}) {
  return (
    <div
      className={styles["btn--celeste"]}
      onClick={onClick}
    >
      {children}
    </div>
  );
}
