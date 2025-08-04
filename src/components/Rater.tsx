import React, { useState } from "react";
import * as Types from "../types/rater";
import createInputElement from "./input_types/InputType";

type CalculatorProps = {
  rate_name: string;
  params: Types.Params;
  computeCost: (values: any) => Types.VehicleCost | Types.InfantryCost;
  goBack?: () => void;
};

const cost_message_formatter = (
  cost: Types.VehicleCost | Types.InfantryCost
): string => {
  if ("time" in cost) {
    // InfantryCost
    return `${cost.er} ER, Training time: ${cost.time} months (IRP)`;
  } else {
    // VehicleCost
    return `${cost.er} ER, ${cost.cm} CM, ${cost.cs} CS, ${cost.el} EL, ${cost.cs_upkeep} CS Upkeep`;
  }
};

const Rater: React.FC<CalculatorProps> = ({
  rate_name,
  params,
  computeCost,
  goBack,
}) => {
  const [values, setValues] = useState<Record<string, any>>(
    Object.fromEntries(
      Object.values(params).map((param) => [param.id, param.default])
    )
  );

  const [display, setDisplay] = useState<string>("");

  const handleChange = (id: string, value: any) => {
    if (!params[id]) {
      console.log(
        `Error: Parameter with ID ${id.toString()} does not exist for ${rate_name}.`
      );
      return;
    }

    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = () => {
    let result = undefined;
    try {
      result = computeCost(values);
    } catch (e) {
      setDisplay(`Error: ${e}.`);
    }

    setDisplay(
      cost_message_formatter(result as Types.InfantryCost | Types.VehicleCost)
    );
  };

  console.log("Current values:", values);

  return (
    <div className="container">
      <h1>{rate_name}</h1>
      {Object.entries(params).map(([_, param]) => (
        <div key={param.id} className="input-group">
          <label htmlFor={param.id}>{param.label}:</label>
          {createInputElement({
            handleChange: handleChange,
            values: values,
            param: param,
          })}
        </div>
      ))}
      <button onClick={handleSubmit}>Calculate</button>
      {<div className="result">{display}</div>}
      {goBack && (
        <button onClick={goBack} className="menu-button">
          Back to Menu
        </button>
      )}
    </div>
  );
};

export default Rater;
