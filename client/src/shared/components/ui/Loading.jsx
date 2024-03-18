import { ring2 } from "ldrs";
export function Loading({className,children}) {
  ring2.register();


  return <l-ring-2
    size="40"
    stroke="5"
    stroke-length="0.25"
    bg-opacity="0.1"
    speed="0.8"
    color="black"
    className={className}
  >{children}</l-ring-2>;


}
