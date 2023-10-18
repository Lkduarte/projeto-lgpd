import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../contexts/auth-context";
import { Login } from "../modules/pages/login/login";
import { Home } from "../modules/pages/home";

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
          <Route
            path="*"
            element={
              <Private>
                <Navigate to="/home" />
              </Private>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
