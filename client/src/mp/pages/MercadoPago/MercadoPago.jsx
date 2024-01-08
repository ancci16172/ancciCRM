import { useLocation } from "react-router-dom";
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

export function Mercadopago() {
  const { pagos, getPagos } = useMercadoPago();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const CUENTA = query.get("CUENTA");
  const MES = query.get("MES");

  useEffect(() => {
    getPagos({ MES });
  }, [CUENTA, MES]);

  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleDateSelect = (values) => {
    console.log("valores de las fechas", values);
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
        <h2 className="text-3xl mb-1 flex justify-between">
          <span>{CUENTA}</span>
          <span>$20.000</span>
        </h2>

        <div className="flex justify-between">
          <div>Barra de busqueda</div>

          <div className="flex gap-3 ">
            <div className="relative">
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
            <span className="bg-celeste ">Consultar</span>
          </div>
        </div>

        <div className={styles["list--pagos"]}>
          {pagos.map((pago, i) => (
            <PagoMp key={i} />
          ))}
        </div>
      </section>
    </main>
  );
}
