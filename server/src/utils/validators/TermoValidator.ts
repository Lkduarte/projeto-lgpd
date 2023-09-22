import { Termo } from "../../entities";

class TermoValidator {
  public validateSave = (termo: Termo): string | null => {
    if (!termo || termo.nomeTermo === "" || termo.nomeTermo === " ")
      return "Você deve informar o nome do termo.";

    return null;
  };

  public validateUpdate = (termo: Termo): string | null => {
    if (!termo.termo_id || termo.termo_id === "")
      return "O termo informado não existe.";

    return this.validateSave(termo);
  };
}

const termoValidator = new TermoValidator();
export default termoValidator;
