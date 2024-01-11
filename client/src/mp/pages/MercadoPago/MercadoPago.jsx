import { useLocation, useNavigate } from "react-router-dom";
import { AsideMp } from "../../components/AsideMp";
import styles from "./MercadoPago.module.css";
import { useMercadoPago } from "../../context/MercadoPagoContext";
import { useEffect, useState } from "react";
import { PagoMp } from "../../components/PagoMp.jsx";
import { AdministrarCuentas } from "../../components/AdministrarCuentas/AdministrarCuentas.jsx";
import { AgregarCuentas } from "../../components/AdministrarCuentas/AgregarCuentas.jsx";
import { EditarCuenta } from "../../components/AdministrarCuentas/EditarCuentas.jsx";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import locale from "date-fns/locale/es";
import { format } from "date-fns";
import { CiCalendar } from "react-icons/ci";
import { DateSelector } from "../../components/ui/DateSelector.jsx";
import { SearchBar } from "../../../shared/components/Search/SeachBar.jsx";
import { BtnCeleste } from "../../components/ui/BtnCeleste.jsx";

export function Mercadopago() {
  const { pagos, getPagos, cuenta } = useMercadoPago();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const CUENTA = query.get("CUENTA");
  const START_DATE = query.get("START_DATE");
  const END_DATE = query.get("END_DATE");
  const navigate = useNavigate();
  useEffect(() => {
    getPagos({ CUENTA, START_DATE, END_DATE });
  }, [CUENTA, START_DATE, END_DATE]);

  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleDateSelect = (values) => {
    setSelectedDates(values.selection);
  };
  const [showDateRange, setShowDateRange] = useState(false);

  return (
    <main>
      <AsideMp />
      <AdministrarCuentas />
      <AgregarCuentas />
      <EditarCuenta />

      <section className={styles.section}>
        <h2 className="text-3xl mb-2 flex justify-between">
          <span>{CUENTA}</span>
          <span>$20.000</span>
        </h2>

        <div className="flex justify-between gap-3 mb-3">
          <SearchBar />

          <div className="flex gap-3 ">
            <div className="relative z-10">
              <DateSelector onClick={() => setShowDateRange(!showDateRange)}>
                {format(selectedDates.startDate, "dd/MM/yy")} -{" "}
                {format(selectedDates.endDate, "dd/MM/yy")}
              </DateSelector>
              <div
                className={
                  styles.dateSelector + " " + (showDateRange || "hidden")
                }
              >
                <DateRange
                  ranges={[selectedDates]}
                  onChange={handleDateSelect}
                  locale={locale}
                  minDate={new Date("2024-01-01")}
                  maxDate={new Date("2024-05-01")}
                />
              </div>
            </div>
            <BtnCeleste
              onClick={() => {
                setShowDateRange(false);
                navigate(
                  `/Mercadopago?CUENTA=${CUENTA}&START_DATE=${
                    selectedDates.startDate.toISOString().split("T")[0]
                  }&END_DATE=${
                    selectedDates.endDate.toISOString().split("T")[0]
                  }`
                );
              }}
            >
              Consultar
            </BtnCeleste>
          </div>
        </div>

        <div className={styles["list--pagos"]}>
          {pagos.map((pago, i) => (
            <PagoMp key={i} pago={pago} />
          ))}
        </div>
      </section>
    </main>
  );
}
