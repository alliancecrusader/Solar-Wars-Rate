import ground from "./ground";
import infantry from "./infantry";
import missile from "./missile";
import ship from "./ship";
import air from "./air";

export type RaterItem = {
  rater: {
    rate: any;
    params: any;
  };
  label: string;
};

export const raters = {
  ground: { rater: ground, label: "Ground Rater" },
  shipRate: { rater: ship, label: "Ship Rater" },
  missileRate: { rater: missile, label: "Missile Rater" },
  infantryRate: { rater: infantry, label: "Infantry Rater" },
  airRate: { rater: air, label: "Air Rater (Experimental)" },
};
