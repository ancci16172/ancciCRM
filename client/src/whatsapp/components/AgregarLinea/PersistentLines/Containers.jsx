export function LineBodyContainer({ children }) {
  return <div className="flex items-center gap-2">{children}</div>;
}
export function LineStatesContainer({ children }) {
  return <div className="grid place-items-center">{children}</div>;
}

export function LineContainer({ children, className }) {
  return (
    <div
      className={
        "flex flex-wrap-reverse gap-x-4 items-center px-2 py-1 rounded-[0.5rem] w-[min(28rem,90%)] select-none justify-between" +
        " " +
        className
      }
    >
      {children}
    </div>
  );
}
