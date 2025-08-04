import * as Types from "../../types/rater";

const NumberInput = ({
  handleChange,
  values,
  param,
}: Types.InputBuilder<"number">) => {
  const num_type = param.num_type;
  const max = param.range?.max;
  let min = param.range?.min;
  let step = param.step;

  if (num_type == "uint" || num_type == "ufloat") {
    min = 0;
  }

  if ((num_type == "uint" || num_type == "int") && step !== 1) {
    step = 1;
  }

  console.log(param.id, min);

  return (
    <input
      type="number"
      id={param.id}
      max={max}
      min={min}
      step={step}
      value={values[param.id]}
      onChange={(e) => handleChange(param.id, parseFloat(e.target.value) || 0)}
    />
  );
};

export default NumberInput;
