import { AsideButton } from "../../../shared/components/ui/AsideButton";
import styles from "./BtnCeleste.module.css"


export function BtnCeleste({onClick,children}) {
  return (
    <AsideButton
      className={styles["btn--celeste"]}
      onClick={onClick}
    >
      {children}
    </AsideButton>
  );
}
