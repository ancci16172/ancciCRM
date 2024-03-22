export function PError({ children }) {
  return <p className="text-rojo">{children}</p>;
}

export function PSuccess({ children }) {
  return <p className="text-verde">{children}</p>;
}
