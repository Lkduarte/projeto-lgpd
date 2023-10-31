import { useContext } from "react";
import { WizardContext } from "../../../../contexts/wizard-context";

export const SecondStep = () => {
  const { setFieldValue, user, term } = useContext(WizardContext);

  return (
    <div className="wizardContainerSS">
      <h3>Termos de uso e Políticas de privacidade</h3>
      <textarea
        name=""
        id="userTermo"
        cols={30}
        rows={10}
        value={term ? term.description : ""}
        disabled={true}
      ></textarea>
      {term && (
        <div className="checkboxContainer">
          <input
            className="checkbox"
            id="promoTitle"
            type="checkbox"
            checked={user.signedTerms[0].isAccepted}
            onChange={(e) =>
              setFieldValue(`signedTerms.0.isAccepted`, e.target.checked)
            }
          />
          <label htmlFor="promoTitle">
            Ao confirmar você confirma que leu e ACEITOU os termos acima.
          </label>
        </div>
      )}
      {term &&
        term.options.map((option, index) => (
          <div className="checkboxContainer" key={option._id}>
            <input
              className="checkbox"
              id={`promoTitle_${index}`}
              type="checkbox"
              checked={
                user.signedTerms[0].signedOptions.filter(
                  (x) => x.optionId === option._id
                )[0].isAccepted
              }
              onChange={(e) => {
                setFieldValue(
                  `signedTerms.0.signedOptions.${index}.isAccepted`,
                  e.target.checked
                );
              }}
            />
            <label htmlFor={`promoTitle_${index}`}>{option.description}</label>
          </div>
        ))}
    </div>
  );
};
