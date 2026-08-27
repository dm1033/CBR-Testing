import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GALLERY, KIT, PACKS, SPECS, STEPS, WA } from "@/lib/products";
import { useTests } from "@/lib/store";
import { PAD_LABEL } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const tests = useTests((s) => s.tests);

  return (
    <div className="space-y-12">
      <section className="overflow-hidden rounded-xl bg-navy text-paper">
        <div className="grid gap-0 lg:grid-cols-2">
          <div className="px-5 py-8 sm:px-8 sm:py-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan">
              CBR Testing · Field kit
            </p>
            <h1 className="mt-3 text-4xl font-bold leading-tight tracking-tight sm:text-5xl">
              A CBR you can finish before the crane arrives.
            </h1>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-paper/75">
              Plate bearing is £300–£700 and half a day. Contractors buy this kit instead: a UK
              TRL-pattern Dynamic Cone Penetrometer (Impact Test SL970 class) plus the TWC dual-route
              method — four outriggers, a CBR profile, and a Route A or Route B certificate in minutes.
            </p>
            <p className="mt-4 font-mono text-lg text-amber">
              {KIT.name} · £{KIT.price.toLocaleString("en-GB")} {KIT.vat}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/kit">
                <Button variant="amber" size="lg" className="rounded-full">
                  Buy the kit
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
              <Link to="/test">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full border-white/20 bg-transparent text-paper hover:bg-white/10"
                >
                  Run a test now
                </Button>
              </Link>
            </div>
          </div>
          <div id="demo" className="bg-navy-2">
            <video
              className="h-full w-full object-cover"
              controls
              playsInline
              poster="/demo-poster.jpg"
              preload="metadata"
            >
              <source src="/demo.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {GALLERY.map((g) => (
          <img
            key={g.src}
            src={g.src}
            alt={g.alt}
            className="aspect-video w-full rounded-xl border border-line object-cover"
          />
        ))}
      </section>

      <section className="grid gap-3 sm:grid-cols-3">
        {PACKS.map((p) => (
          <Card key={p.id} className="flex flex-col">
            <p className="text-xs uppercase tracking-wider text-muted">{p.name}</p>
            <p className="mt-1 text-2xl font-bold">{p.price}</p>
            <p className="text-xs text-faint">{p.note}</p>
            <ul className="mt-3 flex-1 space-y-1 text-sm text-muted">
              {p.points.map((x) => (
                <li key={x}>— {x}</li>
              ))}
            </ul>
            <Link to="/kit" className="mt-4">
              <Button variant="teal" className="w-full rounded-full">
                {p.cta}
              </Button>
            </Link>
          </Card>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Hardware</p>
          <h2 className="mt-2 text-2xl font-bold">The DCP we sell to contractors</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Commercial TRL-pattern DCP — the same geometry GroundCheck is built for: 8&nbsp;kg hammer,
            575&nbsp;mm drop, 20&nbsp;mm 60° cone. UK stock class is Impact Test{" "}
            <a
              className="text-teal-2 underline"
              href={KIT.supplier.url}
              target="_blank"
              rel="noreferrer"
            >
              SL970
            </a>{" "}
            (or equivalent). Kessler / Gilson dual-mass kits are the US equivalent (~£2–3k) and are
            overkill for crane pads. A DCP you keep on the van undercuts every plate-bearing visit
            after the first month.
          </p>
        </div>
        <Card>
          <h3 className="font-semibold">In the case</h3>
          <ul className="mt-2 space-y-1 text-sm text-muted">
            {KIT.includes.map((x) => (
              <li key={x}>— {x}</li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-faint">{KIT.lead}</p>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold">Kit specification</h2>
        <div className="mt-3 overflow-x-auto rounded-xl border border-line bg-paper">
          <table className="w-full text-left text-sm">
            <tbody>
              {SPECS.map((s) => (
                <tr key={s.k} className="border-b border-line last:border-0">
                  <th className="w-40 px-4 py-2.5 font-medium text-muted">{s.k}</th>
                  <td className="px-4 py-2.5">{s.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">Methodology</p>
        <h2 className="mt-2 text-2xl font-bold">Four pads. One certificate.</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <Card key={s.n}>
              <p className="font-mono text-xs text-amber">{s.n}</p>
              <h3 className="mt-1 font-semibold">{s.t}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{s.d}</p>
            </Card>
          ))}
        </div>
        <p className="mt-3 text-xs text-faint">
          Screening CBR from DCP (ASTM D6951 / USACE). Not a substitute for BS 1377-9 plate bearing.
        </p>
      </section>

      <section>
        <div className="mb-3 flex items-end justify-between">
          <h2 className="text-2xl font-bold">Certificates on this device</h2>
          <Link to="/test" className="text-sm text-teal-2 hover:underline">
            New test
          </Link>
        </div>
        {tests.length === 0 ? (
          <Card className="text-sm text-muted">
            No tests yet. Run a DCP or LWD check — results stay on this device.
          </Card>
        ) : (
          <ul className="space-y-2">
            {tests.map((t) => (
              <li key={t.id}>
                <Link
                  to="/certificate/$id"
                  params={{ id: t.id }}
                  className="flex items-center justify-between gap-3 rounded-lg border border-line bg-paper px-4 py-3 hover:border-navy/30"
                >
                  <div>
                    <p className="font-medium">{t.site || "Unnamed site"}</p>
                    <p className="text-xs text-muted">
                      {new Date(t.createdAt).toLocaleString("en-GB")} · {PAD_LABEL[t.pad]} ·{" "}
                      {t.method.toUpperCase()}
                    </p>
                  </div>
                  <Badge tone={t.verdict === "routeA" ? "pass" : "warn"}>
                    {t.verdict === "routeA" ? "Route A" : "Route B"}
                  </Badge>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="rounded-xl bg-navy px-5 py-8 text-center text-paper">
        <h2 className="text-2xl font-bold">Contractors: order on WhatsApp</h2>
        <p className="mx-auto mt-2 max-w-lg text-sm text-paper/75">
          Tell us company, delivery postcode and whether you want the full kit or methodology only. We
          confirm stock, VAT invoice, and dispatch.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-3">
          <a href={WA}>
            <Button variant="amber" size="lg" className="rounded-full">
              WhatsApp David
            </Button>
          </a>
          <Link to="/kit">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-white/20 bg-transparent text-paper hover:bg-white/10"
            >
              Full kit spec
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
