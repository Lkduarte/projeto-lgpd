import { RequestMethods, request } from "../api";

class AuthControler {
  async login(email: string, password: string) {
    // return (await request(RequestMethods.POST, "/login", { email, password }))
    //   .data;
    return { user: { name: "teste" }, token: "aaaaaaa" };
  }
}

const authController = new AuthControler();
export default authController;
