import { Link } from "react-router-dom";
import styles from "./AsideMp.module.css";
import { useEffect, useState } from "react";
import {
  getLimitDates,
  getToday,
  meses,
  addMonth,
} from "../../../../server/src/lib/dates.js";

export function AsideMpCuenta({ cuenta }) {
  const [showItem, setShowItem] = useState(false);
  const currentMonth = getToday().today.substring(0, 7);


  return (
    <div className={"px-6 pb-2 " + styles["cuenta"]}>
      <div
        className={" " + styles["cuenta__container--title"]}
        onClick={() => setShowItem(!showItem)}
      >
        <span className={styles["cuenta__title"] + " cursor-pointer"}>{cuenta.ALIAS}</span>
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
        {Array.from({ length: 3 }, (_, i) => 
          <LinkConsultarMes key={i} MonthString={addMonth(currentMonth, -i)} cuenta={cuenta} />
        )}
      </ul>
    </div>
  );
}

function LinkConsultarMes({ MonthString,cuenta }) {
  const { END_DATE, START_DATE } = getLimitDates({ MONTH: MonthString });
  return (
    <li className="my-2">
      <Link
        to={`/MercadoPago?CUENTA=${cuenta.ID_MP}&START_DATE=${START_DATE}&END_DATE=${END_DATE}`}
      >
        {meses[new Date(START_DATE).getUTCMonth()]}
      </Link>
    </li>
  );
}
