import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../contexts/auth-context";
import { Home } from "../modules/pages/home";
import Login from "../modules/pages/login/login";
import { UserRegisterPage } from "../modules/pages/users/usersRegister";

export const Router = () => {
  const Private = ({ children }: any) => {
    const { authenticated, loading } = useContext(AuthContext);

    if (loading) {
      return <></>;
    }

    if (authenticated) {
      return children;
    }

    return <Navigate to="/login" />;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            index
            element={
              <Private>
                <Navigate to="/home" />
              </Private>
            }
          />
          ?
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route path="/userRegister" element={<UserRegisterPage />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
