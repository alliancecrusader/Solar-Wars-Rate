import { VehicleCost, Params } from "../types/rater";

const aircraftTypeOptions = {
  fighter: "Fighter",
  attack: "Attack",
  bomber: "Bomber",
  recon: "Recon",
  utility: "Utility",
  multirole: "Multirole",
};

const stealthOptions = {
  none: "No",
  low: "Low Observability",
  full: "Full Stealth",
};

const radarOptions = {
  none: "None",
  normal: "Normal",
  aew: "AEW (Airborne Early Warning)",
};

const environmentOptions = {
  air: "Air",
  hybrid: "Hybrid (Air & Space)",
  space: "Space",
};

const loadTypeOptions = {
  none: "None",
  ordinance: "Ordinance",
  transport: "Transport",
  utility: "Utility",
};

const capabilityOptions = {
  normal: "Normal",
  stol: "STOL (Short Takeoff/Landing)",
  vtol: "VTOL (Vertical Takeoff/Landing)",
};

type AircraftType = keyof typeof aircraftTypeOptions;
type StealthType = keyof typeof stealthOptions;
type RadarType = keyof typeof radarOptions;
type EnvironmentType = keyof typeof environmentOptions;
type LoadType = keyof typeof loadTypeOptions;
type CapabilityType = keyof typeof capabilityOptions;

export type AirRateInput = {
  length: number;
  aircraft_type: AircraftType;
  helicopter: boolean;
  drone: boolean;
  stealth: StealthType;
  radar: RadarType;
  environment: EnvironmentType;
  shield: boolean;
  load_type: LoadType;
  load_capacity: number;
  guns: number;
  systems: number;
  capability: CapabilityType;
  mach_speed: number;
  twr: number;
};

const params: Params = {
  length: {
    id: "length",
    label: "Length (meters)",
    type: "number",
    num_type: "ufloat",
    default: 15,
  },
  aircraft_type: {
    id: "aircraft_type",
    label: "Aircraft Type",
    type: "select",
    options: aircraftTypeOptions,
    default: "fighter",
  },
  helicopter: {
    id: "helicopter",
    label: "Helicopter",
    type: "bool",
    default: false,
  },
  drone: { id: "drone", label: "Drone", type: "bool", default: false },
  stealth: {
    id: "stealth",
    label: "Stealth",
    type: "select",
    options: stealthOptions,
    default: "none",
  },
  radar: {
    id: "radar",
    label: "Radar",
    type: "select",
    options: radarOptions,
    default: "none",
  },
  environment: {
    id: "environment",
    label: "Flight Domain",
    type: "select",
    options: environmentOptions,
    default: "air",
  },
  shield: { id: "shield", label: "Shield", type: "bool", default: false },
  load_type: {
    id: "load_type",
    label: "Load Type",
    type: "select",
    options: loadTypeOptions,
    default: "none",
  },
  load_capacity: {
    id: "load_capacity",
    label: "Load Capacity (kg)",
    type: "number",
    num_type: "ufloat",
    default: 0,
  },
  guns: {
    id: "guns",
    label: "Guns/Cannons",
    type: "number",
    num_type: "uint",
    default: 0,
  },
  systems: {
    id: "systems",
    label: "Systems",
    type: "number",
    num_type: "uint",
    default: 0,
  },
  capability: {
    id: "capability",
    label: "Takeoff/Landing Capability",
    type: "select",
    options: capabilityOptions,
    default: "normal",
  },
  mach_speed: {
    id: "mach_speed",
    label: "Mach Speed (for Air/Hybrid)",
    type: "number",
    num_type: "ufloat",
    default: 1.0,
  },
  twr: {
    id: "twr",
    label: "Thrust-to-Weight Ratio (for Space/Hybrid)",
    type: "number",
    num_type: "ufloat",
    default: 1.0,
  },
};

const aircraftTypeModifiers = {
  fighter: { er: 1.0, cm: 1.0, cs: 5 },
  attack: { er: 1.1, cm: 1.05, cs: 6 },
  bomber: { er: 1.2, cm: 1.15, cs: 10 },
  recon: { er: 0.9, cm: 1.1, cs: 3 },
  utility: { er: 0.8, cm: 0.8, cs: 1 },
  multirole: { er: 1.25, cm: 1.15, cs: 6 },
};

const stealthModifiers = {
  none: { er: 1.0, el: 0, cs: 0 },
  low: { er: 1.2, el: 10, cs: 2 },
  full: { er: 1.5, el: 25, cs: 4 },
};

const radarModifiers = {
  none: { er: 0, cm: 0, el: 0, cs: 0 },
  normal: { er: 1000000, cm: 5, el: 10, cs: 2 },
  aew: { er: 2500000, cm: 10, el: 25, cs: 5 },
};

const environmentModifiers = {
  air: { er: 0, el: 0, cs: 0 },
  hybrid: { er: 3000000, el: 15, cs: 4 },
  space: { er: 5000000, el: 25, cs: 8 },
};

const loadTypeModifiers = {
  none: 0,
  ordinance: 10000, // per 100kg
  transport: 7500, // per 100kg
  utility: 5000, // per 100kg
};

const capabilityModifiers = {
  normal: { er: 1.0, el: 0, cs: 0 },
  stol: { er: 1.1, el: 5, cs: 2 },
  vtol: { er: 1.3, el: 15, cs: 5 },
};

const er = (values: AirRateInput): number => {
  const {
    length,
    aircraft_type,
    helicopter,
    drone,
    stealth,
    radar,
    environment,
    shield,
    load_type,
    load_capacity,
    guns,
    systems,
    capability,
    mach_speed,
    twr,
  } = values;

  // Base cost calculation: length² / 120 + base_ER + (length × 2,800,000)
  let baseCost = length ** 2 / 120 + length * 2800000;

  // Apply aircraft type multiplier
  baseCost *= aircraftTypeModifiers[aircraft_type].er;

  // Apply helicopter multiplier
  if (helicopter) {
    baseCost *= 0.85;
  }

  // Apply drone multiplier
  if (drone) {
    baseCost *= 0.7;
  }

  // Apply stealth multiplier
  baseCost *= stealthModifiers[stealth].er;

  // Apply capability multiplier
  baseCost *= capabilityModifiers[capability].er;

  // Add fixed costs
  baseCost += radarModifiers[radar].er;
  baseCost += environmentModifiers[environment].er;

  if (shield) {
    baseCost += 3000000;
  }

  // Add load capacity cost
  if (load_type !== "none") {
    const loadCostPer100kg = loadTypeModifiers[load_type];
    baseCost += (load_capacity / 100) * loadCostPer100kg;
  }

  // Add guns cost
  baseCost += guns * 25000;

  // Add systems cost
  baseCost += systems * 15000;

  // Add speed cost based on environment
  if (environment === "air") {
    baseCost += mach_speed * 1500000;
  } else if (environment === "space") {
    baseCost += twr * 2000000;
  } else {
    // hybrid
    baseCost += mach_speed * 1250000 + twr * 1500000;
  }

  return baseCost;
};

const cm = (values: AirRateInput): number => {
  const { length, aircraft_type, helicopter, drone, radar } = values;

  // Base CM calculation (simplified version of ER formula)
  let baseCost = length * 50;

  // Apply aircraft type multiplier
  baseCost *= aircraftTypeModifiers[aircraft_type].cm;

  // Apply helicopter multiplier
  if (helicopter) {
    baseCost *= 0.9;
  }

  // Apply drone multiplier
  if (drone) {
    baseCost *= 0.85;
  }

  // Add radar cost
  baseCost += radarModifiers[radar].cm;

  return baseCost;
};

const el = (values: AirRateInput): number => {
  const {
    stealth,
    radar,
    environment,
    shield,
    guns,
    systems,
    drone,
    capability,
  } = values;

  let baseCost = 0;

  // Add stealth cost
  baseCost += stealthModifiers[stealth].el;

  // Add radar cost
  baseCost += radarModifiers[radar].el;

  // Add environment cost
  baseCost += environmentModifiers[environment].el;

  // Add shield cost
  if (shield) {
    baseCost += 15;
  }

  // Add drone cost
  if (drone) {
    baseCost += 10;
  }

  // Add guns cost
  baseCost += guns * 5;

  // Add systems cost
  baseCost += systems * 2;

  // Add capability cost
  baseCost += capabilityModifiers[capability].el;

  return baseCost;
};

const cs = (values: AirRateInput): number => {
  const {
    aircraft_type,
    helicopter,
    drone,
    stealth,
    radar,
    environment,
    shield,
    guns,
    capability,
  } = values;

  let baseCost = 0;

  // Add aircraft type cost
  baseCost += aircraftTypeModifiers[aircraft_type].cs;

  // Apply helicopter multiplier
  let multiplier = helicopter ? 0.85 : 1.0;

  // Apply drone multiplier
  if (drone) {
    multiplier *= 0.8;
  }

  // Add stealth cost
  baseCost += stealthModifiers[stealth].cs;

  // Add radar cost
  baseCost += radarModifiers[radar].cs;

  // Add environment cost
  baseCost += environmentModifiers[environment].cs;

  // Add shield cost
  if (shield) {
    baseCost += 5;
  }

  // Add guns cost
  baseCost += guns;

  // Add capability cost
  baseCost += capabilityModifiers[capability].cs;

  return baseCost * multiplier;
};

const rate = (values: AirRateInput): VehicleCost => {
  const er_cost = Math.ceil(er(values));
  const cm_cost = Math.ceil(cm(values));
  const el_cost = Math.ceil(el(values));
  const cs_cost = Math.ceil(cs(values));
  const cs_upkeep = Math.ceil(cs_cost / 6);

  return {
    er: er_cost,
    cm: cm_cost,
    el: el_cost,
    cs: cs_cost,
    cs_upkeep: cs_upkeep,
  };
};

export default {
  rate: rate,
  params: params,
};
