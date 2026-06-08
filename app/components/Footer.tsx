import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/category/bike", label: "Bike" },
  { href: "/category/travel", label: "Travel" },
  { href: "/category/tech", label: "Tech" },
];

const socialLinks = [
  {
    href: "https://www.youtube.com/@TanmoysYatraOfficial",
    label: "YouTube",
  },
  {
    href: "#",
    label: "Instagram",
  },
  {
    href: "#",
    label: "Contact",
  },
];

export default function Footer() {
  return (
    <footer className="mt-auto border-t">
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-9 sm:px-6 sm:py-11 md:grid-cols-[1.3fr_1fr_1fr]">
        <div className="flex flex-col items-start">
          <Link href="/" className="block text-lg font-bold tracking-tight">
            Tanmoy&apos;s Blog
          </Link>
          <div className="mt-4 flex rounded-2xl border bg-card p-3">
            <Image
              src="/logo.ico"
              alt="Tanmoy's Blog logo"
              width={56}
              height={56}
              className="h-14 w-14 rounded-xl"
            />
          </div>
          <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600">
            Stories, travel notes, bike ownership updates, and videos from Tanmoy&apos;s Yatra.
          </p>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-700">Explore</h2>
          <nav className="mt-3 flex flex-wrap gap-2 md:flex-col md:items-start">
            {quickLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-700 md:px-0 md:hover:bg-transparent md:hover:text-accent"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-slate-700">Links</h2>
          <div className="mt-3 flex flex-wrap gap-2 md:flex-col md:items-start">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href === "#" ? undefined : "_blank"}
                rel={link.href === "#" ? undefined : "noreferrer"}
                className="rounded-full px-3 py-1.5 text-sm text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-700 md:px-0 md:hover:bg-transparent md:hover:text-accent"
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t">
        <p className="mx-auto max-w-5xl px-4 py-4 text-sm text-slate-500 sm:px-6">
          &copy; {new Date().getFullYear()}{" "}Tanmoy&apos;s Yatra. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
