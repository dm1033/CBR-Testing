import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTests } from "@/lib/store";
import { PAD_LABEL } from "@/lib/types";
import { useHydrated } from "@/lib/use-hydrated";
import { formatCbr, formatKpa } from "@/lib/utils";

export const Route = createFileRoute("/certificate/$id")({ component: CertPage });

function CertPage() {
  const { id } = Route.useParams();
  const hydrated = useHydrated();
  const test = useTests((s) => s.tests.find((t) => t.id === id));
  const remove = useTests((s) => s.remove);

  if (!hydrated) {
    return <Card className="text-sm text-muted">Loading certificate…</Card>;
  }

  if (!test) {
    return (
      <Card>
        Certificate not found on this device.{" "}
        <Link to="/" className="text-teal-2 underline">
          Home
        </Link>
      </Card>
    );
  }

  const pass = test.verdict === "routeA";

  return (
    <div className="space-y-5">
      <div className="no-print flex flex-wrap gap-2">
        <Button variant="teal" onClick={() => window.print()}>
          Print / save PDF
        </Button>
        <Link to="/test">
          <Button variant="outline">New test</Button>
        </Link>
        <Button
          variant="ghost"
          onClick={() => {
            remove(test.id);
            window.history.back();
          }}
        >
          Delete
        </Button>
      </div>

      <article className="rounded-xl border-2 border-navy bg-paper p-6">
        <header className="border-b border-line pb-4">
          <p className="text-xs uppercase tracking-[0.22em] text-muted">Rapid Platform Verification</p>
          <h1 className="font-display text-3xl font-semibold tracking-wide">GroundCheck certificate</h1>
          <p className="mt-1 font-mono text-xs text-faint">
            RPV-{test.id.slice(0, 8).toUpperCase()} · {new Date(test.createdAt).toLocaleString("en-GB")} · TWC-TFC-CM-001 Rev F
          </p>
        </header>

        <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
          <Row k="Site" v={test.site} />
          <Row k="Crane" v={test.crane} />
          <Row k="Envelope" v={`${test.reactionKn} kN reaction`} />
          <Row k="Pad" v={PAD_LABEL[test.pad]} />
          <Row k="Platform" v={`${test.platformMm} mm ${test.material}`} />
          <Row k="Weather" v={`${test.weather}${test.standingWater ? " · standing water" : ""}`} />
          <Row k="Method" v={test.method.toUpperCase()} />
          <Row k="Records" v={test.recordsComplete ? "Photo + dimensions complete" : "Incomplete"} />
        </dl>

        <table className="mt-6 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-line text-xs uppercase tracking-wider text-muted">
              <th className="py-2">Position</th>
              <th className="py-2">CBR / Evd</th>
              <th className="py-2">q all</th>
              <th className="py-2">Required</th>
              <th className="py-2">Result</th>
            </tr>
          </thead>
          <tbody>
            {test.positions.map((p) => (
              <tr key={p.label} className="border-b border-line/70">
                <td className="py-2">{p.label}</td>
                <td className="py-2 font-mono">
                  {formatCbr(p.estimatedCbr)}
                  {p.evd != null ? ` · Evd ${p.evd}` : ""}
                  {p.pri != null ? ` · PRI ${p.pri.toFixed(1)}` : ""}
                </td>
                <td className="py-2 font-mono">{formatKpa(p.allowableKpa)}</td>
                <td className="py-2 font-mono">{formatKpa(p.requiredKpa)}</td>
                <td className="py-2">
                  <Badge tone={p.pass ? "pass" : "fail"}>{p.pass ? "Pass" : p.weakLayer ? "Weak layer" : "Fail"}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className={`mt-6 rounded-lg border p-4 ${pass ? "border-pass bg-pass-bg" : "border-warn bg-warn-bg"}`}>
          <p className="text-xs uppercase tracking-wider">{pass ? "Route A accepted" : "Route B required"}</p>
          <p className="mt-1 font-display text-2xl font-semibold tracking-wide">
            {pass
              ? "Standard crane-supplied pads may be used."
              : "Install min 1.5 × 1.5 m multi-layer timber (or equivalent) under each outrigger."}
          </p>
          <p className="mt-2 text-sm opacity-80">
            Any fail, missing test, standing water or incomplete records = Route B. Valid only for the platform
            condition at the time of test and the stated envelope. Re-test after rain, disturbance or a change of crane.
          </p>
        </div>

        {test.notes ? <p className="mt-4 text-sm text-muted">{test.notes}</p> : null}

        <p className="mt-6 text-xs leading-relaxed text-faint">
          Screening only. DCP CBR from ASTM D6951 / USACE. LWD Evd thresholds are trial values (TWC-RPV-001) and
          are not a published replacement for BS 1377-9 plate bearing. Category 2 check recommended before first
          operational use. Temporary Works Consulting & Design Ltd.
        </p>
      </article>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-wider text-muted">{k}</dt>
      <dd>{v}</dd>
    </div>
  );
}
