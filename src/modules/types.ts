export type VehicleCost = {
    cs: number,
    cm: number,
    el: number,
    er: number,
    cs_upkeep: number
}

export type InfantryCost = {
  time: number;
  er: number;
}

export type SlashCommand = {
  command: string;
  args: {
    [key: string]: string
  };
}

export type ParamBase = {
  id: string;
  label: string;
};

export type NumberType = "int" | "uint" | "float" | "ufloat"

export type ParamNumber = ParamBase & {
  type: "number";
  num_type: NumberType;
  range?: {
    max?: number;
    min?: number;
  }
  step?: number,
  default?: number;
};

export type ParamSelect = ParamBase & {
  type: "select";
  options: {[key: string]: string};
  default?: string;
};

export type ParamText = ParamBase & {
  type: "text";
  default?: string;
};

export type ParamBool = ParamBase & {
  type: "bool";
  default?: boolean;
};

export type ParamType = ParamNumber | ParamSelect | ParamText | ParamBool;

export type Params = {
  [key: string]: ParamType
}

export type ParamTypeDict = {
  number: ParamNumber;
  select: ParamSelect;
  bool: ParamBool;
  text: ParamText;
};

export type InputBuilder<T extends keyof ParamTypeDict> = {
  handleChange: (id: string, value: any) => void;
  values: Record<string, any>;
  param: ParamTypeDict[T];
};