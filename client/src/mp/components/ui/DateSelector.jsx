import { CiCalendar } from "react-icons/ci";

export function DateSelector({ children, onClick }) {
  return (
    <div
      className="border rounded-md border-slate-300 p-1 px-2 cursor-pointer grid items-center grid-flow-col gap-2 text-lg hover:border-celeste "
      onClick={onClick}
    >
      {children}
      <CiCalendar />
    </div>
  );
}
