import styles from "./AppearContainer.module.css";

export function FormContainerItems({ children }) {
  return <div className={styles["container--items"] + " overflow-auto"}>{children}</div>;
}
