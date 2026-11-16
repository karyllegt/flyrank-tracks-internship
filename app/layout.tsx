import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyRank Workspace",
  description: "A focused workspace for building and shipping with AI."
};

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard/", label: "Dashboard" },
  { href: "/settings/", label: "Settings" },
  { href: "/chat/", label: "Chat" },
  { href: "/health/", label: "Health" }
];

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <div className="brand-wrap">
            <Link className="brand" href="/">
              <span className="brand-mark">F</span>
              <span>FlyRank <b>Workspace</b></span>
            </Link>
            <span className="status-pill"><i /> Live workspace</span>
          </div>
          <nav aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
