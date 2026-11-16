import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "FlyRank Frontend Track",
  description: "A deployed capstone skeleton for the FlyRank internship."
};

const links = [
  { href: "/", label: "Home" },
  { href: "/dashboard/", label: "Dashboard" },
  { href: "/settings/", label: "Settings" },
  { href: "/health/", label: "Health" }
];

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <Link className="brand" href="/">
            FlyRank Workspace
          </Link>
          <nav aria-label="Primary navigation">
            {links.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
