import {AsideButton} from "../../../shared/components/ui/AsideButton.jsx";

export function GreenButtonBg({ children, onClick ,className,submitOnClick = true}) {
  return (
    // <AsideButton className={"mx-2 hover:bg-[#269940] bg-[#168930] text-white text-center outline-none " + className} onClick={onClick} submitOnClick={submitOnClick}>
    <AsideButton className={" hover:bg-[#269940] bg-[#168930] text-white text-center outline-none " + className} onClick={onClick} submitOnClick={submitOnClick}>
      {children}
    </AsideButton>
  );
}
