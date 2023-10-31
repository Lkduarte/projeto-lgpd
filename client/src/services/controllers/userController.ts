import { RequestMethods, request } from "../api";

class UserController {
  async login(email: string, password: string) {
    // return (await request(RequestMethods.POST, "/login", { email, password }))
    //   .data;
    return { user: { name: "teste" }, token: "aaaaaaa" };
  }

  async update(data: any, _id: any) {
    try {
        const response = await request(
          RequestMethods.PATCH,
          `/user/updateUser/${_id}`,
          {data}
        );
  
        return response.data;
      } catch (e) {
        return e;
      }
  }
}

const userController = new UserController();
export default userController;
