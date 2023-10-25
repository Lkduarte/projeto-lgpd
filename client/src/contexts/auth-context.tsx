/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import useAlert from "../utils/alerts";
import authController from "../services/controllers/authController";

export const AuthContext = createContext({} as any);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const alert = useAlert();

  const updateUser = (user: any) => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  };

  const loadCookies = async () => {
    const recoveredUser = localStorage.getItem("user");
    const recoveredToken = localStorage.getItem("token");

    if (!recoveredToken || !recoveredUser) {
      setLoading(false);
      navigate("/login");
      return;
    }

    try {
      // const response = await verifyToken(recoveredToken);

      // setUser(response.data.user);
      // localStorage.setItem("user", JSON.stringify(response.data.user));
      setUser(JSON.parse(recoveredUser));
      setLoading(false);

      api.defaults.headers.Authorization = `Bearer ${recoveredToken}`;
      api.defaults.headers.common = {
        Authorization: `Bearer ${recoveredToken}`,
      };
    } catch (e) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setUser(null);
      setLoading(false);

      navigate("/login");
    }
  };

  const carregar = async () => {
    await loadCookies();
  };

  useEffect(() => {
    carregar();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      const response = await authController.login(email, password);
      const loggedUser = response.user;
      const token = response.token;

      localStorage.setItem("user", JSON.stringify(loggedUser));
      localStorage.setItem("token", token);

      api.defaults.headers.Authorization = `Bearer ${token}`;
      api.defaults.headers.common = { Authorization: `Bearer ${token}` };

      setUser(loggedUser);
      setLoading(false);

      navigate("/home");
    } catch (e: any) {
      console.log(e);
      const responseMessage = e.response.data;
      let errorMessage;

      if (responseMessage.includes("Email not found")) {
        errorMessage = "E-mail ou senha inválidos.";
      } else if (responseMessage.includes("Incorrect password")) {
        errorMessage = "E-mail ou senha inválidos.";
      } else {
        errorMessage = responseMessage;
      }

      alert.criarAlerta({
        icon: "error",
        html: errorMessage,
      });
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");

    api.defaults.headers.Authorization = null;
    api.defaults.headers.common = { Authorization: `` };

    setUser(null);

    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        loading,
        login,
        logout,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
