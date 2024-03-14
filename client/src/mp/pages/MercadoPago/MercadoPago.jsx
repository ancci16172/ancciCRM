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
import { DateSelector } from "../../components/ui/DateSelector.jsx";
import { SearchBar } from "../../../shared/components/Search/SeachBar.jsx";
import { BtnCeleste } from "../../components/ui/BtnCeleste.jsx";
import { getToday } from "../../../../../server/src/lib/dates.js";
import { getQuery } from "../../../shared/lib/params.js";
import { SectionContainer } from "../../../shared/components/SectionContainer.jsx";
import Container from "../../../shared/components/Container.jsx";

/*
  Local Storage for inputs:
  mostrarTitulares : false
  mostrarEgresos : false
  mostrarIngresos : false   
*/

export function Mercadopago() {
  const { todayDate: today } = getToday();
  const {
    pagos,
    filtro,
    setFiltro,
    getCuentaSeleccionada,
    setParams,
    options,
    isLoadingPagos,
    errors,
  } = useMercadoPago();
  const CUENTA = getCuentaSeleccionada();

  const [selectedDates, setSelectedDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });
  const handleDateSelect = (values) => {
    setSelectedDates(values.selection);
  };
  const [showDateRange, setShowDateRange] = useState(false);
  const [pagosFiltrados, setPagosFiltrados] = useState(pagos);
  useEffect(() => {
    setPagosFiltrados(
      pagos.filter(
        (pago) =>
          JSON.stringify(pago).toLowerCase().includes(filtro.toLowerCase()) &&
          ((pago.esIngreso && options.mostrarIngresos) ||
            (pago.esEgreso && options.mostrarEgresos))
      )
    );
  }, [options, filtro, pagos]);

  return (
    <Container className={isLoadingPagos ? "cursor-wait" : ""}>
      <AsideMp />
      <AdministrarCuentas />
      <AgregarCuentas />
      <EditarCuenta />

      <SectionContainer>
        <h2 className="text-3xl mb-2 flex justify-between">
          <span>{CUENTA ? CUENTA.ALIAS : "Sin cuenta evaluada"}</span>
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
                setParams((prev) => {
                  const query = getQuery(prev);
                  return {
                    ...query,
                    START_DATE: selectedDates.startDate
                      .toISOString()
                      .split("T")[0],
                    END_DATE: selectedDates.endDate.toISOString().split("T")[0],
                  };
                });
              }}
            >
              Consultar
            </BtnCeleste>
          </div>
        </div>
        {errors.length > 0 &&
          errors.map((error,i) => 
           <div key={i} className="my-2 text-rojo font-semibold">{error.msg}</div>
        )}
        { errors.length == 0 && !pagosFiltrados.length && !isLoadingPagos && (
          <div className="my-2">
            No se han encontrado pagos que coincidan con su búsqueda actual.
            <br />
            Le sugerimos ampliar el rango de búsqueda o quitar filtros para
            obtener mas resultados.
          </div>
        )}

        {isLoadingPagos && <div className="my-2">Cargando pagos...</div>}

        <div className={styles["list--pagos"]}>
          {pagosFiltrados.map((pago) => (
            <PagoMp
              key={pago.id}
              pago={pago}
              mostrarTitulares={options.mostrarTitulares}
            />
          ))}
        </div>
      </SectionContainer>
    </Container>
  );
}
