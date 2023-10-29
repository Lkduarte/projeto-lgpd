import { ITerm } from "../../utils/interfaces";
import { RequestMethods, request } from "../api";

class TermoController {
  async getAtual(): Promise<ITerm | any> {
    try {
      // const response = await request(RequestMethods.GET, "/termo/atual");

      // return response.data as ITerm;
      const termo: ITerm = {
        _id: "23413e-141141r",
        description:
          "Esse é os termos de uso dessa aplicação de TESTE: precisamos passar com 6.",
        options: [
          {
            _id: "as7as6a",
            description: "Deseja receber email?",
          },
          {
            _id: "sasas86as6",
            description: "Deseja receber cartao de natal?",
          },
          {
            _id: "daguidga8",
            description: "Deseja receber um abraço?",
          },
        ],
      };

      return termo;
    } catch (e) {
      return e;
    }
  }
}

const termoController = new TermoController();
export default termoController;
