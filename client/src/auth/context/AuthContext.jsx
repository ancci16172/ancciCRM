import { createContext, useContext, useEffect, useState } from "react";
import { singInRequest, verifyTokenRequest } from "../api/auth.api";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error(
      "No existe el AuthContext debido a que el elemento no se encuentra dentro del AuthProvider"
    );
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(true);

  // TIMEUOT PARA BORARR ERRORES EN FORM

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      if (res.status === 200) {
        setUser(res.data);
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.log(error.response.data);
      setErrors(error.response.data.message);
    }
  };

  const signIn = async (user) => {
    try {
      const res = await singInRequest(user);
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  };

  //Resetea los errores de Sesiones cada 2 segundos
  useEffect(() => {
    console.log(errors)
    setTimeout(() => {
      setErrors("");
    }, 2000);
  }, [errors]);

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get();

      if (!cookies.token) {
        console.log("no existe el token");
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);

        if (!res.data) return setIsAuthenticated(false);

        setIsAuthenticated(true);
        setUser(res.data);
      } catch (error) {
        console.log(error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };
    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signIn,
        user,
        isAuthenticated,
        loading,
        errors,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
