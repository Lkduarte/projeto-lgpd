import { ITerm } from "../../utils/interfaces";
import { RequestMethods, request } from "../api";

class TermoController {
  async getAtual(): Promise<ITerm | any> {
    try {
      const response = await request(RequestMethods.GET, "/term/current");

      return response.data as ITerm;
    } catch (e) {
      return e;
    }
  }
}

const termoController = new TermoController();
export default termoController;
