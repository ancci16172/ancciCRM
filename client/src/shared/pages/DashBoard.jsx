import { CardServicio } from "../components/CardServicio/CardServicio.jsx";
import { useAuth } from "../../auth/context/AuthContext.jsx";
import styles from "../components/CardServicio/CardServicio.module.css";
import { useState } from "react";
import { Lupa } from "../icons/Lupa.jsx";
export function DashBoard() {
  const { user } = useAuth();
  const servicios_disponibles = [
    {
      header: "Mercado Pago",
      text: `Vincula varias cuentas de mercado pago para validar el ingreso del
    dinero sin necesidad de un telefono`,
      link: "/MercadoPago",
    },
    {
      header: "Contactos",
      text: `Almacena el numero de contato de todos los clientes`,
    },
    {
      header: "Bot whatsapp",
      text: "Envia una lista de difucion masiva via whatsapp",
      link : "/Whatsapp/MassiveMessages"
    },
    {
      header: "Facturador",
      text: "Generar facturas en afip",
    },
    {
      header: "Usuarios",
      text: "Crea nuevos usuarios o gestiona los permisos del personal",
    },
  ];
  const [servicios, setServicios] = useState(servicios_disponibles);
  const filtrarServicios = (valor) => {
    setServicios(
      servicios_disponibles.filter(
        (servicio) =>
          servicio.header.includes(valor) || servicio.text.includes(valor)
      )
    );
  };

  return (
    <main className="px-8">
      <h1 className="text-center text-2xl my-2">Bienvenido {user.username}</h1>
      <div className="section__container--search flex gap-2">
        <span>Servicios disponibles</span>

        <div className="container--search__search--bar flex  flex-1 border border-black rounded-sm overflow-hidden ">
          <input
            type="text"
            className="w-full outline-none px-2"
            placeholder="Buscar servicio..."
            onInput={(e) => filtrarServicios(e.target.value)}
          />
          <div className="border-l border-black py-1 px-2 hover:bg-gray-300">
            <Lupa />
          </div>
        </div>
      </div>
      {/* <section className="grid  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" > */}
      <section className={styles["container--card"] + " py-5"}>
        {servicios.map((servicio, i) => (
          <CardServicio key={i} servicio={servicio} />
        ))}
      </section>
    </main>
  );
}
