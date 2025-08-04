import { InputBuilder } from "../../types/rater";

const TextInput = ({ handleChange, values, param }: InputBuilder<"text">) => {
  return (
    <input
      type="text"
      id={param.id}
      value={values[param.id]}
      onChange={(e) => handleChange(param.id, e.target.value)}
    />
  );
};

export default TextInput;
