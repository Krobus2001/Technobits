import Link from "next/link";

import {
  FaFacebookF,
  FaInstagram,
  FaGithub,
  FaTiktok,
} from "react-icons/fa";

import { HiOutlineMail } from "react-icons/hi";
import { GoRepo } from "react-icons/go";

export default function DeveloperPage() {
  return (  
    <div className="mx-auto max-w-6xl px-6 py-20">

      {/* Back Button */}

      <Link
        href="/"
        className="mb-10 inline-flex items-center rounded-xl border border-white/10 px-5 py-3 text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
      >
        ← Back to Home
      </Link>

      {/* Hero */}

      <div className="mb-16 rounded-3xl border border-white/10 bg-gradient-to-r from-[#07182F] to-[#0A2545] p-10">

        <span className="rounded-full bg-cyan-500/20 px-4 py-2 text-sm font-bold text-cyan-400">
          About
        </span>

        <h1 className="mt-6 text-5xl font-black text-white">
          The Developer
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-8 text-slate-400">
          Learn more about the purpose of the TECHNOBITS Website and
          the developer behind its creation.
        </p>

      </div>

      {/* About Website */}

      <section className="mb-20 rounded-3xl border border-white/10 bg-[#07182F] p-10">

        <h2 className="text-3xl font-black text-white">
          About the Website
        </h2>

        <p className="mt-6 leading-8 text-slate-300">
          The TECHNOBITS Website was created to serve as the official
          digital platform of the TECHNOBITS Club. It provides students
          with access to tutorials, discussions, announcements, events,
          technical services, and information about the club's officers
          in one centralized location.
        </p>

        <p className="mt-6 leading-8 text-slate-300">
          More than just a website, it was designed to improve
          communication, simplify club management, and provide a strong
          foundation that future TECHNOBITS officers can continue to
          improve and expand.
        </p>

      </section>

      {/* About Developer */}

      <section className="rounded-3xl border border-white/10 bg-[#07182F] p-10">

        <div className="grid items-center gap-12 lg:grid-cols-[320px_1fr]">

          {/* Photo */}

          <div className="flex justify-center">

            <img
              src="/developer/blaise.png"
              alt="Blaise Tyrel Daga"
              className="w-full max-w-[300px] rounded-3xl border-4 border-cyan-400"
            />

          </div>

          {/* Info */}

          <div>

            <h2 className="text-4xl font-black text-white">
              Blaise Tyrel Daga
            </h2>

            <p className="mt-3 text-cyan-400 font-semibold">
              Original Developer of the TECHNOBITS Website
            </p>

            <div className="mt-8 space-y-2 text-slate-300">

              <p>
                <span className="font-semibold text-white">
                  Position:
                </span>{" "}
                President — TECHNOBITS
              </p>

              <p>
                <span className="font-semibold text-white">
                  Academic Year:
                </span>{" "}
                2026–2027
              </p>

              <p>
                <span className="font-semibold text-white">
                  Program:
                </span>{" "}
                Bachelor of Science in Information Systems
              </p>

            </div>

            <p className="mt-8 leading-8 text-slate-300">
              This website was designed and developed by Blaise Tyrel
              Daga during his term as President of TECHNOBITS for
              Academic Year 2026–2027. It was created to provide the
              organization with a modern, centralized platform where
              students can access tutorials, discussions, events,
              technical services, and club information in one place.
            </p>

            <p className="mt-6 leading-8 text-slate-300">
              The goal of this project is not only to serve the current
              officers and members but also to leave behind a lasting
              contribution that future TECHNOBITS officers can continue
              to maintain, improve, and expand for the benefit of the
              organization.
            </p>

            {/* Divider */}

            <div className="my-10 h-px bg-white/10" />

            {/* Contact */}

            <div>

            <h3 className="text-2xl font-bold text-white">
                Connect with the Developer
            </h3>

            <p className="mt-3 text-slate-400">
                Feel free to reach out for collaboration, feedback, or
                questions regarding the TECHNOBITS Website.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">

                <a
                href="https://www.facebook.com/blaisetyrel.billones"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-500"
                >
                <FaFacebookF size={18} />
                Facebook
                </a>

                <a
                href="https://www.instagram.com/blaise.billones/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 px-5 py-3 font-semibold text-white transition hover:opacity-90"
                >
                <FaInstagram size={18} />
                Instagram
                </a>

                <a
                href="https://www.tiktok.com/@blaisetyreldaga"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-black px-5 py-3 font-semibold text-white transition hover:bg-neutral-800"
                >
                <FaTiktok size={18} />
                TikTok
                </a>

                <a
                href="https://github.com/Krobus2001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-slate-700 px-5 py-3 font-semibold text-white transition hover:bg-slate-600"
                >
                <FaGithub size={18} />
                GitHub
                </a>

                <a
                href="https://github.com/Krobus2001/Technobits"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white transition hover:bg-emerald-500"
                >
                <GoRepo size={18} />
                Website Repository
                </a>

                <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=blaisedaga21@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-500"
              >
                <HiOutlineMail size={18} />
                Email
              </a>

            </div>

            </div>

          </div>

        </div>

      </section>

      {/* Closing */}

      <div className="mt-20 text-center">

        <p className="text-2xl italic text-cyan-400">
          "Empowering Students Through Technology."
        </p>

        <p className="mt-4 uppercase tracking-[0.35em] text-slate-500">
          TECHNOBITS
        </p>

      </div>

    </div>
  );
}