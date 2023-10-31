import { useContext, useState } from "react";
import { AuthContext } from "../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { ISignedTerm, ITerm } from "../../../utils/interfaces";

const defaultSignTermObject = (term: ITerm | null) => {
  return {
    date: new Date(),
    isAccepted: false,
    signedOptions: term
      ? term.options.map((i) => {
          return { optionId: i._id, isAccepted: false };
        })
      : [],
    termId: term ? term._id : "",
  };
};

export const TermPage = () => {
  const { user, mustSignTerm, signCurrentTerm } = useContext(AuthContext);
  const [data, setData] = useState<ISignedTerm>(
    defaultSignTermObject(mustSignTerm)
  );
  const navigate = useNavigate();

  if (!user || !mustSignTerm || (user && !mustSignTerm)) {
    navigate("/login");
    return <></>;
  }

  return (
    <>
      <h1>Termos e Políticas de uso.</h1>
      <div>
        <textarea
          name=""
          id="userTermo"
          cols={30}
          rows={10}
          value={mustSignTerm.description}
          disabled={true}
        ></textarea>
        <div className="checkboxContainer">
          <input
            className="checkbox"
            id="promoTitle"
            type="checkbox"
            checked={data.isAccepted}
            onChange={(e) => setData({ ...data, isAccepted: e.target.checked })}
          />
          <label htmlFor="promoTitle">
            Ao confirmar você confirma que leu e ACEITOU os termos acima.
          </label>
        </div>
        {mustSignTerm.options.map((option, index) => (
          <div className="checkboxContainer" key={option._id}>
            <input
              className="checkbox"
              id={`promoTitle_${index}`}
              type="checkbox"
              checked={
                data.signedOptions.filter((x) => x.optionId === option._id)[0]
                  .isAccepted
              }
              onChange={(e) => {
                const updatedSignedOptions = data.signedOptions.map(
                  (signedOption) => {
                    if (signedOption.optionId === option._id) {
                      return { ...signedOption, isAccepted: e.target.checked };
                    }
                    return signedOption;
                  }
                );
                setData({ ...data, signedOptions: updatedSignedOptions });
              }}
            />
            <label htmlFor={`promoTitle_${index}`}>{option.description}</label>
          </div>
        ))}
        <button
          onClick={() => {
            if (data.isAccepted) {
              signCurrentTerm(data);
            }
          }}
        >
          Confirmar
        </button>
      </div>
    </>
  );
};
