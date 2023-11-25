import userController from "../../../../services/controllers/userController";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../contexts/auth-context";
import { useNavigate } from "react-router-dom";
import useAlert from "../../../../utils/alerts";
import "./editTermStyles.css";
import { ISignedTerm, ITerm } from "../../../../utils/interfaces";

export const EditTerm = () => {
  const { user, logout } = useContext(AuthContext);
  const [term, setTerm] = useState<ITerm | null>(null);
  const [userSignature, setUserSignature] = useState<ISignedTerm | null>(null);
  const alert = useAlert();
  const navigate = useNavigate();

  const loadTermInfo = async () => {
    const data = await userController.getCurrentTermSignature(user?._id ?? "");

    if (!data) {
      navigate("/home");
      return;
    }

    const { signature, ...termo } = data;
    setTerm(termo);

    const signedTerm: ISignedTerm = {
      termId: termo._id,
      isAccepted: true,
      date: signature.date,
      signedOptions: signature.signedOptions.map((x: any) => {
        return {
          optionId: x.optionId,
          isAccepted: x.isAccepted,
        };
      }),
    };
    setUserSignature(signedTerm);
  };

  const deleteMyself = () => {
    alert.criarConfirmacao({
      html: "Deseja realmente excluir sua conta?",
      confirmAction: async () => {
        const data = await userController.deleteUser(user?._id ?? "");

        if (data) {
          alert.criarAlerta({ html: "Conta excluída com sucesso!" });
          logout();
        }
      },
    });
  };

  useEffect(() => {
    loadTermInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submit = async () => {
    console.log("?");
    if (!user || !userSignature) return;

    const response = await userController.updateTermSign(
      user._id ?? "",
      userSignature
    );

    if (response.response && response.response.status !== 200) {
      let error = response.response.data.message ?? "";
      if (
        error.includes("signedTerm and user id are required for this operation")
      ) {
        error = "Dados inválidos.";
      } else if (error.includes("User not found")) {
        error = "Usuário não encontrado.";
      } else if (error.includes("Term not found")) {
        error = "Termo não encontrado.";
      } else if (error.includes("not signed")) {
        error = "Termo não assinado.";
      } else {
        error = "Um erro ocorreu ao atualizar a assinatura do termo.";
      }
      alert.criarAlerta({
        title: "Opss...",
        html: error,
      });
    } else {
      navigate("/home");
    }
  };

  return (
    <div className="termoContainer">
      <h1>Termos e Políticas de uso</h1>
      <div>
        <textarea
          name=""
          id="userTermo"
          cols={30}
          rows={10}
          value={term ? term.description : ""}
          disabled={true}
        />
        <div className="checkboxContainer">
          <input
            className="checkbox"
            id="promoTitle"
            type="checkbox"
            disabled
            checked={true}
            // onChange={(e) => {

            //   if (userSignature) {
            //     setUserSignature({
            //       ...userSignature,
            //       isAccepted: e.target.checked,
            //     });
            //   }
            // }}
          />
          <label htmlFor="promoTitle">
            Ao confirmar você confirma que leu e ACEITOU os termos acima.
          </label>
        </div>
        {term && (
          <>
            {term.options.map((option, index) => (
              <div className="checkboxContainer" key={option._id}>
                <input
                  className="checkbox"
                  id={`promoTitle_${index}`}
                  type="checkbox"
                  checked={
                    userSignature
                      ? userSignature.signedOptions.filter(
                          (x) => x.optionId === option._id
                        )[0].isAccepted
                      : false
                  }
                  onChange={(e) => {
                    if (userSignature) {
                      const updatedSignedOptions =
                        userSignature.signedOptions.map((signedOption) => {
                          if (signedOption.optionId === option._id) {
                            return {
                              ...signedOption,
                              isAccepted: e.target.checked,
                            };
                          }
                          return signedOption;
                        });
                      setUserSignature({
                        ...userSignature,
                        signedOptions: updatedSignedOptions,
                      });
                    }
                  }}
                />
                <label htmlFor={`promoTitle_${index}`}>
                  {option.description}
                </label>
              </div>
            ))}
          </>
        )}
        <div className="termoButtonContainer">
          <button
            className="button loginButton"
            onClick={() => {
              if (userSignature) {
                submit();
              }
            }}
          >
            Confirmar
          </button>
          <button onClick={deleteMyself} className="button cancelButton">
            Recusar (Excluir conta)
          </button>
        </div>
      </div>
    </div>
  );
};
