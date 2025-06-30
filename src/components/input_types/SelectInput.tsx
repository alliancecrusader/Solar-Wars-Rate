import { InputBuilder } from "../../modules/types";

const SelectInput = ({handleChange, values, param}: InputBuilder<'select'>) => {
    return (
       <select
            id={param.id}
            value={values[param.id]}
            onChange={(e) => handleChange(param.id, e.target.value)}
        >
            {Object.entries(param.options).map(([id, display]) => (
                <option key={id} value={id}>{display}</option>
            ))}
        </select>
    );
}

export default SelectInput;

