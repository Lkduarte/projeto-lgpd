import "./inputFieldStyles.css";

type props = {
  htmlFor?: string;
  type?: string;
  name?: string;
  id?: string;
  label?: string;
  value?: string;
  placeholder?: string;
  idContainer?: string;
  onChange?: (t: any) => void;
};

export const InputFieldComponent = (props: props) => {
  return (
    <div id={props.idContainer} className="inputContainer">
      <label htmlFor={props.htmlFor} className="labelInputComponent">
        {props.label}
      </label>
      <input
        onChange={(e) => props.onChange && props.onChange(e.target.value)}
        placeholder={props.placeholder}
        type={props.type}
        value={props.value}
        name={props.name}
        id={props.id}
        className="inputField"
      />
    </div>
  );
};
