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
