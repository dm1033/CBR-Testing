import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { METHOD_COMPARE, SOIL_TABLE } from "@/lib/engine";

export const Route = createFileRoute("/methods")({ component: MethodsPage });

function MethodsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-wide">What is actually cheap and fast</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          There is no new physics. The cheap test is a DCP you already own or can buy for a few hundred
          pounds. The fast test is an LWD. Plate bearing remains the reference — this kit exists so cost
          is no longer a reason to skip verification.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
              <th className="py-2 pr-3">Method</th>
              <th className="py-2 pr-3">Time</th>
              <th className="py-2 pr-3">Cost</th>
              <th className="py-2">Use on crane pads</th>
            </tr>
          </thead>
          <tbody>
            {METHOD_COMPARE.map((m) => (
              <tr key={m.name} className="border-b border-line/70 align-top">
                <td className="py-3 pr-3 font-medium">{m.name}</td>
                <td className="py-3 pr-3">{m.time}</td>
                <td className="py-3 pr-3">{m.cost}</td>
                <td className="py-3 text-muted">{m.use}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Card>
        <h2 className="font-display text-xl font-semibold tracking-wide">How GroundCheck converts a DCP to CBR</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          ASTM D6951 / USACE: CBR = 292 / PRI<sup>1.12</sup> when CBR ≥ 10, else CBR = 1 / (0.017019 × PRI)²,
          with PRI in mm/blow. Allowable screening pressure is taken as 10 × CBR (kPa). LWD uses Evd / 3 as a
          conservative CBR estimate (45 MN/m² → CBR 15 → 150 kPa) and trial Route A floors of 45 / 60 MN/m². These are screening values —
          not BS 1377-9.
        </p>
      </Card>
      <div>
        <h2 className="mb-3 font-display text-xl font-semibold tracking-wide">Soil table (planning only)</h2>
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
              <th className="py-2">Ground</th>
              <th className="py-2">Typical CBR</th>
              <th className="py-2">q all kPa</th>
              <th className="py-2">Note</th>
            </tr>
          </thead>
          <tbody>
            {SOIL_TABLE.map((s) => (
              <tr key={s.name} className="border-b border-line/70">
                <td className="py-2">{s.name}</td>
                <td className="py-2 font-mono">{s.cbr}</td>
                <td className="py-2 font-mono">{s.qall}</td>
                <td className="py-2 text-muted">{s.note}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-faint">Soil type never passes Route A. Test or use Route B.</p>
      </div>
    </div>
  );
}
