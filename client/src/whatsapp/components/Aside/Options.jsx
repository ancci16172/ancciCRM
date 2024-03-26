import { useEffect, useState } from "react";
import { OptionsCheckBox } from "../../../shared/components/ui/CheckBox/OptionsCheckBox";

export function Options() {
  const [options, setOptions] = useState(
    JSON.parse(localStorage.getItem("whatsapp-options")) || {
      shouldCheckWhatsapps: false,
    }
  );
  
  useEffect(() => {
    localStorage.setItem("whatsapp-options", JSON.stringify(options));
  }, [options]);

  const handleChangeCheckWhatsapp = (key) => (ev) => {
    const isChecked = ev.target.checked;

    if (
      isChecked &&
      !confirm(
        "Validar los numeros de telefono puede afectar el rendimiento\n¿Continuar de todos modos?"
      )
    )
      return;

    const stringOptions = JSON.stringify({ ...options, [key]: isChecked });
    localStorage.setItem("whatsapp-options", stringOptions);
    setOptions(JSON.parse(localStorage.getItem("whatsapp-options")));
  };

  return (
    <div className="mt-3 px-2">
      <OptionsCheckBox
        onChange={handleChangeCheckWhatsapp("shouldCheckWhatsapps")}
        checked={options.shouldCheckWhatsapps}
      >
        <span className="text-[1.05rem]">Validar whatsapp</span>
      </OptionsCheckBox>
    </div>
  );
}
