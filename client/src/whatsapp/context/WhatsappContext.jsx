import { createContext, useContext } from "react";
import { Outlet} from "react-router-dom";

export const WhatsappContext = createContext();

export const useWhatsapp = () => {
  const context = useContext(WhatsappContext);
  if (!context)
    throw new Error(
      "No existe el WhatsappContext debido a que el elemento no se encuentra dentro del Provider"
    );
  return context;
};

export function WhatsappProvider() {

  return (
    <WhatsappContext.Provider value={{a : 1}}>
      <Outlet />
    </WhatsappContext.Provider>
  );
}
