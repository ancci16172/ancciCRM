import { Link } from "react-router-dom";
import { getLimitDates, meses } from "../../../../../server/src/lib/dates";

export function LinkConsultarMes({ MonthString,cuenta,children }) {
    const { END_DATE, START_DATE } = getLimitDates({ MONTH: MonthString });
    return (
      <li className={`${children? "" : "my-2"} list-none`}>
        <Link
          to={`/MercadoPago?CUENTA=${cuenta.ID_MP}&START_DATE=${START_DATE}&END_DATE=${END_DATE}`}
        >
          {children || meses[new Date(START_DATE).getUTCMonth()]}
        </Link>
      </li>
    );
  }
  