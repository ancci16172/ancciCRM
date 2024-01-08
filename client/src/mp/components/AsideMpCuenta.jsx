import { Link } from "react-router-dom";
import styles from "./AsideMp.module.css";
import { useEffect, useState } from "react";

export function AsideMpCuenta({ cuenta }) {
  const [showItem, setShowItem] = useState(false);


  return (
    <div className={"px-6 pb-2 " + styles["cuenta"]}>
      <div
        className={" " + styles["cuenta__container--title"]}
        onClick={() => setShowItem(!showItem)}
      >
        <span className={styles["cuenta__title"] }>{cuenta.ALIAS}</span>
        <span className={styles["cuenta__flecha"] + " my-auto " + (showItem ? styles["cuenta__flecha--up"] : "")}></span>
      </div>

      <ul
        className={
          styles["text--item"] +
          " " +
          (showItem ? styles["text--item--show"] : "")
        }
      >
        <li className="my-2">
          <Link to="/MercadoPago?CUENTA=Rodrigo&MES=2024-01">Enero</Link>
        </li>

        <li className="my-2">
          <Link to="/MercadoPago?CUENTA=Rodrigo&MES=2023-12">Diciembre</Link>
        </li>
      </ul>
    </div>
  );
}
