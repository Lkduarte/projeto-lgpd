import { useContext } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthContext, AuthProvider } from "../contexts/auth-context";
import Login from "../modules/pages/login/login";
import { UserRegisterPage } from "../modules/pages/users/usersRegister";
import { UserEdit } from "../modules/pages/users/editUser/userEdit";
import EditConfirm from "../modules/pages/users/editUser/editConfirm";
import Home from "../modules/pages/home/home";
import { TermPage } from "../modules/pages/term/termo";
import { EditPassword } from "../modules/pages/users/editpassword/editPassword";
import { EditTerm } from "../modules/pages/users/editterm/editTerm";

export const Router = () => {
  const PrivateAuth = ({ children }: any) => {
    const { authenticated, mustSignTerm } = useContext(AuthContext);

    if (mustSignTerm) {
      return <Navigate to="/currentTerm" />;
    }

    if (authenticated) {
      return children;
    }

    return <Navigate to="/login" />;
  };

  const PrivateByTerm = ({ children }: any) => {
    const { mustSignTerm } = useContext(AuthContext);

    if (mustSignTerm) {
      return <Navigate to="/currentTerm" />;
    }

    return children;
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route index element={<Navigate to="/home" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/userRegister" element={<UserRegisterPage />} />
          <Route path="/currentTerm" element={<TermPage />} />
          <Route
            path="/home"
            element={
              <PrivateByTerm>
                <Home />
              </PrivateByTerm>
            }
          />
          <Route
            path="/userEdit"
            element={
              <PrivateAuth>
                <UserEdit />
              </PrivateAuth>
            }
          />
          <Route
            path="/editpassword"
            element={
              <PrivateAuth>
                <EditPassword />
              </PrivateAuth>
            }
          />
          <Route
            path="/editConfirm"
            element={
              <PrivateAuth>
                <EditConfirm />
              </PrivateAuth>
            }
          />
          <Route
            path="/editterm"
            element={
              <PrivateAuth>
                <EditTerm />
              </PrivateAuth>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};
