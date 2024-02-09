export function OrderMessages() {
  return (
    <div className=" text-[#777777]   mt-5 text-[.85rem] border border-[#333] mx-2 min-h-10 whitespace-nowrap ">
      <MessageToOrder>Este es el primer mensaje con oveflow</MessageToOrder>
      <MessageToOrder>Este es el segundo mensaje con oveflow</MessageToOrder>
    </div>
  );
}

function MessageToOrder({ children }) {
  return (
    <div className="px-2 odd:bg-[#F2F2F2] even:bg-[#DFDFDF] overflow-hidden text-ellipsis">
      {children}
    </div>
  );
}
