/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../services/api";
import useAlert from "../utils/alerts";
import authController from "../services/controllers/authController";
import { IUser } from "../utils/interfaces";

interface AuthContextProps {
  authenticated: boolean;
  user: IUser | null;
  loading: boolean;
  login: (x: string, y: string) => void;
  logout: () => void;
  updateUser: (x: IUser) => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({ children }: any) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);
  const alert = useAlert();

  const login = async (email: string, password: string) => {
    try {
      const response = await authController.login(email, password);
      const loggedUser = response.data;

      api.defaults.headers.common["Cookie"] = document.cookie;

      setUser(loggedUser);
      setLoading(false);

      navigate("/home");
    } catch (e: any) {
      const responseMessage = e.response.data.message;
      let errorMessage;

      if (
        responseMessage.includes("User unauth") ||
        responseMessage.includes("user not found for this email")
      ) {
        errorMessage = "Email ou senha incorreto(a).";
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
    api.defaults.headers.common["Cookie"] = null;
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
        updateUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
