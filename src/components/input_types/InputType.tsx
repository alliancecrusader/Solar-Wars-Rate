import BoolInput from "./BoolInput";
import NumberInput from "./NumberInput";
import SelectInput from "./SelectInput";
import TextInput from "./TextInput";
import * as Types from "../../types/rater";

const createInputElement = (
  input: Types.InputBuilder<keyof Types.ParamTypeDict>
) => {
  const param_type = input.param.type;

  switch (param_type) {
    case "bool":
      return BoolInput(input as Types.InputBuilder<"bool">);
    case "number":
      return NumberInput(input as Types.InputBuilder<"number">);
    case "select":
      return SelectInput(input as Types.InputBuilder<"select">);
    case "text":
      return TextInput(input as Types.InputBuilder<"text">);
    default:
      throw Error("Unknown input type!");
  }
};

export default createInputElement;
