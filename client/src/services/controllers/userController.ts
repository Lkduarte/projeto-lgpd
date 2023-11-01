import { ISignedTerm, IUserData } from "../../utils/interfaces";
import { RequestMethods, request } from "../api";

class UserController {
  async update(_id: string, password: string, data: IUserData) {
    try {
      const response = await request(
        RequestMethods.PATCH,
        `/user/updateUser/${_id}`,
        { data, password }
      );

      return response.data;
    } catch (e) {
      return e;
    }
  }

  async hasSignedCurrentTerm(_id: string) {
    try {
      const response = await request(
        RequestMethods.GET,
        `/user/hasSignedCurrentTerm/${_id}`
      );

      if (response.data !== null) return response.data;

      return false;
    } catch (e: any) {
      if (e.response.data) return e.response.data;
      return e;
    }
  }

  async signCurrentTerm(_id: string, data: ISignedTerm) {
    try {
      const response = await request(
        RequestMethods.POST,
        `/user/signCurrentTerm/${_id}`,
        { signedTerm: data }
      );

      return response.data;
    } catch (e: any) {
      if (e.response.data) return e.response.data;
      return e;
    }
  }
}

const userController = new UserController();
export default userController;
