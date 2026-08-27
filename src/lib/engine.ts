import type { PadKind, PositionResult, TestMethod, Verdict, Weather } from "./types";
import { PAD_AREA_M2 } from "./types";

/**
 * Rapid CBR / bearing screening engine.
 *
 * DCP→CBR: ASTM D6951 / USACE (DCP in mm/blow).
 *   CBR ≥ 10:  CBR = 292 / PRI^1.12
 *   CBR < 10:  CBR = 1 / (0.017019 * PRI)^2
 *
 * LWD Evd→CBR: conservative screening CBR ≈ Evd / 3  (Evd in MPa).
 *   45 MN/m² → CBR 15 → 150 kPa. Trial Route A floors:
 *     150 kPa pad → Evd ≥ 45 MN/m²
 *     ~200 kPa pad → Evd ≥ 60 MN/m²
 *
 * Allowable pressure screening: q_all ≈ 10 × CBR  (kPa), FoS baked in.
 * Not a substitute for BS 1377-9 plate bearing or a site GI.
 */

export function contactPressureKpa(reactionKn: number, pad: PadKind): number {
  const area = PAD_AREA_M2[pad];
  return reactionKn / area;
}

export function cbrFromDcpPri(priMmPerBlow: number): number {
  if (!Number.isFinite(priMmPerBlow) || priMmPerBlow <= 0) return 0;
  const high = 292 / Math.pow(priMmPerBlow, 1.12);
  if (high >= 10) return clamp(high, 0.5, 80);
  const low = 1 / Math.pow(0.017019 * priMmPerBlow, 2);
  return clamp(low, 0.5, 9.99);
}

export function cbrFromEvd(evdMpa: number): number {
  if (!Number.isFinite(evdMpa) || evdMpa <= 0) return 0;
  return clamp(evdMpa / 3, 0.5, 80);
}

export function allowableKpaFromCbr(cbr: number): number {
  return cbr * 10;
}

export function lwdPassThreshold(pad: PadKind): number {
  if (pad === "0.9dia") return 60;
  if (pad === "routeB") return 25;
  return 45;
}

export function meanPri(increments: { fromMm: number; toMm: number; blows: number }[]): number {
  let depth = 0;
  let blows = 0;
  for (const inc of increments) {
    if (inc.blows <= 0) continue;
    depth += Math.max(0, inc.toMm - inc.fromMm);
    blows += inc.blows;
  }
  if (blows <= 0 || depth <= 0) return 0;
  return depth / blows;
}

export function hasWeakLayer(
  increments: { fromMm: number; toMm: number; blows: number }[],
): boolean {
  const pris = increments
    .filter((i) => i.blows > 0 && i.toMm > i.fromMm)
    .map((i) => (i.toMm - i.fromMm) / i.blows);
  if (pris.length < 2) return false;
  const mean = pris.reduce((a, b) => a + b, 0) / pris.length;
  return pris.some((p) => p > mean * 1.8 && p > 20);
}

export function evaluatePosition(args: {
  label: string;
  method: TestMethod;
  pad: PadKind;
  reactionKn: number;
  evd?: number;
  increments?: { fromMm: number; toMm: number; blows: number }[];
  soilCbr?: number;
}): PositionResult {
  const requiredKpa = contactPressureKpa(args.reactionKn, args.pad);
  let estimatedCbr = 0;
  let pri: number | undefined;
  let weakLayer = false;

  if (args.method === "dcp" && args.increments) {
    pri = meanPri(args.increments);
    estimatedCbr = cbrFromDcpPri(pri);
    weakLayer = hasWeakLayer(args.increments);
  } else if (args.method === "lwd" && args.evd != null) {
    estimatedCbr = cbrFromEvd(args.evd);
  } else if (args.method === "soil" && args.soilCbr != null) {
    estimatedCbr = args.soilCbr;
  }

  const allowableKpa = allowableKpaFromCbr(estimatedCbr);
  let pass = allowableKpa >= requiredKpa && !weakLayer;

  if (args.method === "lwd" && args.evd != null) {
    pass = args.evd >= lwdPassThreshold(args.pad) && !weakLayer;
  }
  if (args.method === "soil") {
    pass = false;
  }

  return {
    label: args.label,
    evd: args.evd,
    pri,
    estimatedCbr,
    allowableKpa,
    requiredKpa,
    pass,
    increments: args.increments,
    weakLayer,
  };
}

export function overallVerdict(args: {
  positions: PositionResult[];
  weather: Weather;
  standingWater: boolean;
  recordsComplete: boolean;
  method: TestMethod;
}): Verdict {
  if (args.standingWater || args.weather === "wet") return "routeB";
  if (!args.recordsComplete) return "routeB";
  if (args.method === "soil") return "routeB";
  if (args.positions.length < 4) return "routeB";
  if (args.positions.some((p) => !p.pass)) return "routeB";
  return "routeA";
}

export const SOIL_TABLE: { name: string; cbr: number; qall: number; note: string }[] = [
  { name: "Hard rock", cbr: 80, qall: 2000, note: "Verify no fractures" },
  { name: "Dense gravel / Type 1", cbr: 30, qall: 300, note: "When dry and compacted" },
  { name: "Compacted sand", cbr: 15, qall: 150, note: "Drops when saturated" },
  { name: "Stiff clay (dry)", cbr: 10, qall: 100, note: "Highly moisture-sensitive" },
  { name: "Medium clay", cbr: 6, qall: 60, note: "Needs larger mats" },
  { name: "Loose sand", cbr: 5, qall: 50, note: "High risk" },
  { name: "Wet clay / made ground", cbr: 3, qall: 30, note: "Route B or improve formation" },
];

export const METHOD_COMPARE = [
  {
    name: "Plate bearing (BS 1377-9)",
    time: "25–40 min + kentledge",
    cost: "£275–£700 / visit",
    use: "Reference test. Slow. Often refused on cost.",
  },
  {
    name: "Light Weight Deflectometer",
    time: "2–4 min / point",
    cost: "Kit £3–8k or hire ~£450/wk",
    use: "Best rapid stiffness check. GPS, same-morning certificate.",
  },
  {
    name: "Dynamic Cone Penetrometer",
    time: "5–12 min / point",
    cost: "£1,495 kit — then £0 on site",
    use: "Cheapest self-performed CBR profile. Finds weak layers.",
  },
  {
    name: "Clegg hammer",
    time: "< 1 min",
    cost: "Low–moderate",
    use: "Too limited for high-load outriggers.",
  },
  {
    name: "Pocket penetrometer",
    time: "Seconds",
    cost: "£50–£150",
    use: "Cohesive-soil screen only. Cannot pass Route A.",
  },
];

function clamp(n: number, lo: number, hi: number) {
  return Math.min(hi, Math.max(lo, n));
}
