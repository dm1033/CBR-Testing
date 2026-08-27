import type { ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Calculator, ClipboardList, FileSpreadsheet, Home, Package, Play } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home", icon: Home },
  { to: "/kit", label: "Buy the kit", icon: Package },
  { to: "/test", label: "Run a test", icon: ClipboardList },
  { to: "/calculator", label: "Pressure", icon: Calculator },
  { to: "/guide", label: "Method", icon: FileSpreadsheet },
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  return (
    <div className="min-h-dvh bg-bg text-ink">
      <div className="bg-navy-2 text-[11px] text-paper/70">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-1.5">
          <span>Temporary Works Consulting & Design Ltd · BS 5975:2024</span>
          <a className="hover:text-paper" href="https://www.temporaryworksconsulting.com/index.html">
            temporaryworksconsulting.com
          </a>
        </div>
      </div>
      <header className="sticky top-0 z-20 border-b border-white/10 bg-navy text-paper">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/" className="flex items-center gap-2.5">
            <img
              src="/logo-twc.png"
              alt=""
              width={40}
              height={40}
              className="size-10 rounded-sm bg-paper object-contain"
            />
            <span className="leading-tight">
              <span className="block text-sm font-semibold">Temporary Works</span>
              <span className="block text-[11px] text-paper/60">Consulting & Design Ltd</span>
            </span>
          </Link>
          <a
            href="https://wa.me/447900984900?text=Hello%20David%2C%20I%20want%20the%20TWC%20Rapid%20CBR%20Field%20Kit."
            className="hidden h-10 items-center rounded-full bg-amber px-4 text-sm font-semibold text-navy-2 sm:flex"
          >
            WhatsApp to order
          </a>
        </div>
        <nav className="no-print border-t border-white/10">
          <div className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-2 py-1.5">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-10 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm",
                    active ? "bg-blue/30 text-paper" : "text-paper/75 hover:bg-paper/10 hover:text-paper",
                  )}
                >
                  <Icon className="size-4" strokeWidth={1.75} />
                  {item.label}
                </Link>
              );
            })}
            <Link
              to="/"
              hash="demo"
              className="ml-auto flex h-10 shrink-0 items-center gap-1.5 rounded-full px-3 text-sm text-cyan"
            >
              <Play className="size-4" />
              Demo
            </Link>
          </div>
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6 pb-16">{children}</main>
      <footer className="no-print border-t border-line bg-navy-2 px-4 py-8 text-sm text-paper/70">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:justify-between">
          <p>
            © 2026 Temporary Works Consulting & Design Ltd
            <br />
            <a className="text-paper" href="mailto:david@Temporaryworksconsulting.com">
              david@Temporaryworksconsulting.com
            </a>{" "}
            · 07900 984900
          </p>
          <p className="max-w-md text-xs leading-relaxed">
            Screening CBR from DCP (ASTM D6951 / USACE). Not a substitute for BS 1377-9 plate bearing.
            Hardware is a TRL-pattern UK DCP (Impact SL970 class). Subject to stock and a competent
            person on site. Live path:{" "}
            <a className="text-paper underline" href="https://www.temporaryworksconsulting.com/CBR-Testing">
              /CBR-Testing
            </a>
            .
          </p>
        </div>
      </footer>
    </div>
  );
}
