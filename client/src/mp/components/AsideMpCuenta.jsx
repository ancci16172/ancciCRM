import styles from "./AsideMp.module.css";
import { useState } from "react";
import { getToday, addMonth } from "../../../../server/src/lib/dates.js";
import { LinkConsultarMes } from "./ui/LinkConsultarMes.jsx";

export function AsideMpCuenta({ cuenta }) {
  const [showItem, setShowItem] = useState(false);
  const currentMonth = getToday().today.substring(0, 7);

  return (
    <div className={"px-6 pb-2 " + styles["cuenta"]}>
      <div
        className={" " + styles["cuenta__container--title"]}
        onClick={() => setShowItem(!showItem)}
      >
        <span className={styles["cuenta__title"] + " cursor-pointer"}>
          {cuenta.ALIAS}
        </span>
        <span
          className={
            styles["cuenta__flecha"] +
            " my-auto " +
            (showItem ? styles["cuenta__flecha--up"] : "")
          }
        ></span>
      </div>

      <ul
        className={
          styles["text--item"] +
          " " +
          (showItem ? styles["text--item--show"] : "")
        }
      >
        {Array.from({ length: 3 }, (_, i) => (
          <LinkConsultarMes
            key={i}
            MonthString={addMonth(currentMonth, -i)}
            cuenta={cuenta}
          />
        ))}
      </ul>
    </div>
  );
}
