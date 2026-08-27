import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/guide")({ component: GuidePage });

function GuidePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-semibold tracking-wide">How to use this on site</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Companion to TWC-TFC-CM-001 Rev F. Enhanced platform first — then this test — then pads.
        </p>
      </div>
      <ol className="space-y-3">
        {[
          "Build the platform: min 300 mm, preferably 400 mm MOT Type 1, layers ≤ 150 mm. Photos and dimensions at each outrigger.",
          "Choose the pad you intend to use (1.0 m square, 0.9 m dia, or Route B mats).",
          "DCP: 8 kg hammer, 575 mm drop. Count blows every 100 mm to 600 mm at all four outrigger centres.",
          "Or LWD: three recorded drops after seating, at ~150 or ~200 kPa plate stress.",
          "Issue the certificate. All four pass + dry + records complete = Route A. Anything else = Route B.",
          "Re-test after rain. Wet weather can turn a pass into a fail in hours.",
        ].map((t, i) => (
          <li key={i} className="flex gap-3 rounded-lg border border-line bg-paper p-4 text-sm leading-relaxed">
            <span className="font-display text-xl font-semibold text-teal">{i + 1}</span>
            <span>{t}</span>
          </li>
        ))}
      </ol>
      <Card>
        <h2 className="font-display text-xl font-semibold tracking-wide">Toolbox talk (for the PC who will not pay)</h2>
        <div className="mt-3 space-y-3 text-sm leading-relaxed text-muted">
          <p>
            Outrigger pads put very high pressure on a small area. If the ground under one leg is soft, the
            crane can go over. CIRIA C703 and HSE case files are full of that story — including UK
            prosecutions after an outrigger sank.
          </p>
          <p>
            A plate test is a few hundred pounds. A DCP is cheaper still and you can do it yourselves this
            morning. If you will not test, we do not argue — we use the 1.5 × 1.5 m mats. That is Route B.
            Choosing not to test is a commercial decision. It does not make the small pads acceptable.
          </p>
          <p className="text-ink">A few hundred pounds is cheap insurance. A crane on its side is not.</p>
        </div>
      </Card>
      <p className="text-xs text-faint">
        BS 5975, BS 1377-9, BS 1924-2, ASTM D6951, CIRIA C703, TWf 2022.02, BRE 470, BS 7121, CDM 2015, LOLER.
      </p>
    </div>
  );
}
