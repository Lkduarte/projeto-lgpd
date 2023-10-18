import { useContext } from "react";
import { AuthContext } from "../../contexts/auth-context";

export const Home = () => {
  const { user } = useContext(AuthContext);

  return (
    <div>
      <h2>página de home</h2>
      <p>{user.name ?? "--"}</p>
    </div>
  );
};
