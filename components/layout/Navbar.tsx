"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import Button from "../ui/Button";

const links = [
  { name: "Home", href: "/" },
  { name: "Tutorials", href: "/tutorials" },
  { name: "Discussions", href: "/discussions" },
  { name: "Events", href: "/events" },
  { name: "Services", href: "/services" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-white/10 bg-[#07182F]/90 shadow-xl backdrop-blur-2xl"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link href="/" className="flex items-center gap-4">
          <Image
            src="/technobitslogo.png"
            alt="TECHNOBITS"
            width={52}
            height={52}
            priority
          />

          <div>
            <h1 className="text-lg font-black tracking-wider text-white">
              TECHNOBITS
            </h1>

            <p className="text-xs text-slate-400">
              Empowering Students Through Technology
            </p>
          </div>
        </Link>

        {/* Desktop Navigation */}

        <nav className="hidden items-center gap-8 lg:flex">
          {links.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="font-medium text-slate-300 transition hover:text-cyan-400"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Login */}

        <div className="hidden lg:block">
          <Link href="/login">
            <Button>Login</Button>
          </Link>
        </div>

        {/* Mobile Menu Button */}

        <button
          onClick={() => setOpen(!open)}
          className="text-white lg:hidden"
          aria-label="Toggle menu"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t border-white/10 bg-[#07182F]/95 backdrop-blur-xl lg:hidden">
          <div className="flex flex-col gap-2 p-6">
            {links.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg py-3 text-slate-300 transition hover:bg-white/5 hover:text-cyan-400"
              >
                {link.name}
              </Link>
            ))}

            <div className="mt-4">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
              >
                <Button className="w-full justify-center">
                  Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}