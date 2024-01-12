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
import { format, getTime } from "date-fns";
import { DateSelector } from "../../components/ui/DateSelector.jsx";
import { SearchBar } from "../../../shared/components/Search/SeachBar.jsx";
import { BtnCeleste } from "../../components/ui/BtnCeleste.jsx";
import { getToday } from "../../../../../server/src/lib/dates.js";

export function Mercadopago() {
  const { todayDate: today } = getToday();
  const { pagos, getPagos, filtro, setFiltro, cuentas} = useMercadoPago();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  
  const [CUENTA] = query.get("CUENTA")
    ? cuentas.filter((cuenta) => cuenta.ID_MP == query.get("CUENTA"))
    : [{ ALIAS: null, ID_MP: null }];
  const START_DATE = query.get("START_DATE");
  const END_DATE = query.get("END_DATE");
  const buscandoPagos = START_DATE && END_DATE && query.get("CUENTA");
  const navigate = useNavigate();

  useEffect(() => {
    if (buscandoPagos) getPagos({ CUENTA: CUENTA.ID_MP, START_DATE, END_DATE });
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

  const pagosFiltrados = pagos.filter((pago) =>
    JSON.stringify(pago).includes(filtro)
  );

  return (
    <main>
      <AsideMp />
      <AdministrarCuentas />
      <AgregarCuentas />
      <EditarCuenta />

      <section className={styles.section }>
        <h2 className="text-3xl mb-2 flex justify-between">
          <span>{CUENTA.ALIAS}</span>
          <span>
            $
            {pagos
              .reduce(
                (acum, pago) =>
                  acum + pago.transaction_details.net_received_amount,
                0.0
              )
              .toFixed(2)}
          </span>
        </h2>

        <div className="flex justify-between gap-3 mb-3">
          <SearchBar
            placeholder={"Buscar..."}
            onInput={(e) => setFiltro(e.target.value)}
          />

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
                  minDate={
                    new Date(today.getUTCFullYear(), today.getUTCMonth() - 3, 1)
                  }
                  maxDate={
                    new Date(today.getUTCFullYear(), today.getUTCMonth() + 1, 0)
                  }
                />
              </div>
            </div>
            <BtnCeleste
              onClick={() => {
                setShowDateRange(false);
                navigate(
                  `/Mercadopago?CUENTA=${CUENTA.ID_MP}&START_DATE=${
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

        {!pagosFiltrados.length && buscandoPagos && (
          <div>
            No se han encontrado pagos que coincidan con su búsqueda actual.
            <br />
            Le sugerimos ampliar el rango de búsqueda para obtener mas
            resultados.
          </div>
        )}
        
        <div className={styles["list--pagos"]}>
          {pagosFiltrados.map((pago) => (
            <PagoMp key={pago.id} pago={pago} />
          ))}
        </div>
      </section>
    </main>
  );
}
