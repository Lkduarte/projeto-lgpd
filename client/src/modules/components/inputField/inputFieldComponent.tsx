import "./inputFieldStyles.css";
import InputMask from "react-input-mask";

type props = {
  htmlFor?: string;
  type?: string;
  name?: string;
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  idContainer?: string;
  isValid?: boolean;
  maxLength?: number;
  mask?: string;
  onBlur?: () => void;
  onChange?: (t: any) => void;
};

export const InputFieldComponent = (props: props) => {
  return (
    <div id={props.idContainer} className="inputContainer">
      <label htmlFor={props.htmlFor} className="labelInputComponent">
        {props.label}
      </label>
      {props.mask ? (
        <InputMask
          mask={props.mask}
          onBlur={(e) => {
            if (props.isValid) {
              e.target.style.borderColor = "#323232";
            } else {
              e.target.style.borderColor = "red";
            }
            if (props.onBlur) props.onBlur();
          }}
          style={{
            borderColor: props.isValid ? "#323232" : "red",
          }}
          onChange={(e) => {
            props.onChange && props.onChange(e.target.value);
          }}
          placeholder={props.placeholder}
          // type={props.type}
          value={props.value}
          name={props.name}
          id={props.id}
          className="inputField"
        />
      ) : (
        <input
          maxLength={props.maxLength}
          onBlur={(e) => {
            if (props.isValid) {
              e.target.style.borderColor = "#323232";
            } else {
              e.target.style.borderColor = "red";
            }
          }}
          style={{
            borderColor: props.isValid ? "#323232" : "red",
          }}
          onChange={(e) => {
            props.onChange && props.onChange(e.target.value);
          }}
          placeholder={props.placeholder}
          type={props.type}
          value={props.value}
          name={props.name}
          id={props.id}
          className="inputField"
        />
      )}
    </div>
  );
};
