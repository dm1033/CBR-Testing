export type TestMethod = "dcp" | "lwd" | "soil";
export type PadKind = "1.0m" | "0.9dia" | "routeB";
export type Weather = "dry" | "damp" | "wet";
export type Verdict = "routeA" | "routeB";

export type DcpIncrement = {
  fromMm: number;
  toMm: number;
  blows: number;
};

export type PositionResult = {
  label: string;
  /** LWD Evd in MN/m² (MPa) */
  evd?: number;
  /** Mean DCP penetration rate mm/blow over 0–600 mm */
  pri?: number;
  estimatedCbr: number;
  allowableKpa: number;
  requiredKpa: number;
  pass: boolean;
  increments?: DcpIncrement[];
  weakLayer?: boolean;
};

export type SavedTest = {
  id: string;
  createdAt: string;
  site: string;
  crane: string;
  reactionKn: number;
  pad: PadKind;
  platformMm: number;
  material: string;
  weather: Weather;
  method: TestMethod;
  standingWater: boolean;
  recordsComplete: boolean;
  positions: PositionResult[];
  verdict: Verdict;
  notes: string;
};

export const PAD_AREA_M2: Record<PadKind, number> = {
  "1.0m": 1.0,
  "0.9dia": Math.PI * 0.45 * 0.45,
  routeB: 1.5 * 1.5,
};

export const PAD_LABEL: Record<PadKind, string> = {
  "1.0m": "1.0 × 1.0 m crane pad",
  "0.9dia": "0.9 m diameter pad",
  routeB: "1.5 × 1.5 m Route B mat",
};

export const DEPTH_STEPS = [0, 100, 200, 300, 400, 500, 600] as const;
