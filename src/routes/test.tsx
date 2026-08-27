import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Minus, Plus } from "lucide-react";
import { useMemo, useState, type ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { evaluatePosition, overallVerdict } from "@/lib/engine";
import { useTests } from "@/lib/store";
import type { DcpIncrement, PadKind, PositionResult, TestMethod, Weather } from "@/lib/types";
import { DEPTH_STEPS, PAD_LABEL } from "@/lib/types";
import { formatCbr, formatKpa, uid } from "@/lib/utils";

export const Route = createFileRoute("/test")({ component: TestPage });

const POS_LABELS = ["Front left", "Front right", "Rear left", "Rear right"];

function emptyIncrements(): DcpIncrement[] {
  const out: DcpIncrement[] = [];
  for (let i = 0; i < DEPTH_STEPS.length - 1; i++) {
    out.push({ fromMm: DEPTH_STEPS[i], toMm: DEPTH_STEPS[i + 1], blows: 0 });
  }
  return out;
}

function TestPage() {
  const nav = useNavigate();
  const save = useTests((s) => s.save);

  const [site, setSite] = useState("");
  const [crane, setCrane] = useState("Böcker AK46");
  const [reactionKn, setReactionKn] = useState(150);
  const [pad, setPad] = useState<PadKind>("1.0m");
  const [platformMm, setPlatformMm] = useState(400);
  const [material, setMaterial] = useState("MOT Type 1");
  const [weather, setWeather] = useState<Weather>("dry");
  const [standingWater, setStandingWater] = useState(false);
  const [recordsComplete, setRecordsComplete] = useState(true);
  const [method, setMethod] = useState<TestMethod>("dcp");
  const [notes, setNotes] = useState("");
  const [activePos, setActivePos] = useState(0);
  const [dcp, setDcp] = useState<DcpIncrement[][]>(() => POS_LABELS.map(() => emptyIncrements()));
  const [evd, setEvd] = useState<number[]>([0, 0, 0, 0]);
  const [soilCbr, setSoilCbr] = useState(10);

  const positions: PositionResult[] = useMemo(() => {
    return POS_LABELS.map((label, i) =>
      evaluatePosition({
        label,
        method,
        pad,
        reactionKn,
        evd: evd[i],
        increments: dcp[i],
        soilCbr,
      }),
    );
  }, [method, pad, reactionKn, evd, dcp, soilCbr]);

  const verdict = overallVerdict({
    positions,
    weather,
    standingWater,
    recordsComplete,
    method,
  });

  function bumpBlow(pos: number, inc: number, delta: number) {
    setDcp((prev) =>
      prev.map((row, i) =>
        i !== pos
          ? row
          : row.map((r, j) => (j !== inc ? r : { ...r, blows: Math.max(0, r.blows + delta) })),
      ),
    );
  }

  function issue() {
    const id = uid();
    save({
      id,
      createdAt: new Date().toISOString(),
      site: site.trim() || "Unnamed site",
      crane,
      reactionKn,
      pad,
      platformMm,
      material,
      weather,
      method,
      standingWater,
      recordsComplete,
      positions,
      verdict,
      notes,
    });
    void nav({ to: "/certificate/$id", params: { id } });
  }

  return (
    <div className="space-y-5">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-wide">New site test</h1>
        <p className="mt-1 text-sm text-muted">
          Four outrigger positions. DCP is the cheap method — tap blows per 100 mm. LWD if you have the kit.
        </p>
      </div>

      <Card className="grid gap-4 sm:grid-cols-2">
        <Field label="Site / job">
          <Input value={site} onChange={(e) => setSite(e.target.value)} placeholder="e.g. Chelmsford plot 12" />
        </Field>
        <Field label="Crane">
          <Input value={crane} onChange={(e) => setCrane(e.target.value)} />
        </Field>
        <Field label="Max outrigger reaction (kN)">
          <Input
            type="number"
            min={20}
            max={400}
            value={reactionKn}
            onChange={(e) => setReactionKn(Number(e.target.value) || 0)}
          />
        </Field>
        <Field label="Pad / mat">
          <select
            className="h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
            value={pad}
            onChange={(e) => setPad(e.target.value as PadKind)}
          >
            {(Object.keys(PAD_LABEL) as PadKind[]).map((k) => (
              <option key={k} value={k}>
                {PAD_LABEL[k]}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Platform thickness (mm)">
          <Input
            type="number"
            value={platformMm}
            onChange={(e) => setPlatformMm(Number(e.target.value) || 0)}
          />
        </Field>
        <Field label="Material">
          <Input value={material} onChange={(e) => setMaterial(e.target.value)} />
        </Field>
        <Field label="Weather">
          <select
            className="h-11 w-full rounded-md border border-line bg-paper px-3 text-sm"
            value={weather}
            onChange={(e) => setWeather(e.target.value as Weather)}
          >
            <option value="dry">Dry</option>
            <option value="damp">Damp</option>
            <option value="wet">Wet</option>
          </select>
        </Field>
        <div className="flex flex-col justify-end gap-2 text-sm">
          <label className="flex h-11 items-center gap-2">
            <input
              type="checkbox"
              checked={standingWater}
              onChange={(e) => setStandingWater(e.target.checked)}
            />
            Standing water on platform
          </label>
          <label className="flex h-11 items-center gap-2">
            <input
              type="checkbox"
              checked={recordsComplete}
              onChange={(e) => setRecordsComplete(e.target.checked)}
            />
            Photo + dimensional records complete
          </label>
        </div>
      </Card>

      <div className="flex flex-wrap gap-2">
        {(["dcp", "lwd", "soil"] as TestMethod[]).map((m) => (
          <Button
            key={m}
            variant={method === m ? "teal" : "outline"}
            size="sm"
            onClick={() => setMethod(m)}
          >
            {m === "dcp" ? "DCP (cheap CBR)" : m === "lwd" ? "LWD Evd" : "Soil table only"}
          </Button>
        ))}
      </div>

      {method === "soil" && (
        <Card className="text-sm text-muted">
          Soil-type estimates cannot pass Route A. Use them to size mats, then run DCP or LWD.
          <div className="mt-3 max-w-xs">
            <Label>Assumed CBR</Label>
            <Input
              type="number"
              value={soilCbr}
              onChange={(e) => setSoilCbr(Number(e.target.value) || 0)}
            />
          </div>
        </Card>
      )}

      <div className="flex gap-2 overflow-x-auto">
        {POS_LABELS.map((label, i) => (
          <button
            key={label}
            onClick={() => setActivePos(i)}
            className={`h-11 shrink-0 rounded-md border px-3 text-sm ${
              activePos === i ? "border-navy bg-navy text-paper" : "border-line bg-paper"
            }`}
          >
            {label}
            <span className="ml-2 font-mono text-xs">
              {positions[i].pass ? "PASS" : "FAIL"}
            </span>
          </button>
        ))}
      </div>

      {method === "dcp" && (
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold tracking-wide">
              DCP blows — {POS_LABELS[activePos]}
            </h2>
            <Badge tone={positions[activePos].pass ? "pass" : "fail"}>
              CBR {formatCbr(positions[activePos].estimatedCbr)}
            </Badge>
          </div>
          <p className="mb-4 text-sm text-muted">
            8 kg hammer, 575 mm drop, 20 mm 60° cone. Count blows for each 100 mm. Large + is glove-friendly.
          </p>
          <ul className="space-y-3">
            {dcp[activePos].map((inc, j) => (
              <li key={inc.fromMm} className="flex items-center gap-3">
                <span className="w-24 font-mono text-xs text-muted">
                  {inc.fromMm}–{inc.toMm} mm
                </span>
                <Button variant="outline" size="sm" className="h-12 w-12" onClick={() => bumpBlow(activePos, j, -1)}>
                  <Minus className="size-4" />
                </Button>
                <span className="w-10 text-center font-mono text-lg tabular-nums">{inc.blows}</span>
                <Button variant="teal" size="sm" className="h-12 w-12" onClick={() => bumpBlow(activePos, j, 1)}>
                  <Plus className="size-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => bumpBlow(activePos, j, 5)}>
                  +5
                </Button>
              </li>
            ))}
          </ul>
          {positions[activePos].weakLayer && (
            <p className="mt-3 text-sm text-fail">Weak layer detected — this position fails Route A.</p>
          )}
        </Card>
      )}

      {method === "lwd" && (
        <Card>
          <h2 className="mb-3 font-display text-xl font-semibold tracking-wide">
            LWD Evd — {POS_LABELS[activePos]}
          </h2>
          <Label>Evd (MN/m²)</Label>
          <Input
            type="number"
            value={evd[activePos] || ""}
            onChange={(e) => {
              const v = Number(e.target.value) || 0;
              setEvd((prev) => prev.map((x, i) => (i === activePos ? v : x)));
            }}
            placeholder="e.g. 48"
          />
          <p className="mt-2 text-xs text-muted">
            Mean of three drops after seating. Threshold {pad === "0.9dia" ? 60 : 45} MN/m² for this pad
            (trial criteria).
          </p>
        </Card>
      )}

      <Card className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs uppercase tracking-wider text-muted">Live verdict</p>
          <p className="font-display text-2xl font-semibold tracking-wide">
            {verdict === "routeA" ? "Route A — standard crane pads" : "Route B — 1.5 × 1.5 m mats"}
          </p>
          <p className="text-sm text-muted">
            Contact {formatKpa(positions[0]?.requiredKpa ?? 0)} · screening q_all from CBR × 10 kPa
          </p>
        </div>
        <Button variant="teal" size="lg" onClick={issue}>
          Issue certificate
        </Button>
      </Card>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      {children}
    </div>
  );
}
