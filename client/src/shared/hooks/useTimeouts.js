import { useEffect } from "react";

export function useTimeouts() {


  const clearOnTimeout = (dependencies, runToClear, timeout = 3000) => {
    useEffect(() => {
      console.log(dependencies);
      const timeoutObject = setTimeout(() => {
        runToClear();
      }, timeout);

      return () => {
        clearTimeout(timeoutObject);
      };

    }, [dependencies]);
  };


  return {clearOnTimeout}
}
