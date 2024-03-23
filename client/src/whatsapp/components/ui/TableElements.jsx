export function Td({ children }) {
  return <td className="pl-3 z-10">{children}</td>;
}
export function Th({ children }) {
  return (
    // <th className=" [&:not(:first-child)]:pr-3">
    <th className="">{children}</th>
  );
}
export function TdInput({ children }) {
  return <td className="relative py-4 min-w-[5rem]">{children}</td>;
}
export function Tr({ children }) {
  return <tr className="border-t border-b border-gray-300">{children}</tr>;
}

export function Table({ children }) {
  return <table className="min-w-full odd:backdrop-red-800">{children}</table>;
}

export function TableHead({ children }) {
  return <thead className="bg-[#F2F2F2] sticky top-0 z-20">{children}</thead>;
}

export function TableContainer({ children }) {
  return <div className="overflow-auto px-1 py-[3px] max-h-[60vh]"> {children}</div>;
}
