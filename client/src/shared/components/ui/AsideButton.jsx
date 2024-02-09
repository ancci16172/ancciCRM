export function AsideButton({ onClick, children,className }) {
  return (
    <div className={"cursor-pointer p-[5px] rounded-[0.3rem] inline-block " + className}>
      {children}
    </div>
  );
}
