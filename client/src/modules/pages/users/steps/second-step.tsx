import { useContext } from "react";
import { WizardContext } from "../wizard-context";

export const SecondStep = () => {
  const { setUser, user, termo } = useContext(WizardContext);

  return (
    <div className="wizardContainerSS">
      <textarea
        name=""
        id="userTermo"
        cols={30}
        rows={10}
        value={termo ? termo.nomeTermo : ""}
        disabled={true}
      ></textarea>
      <div className="checkboxContainer">
        <input
          className="checkbox"
          id="termoTitle"
          type="checkbox"
          checked={user.assinouTermo}
          onChange={(e) => setUser({ ...user, assinouTermo: e.target.checked })}
        />
        <label htmlFor="termoTitle">Declaro que li e aceito os termos</label>
      </div>
      <div className="checkboxContainer">
        <input
          className="checkbox"
          id="promoTitle"
          type="checkbox"
          checked={user.permiteReceberEmailPromocoes}
          onChange={(e) =>
            setUser({ ...user, permiteReceberEmailPromocoes: e.target.checked })
          }
        />
        <label htmlFor="promoTitle">
          Aceito receber promoções em meu e-mail
        </label>
      </div>
    </div>
  );
};
