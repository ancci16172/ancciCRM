import { useEffect } from "react";
import socket from "../../services/socket/socket.js";
export const useSocket = () => {
  useEffect( () => {
    console.log("USANDO USEEFFECT");
  } ,[])
  useEffect(() => {
    console.log("CONECTANDO SOCKET");
    socket.connect();



    return () => {
      socket.disconnect();
    };
  }, []);


  return {socket}
};
