export function AsideButton({ onClick, children,className ,submitOnClick}) {
  return (
    <button className={"cursor-pointer p-[5px] rounded-[0.3rem] inline-block " + className} onClick={onClick} type={submitOnClick ? "submit" : "button"}>
      {children}
    </button>
  );
}
