import { useEffect, useState } from "react";
export function Message({ children, type }) {
  //Tipos disponibles :
  const [show, setShow] = useState(true);

  useEffect(() => {
    console.log("UseEffect mensaje",type);
    setTimeout(() => setShow(false), 2000);
    return () => clearTimeout;
  },[]);

  //Los dipos disponibles en la propiedad type
  const availableTypes = {
    error: <ErrorMessage>*{children}</ErrorMessage>,
    success: <SuccessMessage>*{children}</SuccessMessage>,
  };

  return show ? availableTypes[type] : null;
}

export function ErrorMessage({ children }) {
  return (
    <div className="justify-self-start px-4 text-rojo font-semibold ">
      {children}
    </div>
  );
}

export function SuccessMessage({ children }) {
  return (
    <div className="justify-self-start px-4 text-[#27ae60] font-semibold ">
      {children}
    </div>
  );
}


export function MessagesContainer({ children }) {
  return <div className="max-h-32 w-full overflow-y-auto ">{children}</div>;
}
