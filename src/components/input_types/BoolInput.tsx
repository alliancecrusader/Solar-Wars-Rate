import { InputBuilder } from "../../modules/types";

const parseBool = (value: string): boolean => {
    if (value.toLowerCase() === "true") return true;
    if (value.toLowerCase() === "false") return false;
    return false;
};

const BoolInput = ({handleChange, values, param}: InputBuilder<'bool'>) => {
    return (
    <select
        id={param.id}
        value={values[param.id]}
        onChange={(e) => handleChange(param.id, parseBool(e.target.value))}
    >
        <option value="true">True</option>
        <option value="false">False</option>
    </select>
    );
}

export default BoolInput;
