import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/cost")({ component: CostPage });

const ROWS = [
  ["DCP self-test (this kit)", "£0–£20 of site time", "Four points, CBR profile, weak-layer flag"],
  ["LWD hire / visit", "£180–£280 target", "2–4 min/point, stiffness at pad stress"],
  ["Plate bearing visit", "£300–£700", "Gold standard — often refused"],
  ["1.5 × 1.5 m Route B mats", "£150–£400 / set, reusable", "Automatic if you skip the test"],
  ["Crane punch-through / overturn", "Tens of thousands + delay", "HSE fines £10–20k+ per company in UK cases"],
];

function CostPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-wide">Cost versus risk</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Principal Contractors skip plate tests because of cost. Skipping verification does not remove
          the risk — it just puts it on the TWC, the Appointed Person, and anyone under the load.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
              <th className="py-2 pr-3">Item</th>
              <th className="py-2 pr-3">Money</th>
              <th className="py-2">What you get</th>
            </tr>
          </thead>
          <tbody>
            {ROWS.map((r) => (
              <tr key={r[0]} className="border-b border-line/70 align-top">
                <td className="py-3 pr-3 font-medium">{r[0]}</td>
                <td className="py-3 pr-3">{r[1]}</td>
                <td className="py-3 text-muted">{r[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Card className="border-navy bg-navy text-paper">
        <p className="text-xs uppercase tracking-[0.18em] text-paper/55">Verdict</p>
        <p className="mt-2 font-display text-2xl font-semibold leading-snug tracking-wide">
          Not testing because of cost is the reason the dual-route design exists.
        </p>
        <p className="mt-3 text-sm leading-relaxed text-paper/75">
          Route A if DCP or LWD at all four pads meets the envelope. Route B — 1.5 × 1.5 m mats — if
          you will not test, cannot test, or fail. That is the cheapest safe answer when a plate test
          is off the table.
        </p>
      </Card>
    </div>
  );
}
