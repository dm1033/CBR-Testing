import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GALLERY, KIT, MAIL, PACKS, PHONE, SPECS, WA } from "@/lib/products";
import { useState } from "react";

export const Route = createFileRoute("/kit")({ component: KitPage });

function KitPage() {
  const [company, setCompany] = useState("");
  const [name, setName] = useState("");
  const [postcode, setPostcode] = useState("");
  const [pack, setPack] = useState("kit");

  const message = encodeURIComponent(
    `Hello David, order from GroundCheck / CBR-Testing.\nCompany: ${company || "—"}\nName: ${name || "—"}\nPostcode: ${postcode || "—"}\nPack: ${pack}`,
  );
  const wa = `https://wa.me/447900984900?text=${message}`;
  const mail = `mailto:${MAIL}?subject=${encodeURIComponent("TWC Rapid CBR order")}&body=${message}`;

  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-teal">SKU {KIT.sku}</p>
        <h1 className="mt-1 text-3xl font-bold">{KIT.name}</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Sold to UK contractors for crane outrigger / working-platform checks. Hardware is a
          TRL-pattern DCP in the Impact Test SL970 class — not a toy penetrometer. Methodology is TWC
          dual-route (Route A standard pads if the four-point test passes; Route B 1.5 × 1.5 m mats if
          it does not).
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        {GALLERY.map((g) => (
          <img
            key={g.src}
            src={g.src}
            alt={g.alt}
            className="aspect-video w-full rounded-xl border border-line object-cover"
          />
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {PACKS.map((p) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setPack(p.id)}
            className={`rounded-xl border p-5 text-left ${pack === p.id ? "border-teal bg-paper ring-2 ring-teal/30" : "border-line bg-paper"}`}
          >
            <p className="text-xs uppercase tracking-wider text-muted">{p.name}</p>
            <p className="mt-1 text-2xl font-bold">{p.price}</p>
            <p className="text-xs text-faint">{p.note}</p>
          </button>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <h2 className="text-lg font-semibold">What you get</h2>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {KIT.includes.map((x) => (
              <li key={x}>— {x}</li>
            ))}
          </ul>
          <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
            {SPECS.map((s) => (
              <div key={s.k} className="contents">
                <dt className="text-muted">{s.k}</dt>
                <dd>{s.v}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-4 text-sm">
            <span className="font-semibold text-ink">
              £{KIT.price.toLocaleString("en-GB")} {KIT.vat}
            </span>
            <span className="text-muted"> · {KIT.lead}</span>
          </p>
          <p className="mt-3 text-xs leading-relaxed text-faint">
            Screening only (ASTM D6951). Not BS 1377-9. We invoice from Temporary Works Consulting
            & Design Ltd. VAT extra. We confirm equivalent kit model and serial on the order
            acknowledgement. Hardware class:{" "}
            <a className="underline" href={KIT.supplier.url} target="_blank" rel="noreferrer">
              Impact Test SL970
            </a>
            .
          </p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold">Order</h2>
          <p className="mt-1 text-sm text-muted">
            No card on this page — WhatsApp or email. We send a VAT invoice.
          </p>
          <div className="mt-4 space-y-3">
            <div>
              <Label>Company</Label>
              <Input
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                placeholder="Total Framing Contractors Ltd"
              />
            </div>
            <div>
              <Label>Your name</Label>
              <Input value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
              <Label>Delivery postcode</Label>
              <Input
                value={postcode}
                onChange={(e) => setPostcode(e.target.value)}
                placeholder="NR14 7UD"
              />
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={wa}>
              <Button variant="amber" className="rounded-full">
                WhatsApp order
              </Button>
            </a>
            <a href={mail}>
              <Button variant="outline" className="rounded-full">
                Email {MAIL}
              </Button>
            </a>
          </div>
          <p className="mt-3 text-xs text-faint">
            Or call {PHONE}. Existing WhatsApp:{" "}
            <a className="underline" href={WA}>
              quick message
            </a>
            .
          </p>
        </Card>
      </div>

      <Card className="text-sm leading-relaxed text-muted">
        <h2 className="font-semibold text-ink">Why this kit, not a plate test</h2>
        <p className="mt-2">
          Principal Contractors skip plate bearing because of cost. A DCP is a few hundred pounds of
          steel you keep. After one avoided plate visit it has paid for itself. If you will not test,
          TWC designs default to Route B mats — that is still cheaper than a crane punch-through.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Link to="/test" className="text-teal-2 underline">
            Open the field tester
          </Link>
          <Link to="/guide" className="text-teal-2 underline">
            Read the method
          </Link>
          <Link to="/cost" className="text-teal-2 underline">
            Cost versus risk
          </Link>
        </div>
      </Card>
    </div>
  );
}
