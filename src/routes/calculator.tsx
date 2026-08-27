import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { contactPressureKpa } from "@/lib/engine";
import type { PadKind } from "@/lib/types";
import { PAD_AREA_M2, PAD_LABEL } from "@/lib/types";
import { formatKpa } from "@/lib/utils";

export const Route = createFileRoute("/calculator")({ component: CalcPage });

function CalcPage() {
  const [kn, setKn] = useState(150);
  const [pad, setPad] = useState<PadKind>("1.0m");
  const p = useMemo(() => contactPressureKpa(kn, pad), [kn, pad]);
  const needCbr = p / 10;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-wide">Pad pressure</h1>
        <p className="mt-1 text-sm text-muted">
          Average ground bearing pressure = reaction ÷ pad area. Screening CBR target ≈ pressure / 10.
        </p>
      </div>
      <Card className="grid gap-4 sm:grid-cols-2">
        <div>
          <Label>Outrigger reaction (kN)</Label>
          <Input type="number" value={kn} onChange={(e) => setKn(Number(e.target.value) || 0)} />
        </div>
        <div>
          <Label>Pad</Label>
          <select
            className="h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
            value={pad}
            onChange={(e) => setPad(e.target.value as PadKind)}
          >
            {(Object.keys(PAD_LABEL) as PadKind[]).map((k) => (
              <option key={k} value={k}>
                {PAD_LABEL[k]} ({PAD_AREA_M2[k].toFixed(2)} m²)
              </option>
            ))}
          </select>
        </div>
      </Card>
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <p className="text-xs uppercase tracking-wider text-muted">Contact pressure</p>
          <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{formatKpa(p)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-muted">Screening CBR needed</p>
          <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{needCbr.toFixed(1)}</p>
        </Card>
        <Card>
          <p className="text-xs uppercase tracking-wider text-muted">Area</p>
          <p className="mt-1 font-display text-3xl font-semibold tabular-nums">{PAD_AREA_M2[pad].toFixed(2)} m²</p>
        </Card>
      </div>
      <Card className="text-sm leading-relaxed text-muted">
        <p className="font-medium text-ink">Worked envelope (150 kN)</p>
        <ul className="mt-2 list-disc space-y-1 pl-5">
          <li>1.0 × 1.0 m pad → 150 kPa → screening CBR ≥ 15</li>
          <li>0.9 m diameter → ≈ 236 kPa → screening CBR ≥ 24</li>
          <li>1.5 × 1.5 m Route B mat → 67 kPa → screening CBR ≥ 7</li>
        </ul>
      </Card>
    </div>
  );
}
