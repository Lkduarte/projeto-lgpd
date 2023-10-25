import { IUserRegister } from "../../utils/interfaces";
import { RequestMethods, request } from "../api";

class AuthControler {
  async login(email: string, password: string) {
    // return (await request(RequestMethods.POST, "/login", { email, password }))
    //   .data;
    return { user: { name: "teste" }, token: "aaaaaaa" };
  }

  async register(data: IUserRegister) {
    try {
      const response = await request(RequestMethods.POST, "/register", data);

      return response.data;
    } catch (e) {
      return e;
    }
  }
}

const authController = new AuthControler();
export default authController;
