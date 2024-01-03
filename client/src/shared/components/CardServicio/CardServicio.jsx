import { useNavigate } from "react-router-dom";
import styles from "./CardServicio.module.css";

export function CardServicio({servicio}) {
  const {header,text,link} = servicio;
  const navigate = useNavigate();
  return (
    <div className={styles.card} onClick={() => navigate(link)}>
      <h4 className={styles.card__header}>{header}</h4>
      <p>
        {text}
      </p>
    </div>
  );
}
