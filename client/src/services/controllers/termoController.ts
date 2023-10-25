import { ITermo } from "../../utils/interfaces";
import { RequestMethods, request } from "../api";

class TermoController {
  async getAtual(): Promise<ITermo | any> {
    try {
      const response = await request(RequestMethods.GET, "/termo/atual");

      return response.data as ITermo;
    } catch (e) {
      return e;
    }
  }
}

const termoController = new TermoController();
export default termoController;
