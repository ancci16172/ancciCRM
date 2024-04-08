export function PError({ children,className }) {
  return <p className={"text-rojo " + className}>{children}</p>;
}

export function PSuccess({ children }) {
  return <p className="text-verde">{children}</p>;
}
