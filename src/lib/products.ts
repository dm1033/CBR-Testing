export const WA =
  "https://wa.me/447900984900?text=" +
  encodeURIComponent("Hello David, I want to order the TWC Rapid CBR Field Kit.");

export const MAIL = "david@Temporaryworksconsulting.com";
export const PHONE = "07900 984900";
export const SITE = "https://www.temporaryworksconsulting.com/CBR-Testing";

export const KIT = {
  sku: "TWC-CBR-DCP-01",
  name: "TWC Rapid CBR Field Kit",
  price: 1495,
  vat: "ex VAT",
  lead: "UK dispatch typically 2–5 working days once confirmed",
  hardware:
    "TRL-pattern Dynamic Cone Penetrometer — 8 kg hammer, 575 mm drop, 20 mm 60° cone (Impact Test SL970 class or equivalent UK supply)",
  supplier: {
    name: "Impact Test SL970 class",
    url: "https://www.impact-test.co.uk/products/3147-dynamic-cone-penetrometer/",
    note: "UK TRL-pattern stock. Kessler / Gilson dual-mass kits are the US equivalent and overkill for crane pads.",
  },
  includes: [
    "8 kg / 575 mm DCP with 20 mm 60° cone and 16 mm rods",
    "Robust transit case, spare cone, spanners, tommy bar",
    "TWC dual-route methodology (Route A / Route B crane platforms)",
    "GroundCheck app — blow counter, CBR conversion, certificate",
    "30-minute briefing (video or call) on first kit",
  ],
};

export const SPECS: { k: string; v: string }[] = [
  { k: "Hammer", v: "8 kg" },
  { k: "Drop height", v: "575 mm" },
  { k: "Cone", v: "20 mm, 60°" },
  { k: "Rods", v: "16 mm" },
  { k: "Pattern", v: "TRL / ASTM D6951" },
  { k: "UK stock class", v: "Impact Test SL970" },
  { k: "Typical depth", v: "1.0 m (extension to 1.6 m)" },
  { k: "Kit mass in case", v: "≈ 17 kg" },
];

export const STEPS = [
  {
    n: "01",
    t: "Build the platform",
    d: "Min 300 mm, preferably 400 mm MOT Type 1, layers ≤ 150 mm. Photos at each outrigger.",
  },
  {
    n: "02",
    t: "Probe four pads",
    d: "8 kg hammer, 575 mm drop. Count blows every 100 mm to 600 mm at all four outrigger centres.",
  },
  {
    n: "03",
    t: "Convert to CBR",
    d: "GroundCheck uses ASTM D6951 / USACE. Screening q_all ≈ 10 × CBR (kPa). Weak layers are flagged.",
  },
  {
    n: "04",
    t: "Issue the certificate",
    d: "All four pass + dry + records complete = Route A pads. Anything else = Route B 1.5 × 1.5 m mats.",
  },
];

export const PACKS = [
  {
    id: "kit",
    name: "Field Kit",
    price: "£1,495",
    note: "ex VAT · hardware + method",
    points: ["TRL-pattern DCP (SL970 class)", "Case + spare cone", "GroundCheck app", "Dual-route certificate"],
    cta: "Order the kit",
  },
  {
    id: "method",
    name: "Methodology only",
    price: "£249",
    note: "ex VAT · if you already own a DCP",
    points: ["TWC-RPV protocol", "ASTM D6951 CBR tables", "Certificate template", "App access"],
    cta: "Buy the method",
  },
  {
    id: "visit",
    name: "Site test visit",
    price: "from £280",
    note: "four outrigger positions",
    points: ["We attend with the kit", "Same-morning certificate", "Cheaper than plate bearing", "UK mainland"],
    cta: "Book a visit",
  },
];

export const GALLERY = [
  { src: "/kit/case.jpg", alt: "TWC Rapid CBR Field Kit in open transit case" },
  { src: "/kit/site.jpg", alt: "DCP in use on a crane working platform" },
  { src: "/kit/cone.jpg", alt: "20 mm 60° cone on compacted Type 1" },
];
