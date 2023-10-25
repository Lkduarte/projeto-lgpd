import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../contexts/auth-context";
import Login from "../modules/pages/login/login";
import { UserRegisterPage } from "../modules/pages/users/usersRegister";
import { UserEdit } from "../modules/pages/users/userEdit";
import EditConfirm from "../modules/pages/users/editConfirm";
import Home from "../modules/pages/home/home";

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
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />}/>
          <Route path="/userRegister" element={<UserRegisterPage />} />
          <Route path="/userEdit" element={<UserEdit />} />
          <Route path="/editConfirm" element={<EditConfirm />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
