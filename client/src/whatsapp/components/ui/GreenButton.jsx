import { AsideButton } from "../../../shared/components/ui/AsideButton";

export function GreenButton({ children, onClick ,className,submitOnClick = true}) {
  return (
    <AsideButton className={"mx-2 hover:bg-[#e0e0e0] hover:text-[#1e7020] bg-[#F5F5F5] text-verde_wsp text-center " + className} onClick={onClick} submitOnClick={submitOnClick}>
      {children}
    </AsideButton>
  );
}
