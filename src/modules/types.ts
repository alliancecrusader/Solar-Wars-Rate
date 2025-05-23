export type vehicle_cost = {
    cs: number,
    cm: number,
    el: number,
    er: number,
    cs_upkeep: number
}

type ParamBase = {
  id: string;
  label: string;
};

type ParamNumber = ParamBase & {
  type: "number";
  step?: number;
  default?: number;
};

type ParamSelect = ParamBase & {
  type: "select";
  options: string[];
  default?: string;
};

type ParamText = ParamBase & {
  type: "text";
  default?: string;
};

type ParamBool = ParamBase & {
  type: "bool";
  default?: boolean;
};

export type param_type = ParamNumber | ParamSelect | ParamText | ParamBool;
