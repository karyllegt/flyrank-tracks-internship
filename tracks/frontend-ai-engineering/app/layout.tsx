import { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = { title: "FlyRank Workspace", description: "A focused workspace for building and shipping with AI." };
const links = [
  { href: "/dashboard/", label: "Command center", icon: "01" },
  { href: "/health/", label: "System health", icon: "02" },
  { href: "/chat/", label: "AI workspace", icon: "03" },
  { href: "/settings/", label: "Settings", icon: "04" }
];

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>
    <header className="site-header"><div className="brand-wrap"><Link className="brand" href="/"><span className="brand-mark">F</span><span>FlyRank <b>Workspace</b></span></Link><span className="status-pill"><i /> Prototype / live preview</span></div>
      <nav aria-label="Primary navigation">{links.map((link) => <Link key={link.href} href={link.href}><small>{link.icon}</small><span>{link.label}</span></Link>)}</nav>
    </header><main className="container">{children}</main>
  </body></html>;
}
