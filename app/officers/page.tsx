import { createClient } from "@/lib/supabase-server";

export default async function OfficersPage() {
  const supabase = await createClient();

  const { data: officers } = await supabase
    .from("officers")
    .select(`
      *,
      club_positions (
        id,
        title,
        category
      )
    `)
    .order("club_position_id");

  const academicYear =
    officers?.[0]?.academic_year ??
    "2026-2027";

  const sponsor = officers?.find(
    (o) =>
      o.club_positions?.title ===
      "Sponsor"
  );

  const president = officers?.find(
    (o) =>
      o.club_positions?.title ===
      "President"
  );

  const executives =
    officers?.filter(
      (o) =>
        o.club_positions?.category ===
        "Executive"
    ) ?? [];

  const associates =
    officers?.filter(
      (o) =>
        o.club_positions?.category ===
        "Associate"
    ) ?? [];

  return (
  <div className="mx-auto max-w-7xl px-6 py-20">

    {/* Back Button */}

    <a
      href="/"
      className="mb-8 inline-flex items-center gap-2 rounded-xl border border-white/10 bg-[#07182F] px-5 py-3 font-semibold text-slate-300 transition hover:border-cyan-400 hover:text-cyan-400"
    >
      ← Back to Home
    </a>

    {/* Hero */}

    <div className="rounded-3xl border border-white/10 bg-gradient-to-r from-[#07182F] to-[#0A2545] p-12 text-center">

      <span className="rounded-full bg-cyan-500/20 px-5 py-2 text-sm font-bold text-cyan-400">
        TECHNOBITS Leadership
      </span>

      <h1 className="mt-6 text-5xl font-black text-white">
        Meet the Officers
      </h1>

      <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
        Meet the dedicated officers leading TECHNOBITS with innovation,
        collaboration, and service. Together, we strive to empower students
        through technology and create opportunities for learning, growth, and
        community engagement.
      </p>

      <div className="mt-8 inline-block rounded-2xl bg-cyan-500/10 px-8 py-5">

        <p className="text-sm uppercase tracking-widest text-slate-400">
          Academic Year
        </p>

        <p className="mt-2 text-3xl font-black text-cyan-400">
          {academicYear}
        </p>

      </div>

    </div>

    {/* Sponsor & President */}

<div className="mt-16 grid gap-10 lg:grid-cols-2">

  {[sponsor, president].map(
    (officer, index) =>
      officer && (
        <div
          key={officer.id}
          className="overflow-hidden rounded-3xl border border-white/10 bg-[#07182F]"
        >

          <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/10 p-8 text-center">

            <img
            src={officer.photo_url}
            alt={officer.full_name}
            className="mx-auto h-[420px] w-[300px] rounded-2xl border-4 border-cyan-400 object-contain bg-[#091f39]"
            />

            <p className="mt-6 text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              {index === 0
                ? "Sponsor"
                : "President"}
            </p>

            <h2 className="mt-3 text-4xl font-black text-white">
              {officer.full_name}
            </h2>

            {officer.quote && (
              <p className="mx-auto mt-6 max-w-xl italic leading-8 text-slate-400">
                "{officer.quote}"
              </p>
            )}

          </div>

          <div className="flex flex-wrap justify-center gap-3 p-8">

            {officer.facebook_url && (
              <a
                href={officer.facebook_url}
                target="_blank"
                className="rounded-xl bg-blue-600 px-5 py-3 font-bold text-white hover:bg-blue-500"
              >
                Facebook
              </a>
            )}

            {officer.Instagram_url && (
              <a
                href={officer.instagram_url}
                target="_blank"
                className="rounded-xl bg-pink-600 px-5 py-3 font-bold text-white hover:bg-pink-500"
              >
                Instagram
              </a>
            )}

            {officer.tiktok_url && (
              <a
                href={officer.tiktok_url}
                target="_blank"
                className="rounded-xl bg-black px-5 py-3 font-bold text-white hover:bg-neutral-800"
              >
                TikTok
              </a>
            )}

            {officer.github_url && (
              <a
                href={officer.github_url}
                target="_blank"
                className="rounded-xl bg-slate-700 px-5 py-3 font-bold text-white hover:bg-slate-600"
              >
                GitHub
              </a>
            )}

            {officer.gmail && (
              <a
                href={`mailto:${officer.gmail}`}
                className="rounded-xl bg-red-600 px-5 py-3 font-bold text-white hover:bg-red-500"
              >
                Gmail
              </a>
            )}

          </div>

        </div>
      )
  )}

</div>

{/* Executive Officers */}

<div className="mt-20">

  <div className="mb-10 text-center">

    <h2 className="text-4xl font-black text-white">
      Executive Officers
    </h2>

    <p className="mt-3 text-slate-400">
      Leading the organization and overseeing all club operations.
    </p>

  </div>

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">

    {executives.map((officer) => (

      <div
        key={officer.id}
        className="overflow-hidden rounded-3xl border border-white/10 bg-[#07182F] transition hover:-translate-y-2 hover:border-cyan-400"
      >

        <div className="p-8 text-center">

          <img
            src={officer.photo_url}
            alt={officer.full_name}
            className="mx-auto h-[320px] w-[220px] rounded-2xl border-4 border-cyan-400 object-contain bg-[#091f39]"
          />

          <p className="mt-5 text-sm font-bold uppercase tracking-widest text-cyan-400">
            {officer.club_positions?.title}
          </p>

          <h3 className="mt-2 text-2xl font-bold text-white">
            {officer.full_name}
          </h3>

          {officer.quote && (
            <p className="mt-5 italic leading-7 text-slate-400">
              "{officer.quote}"
            </p>
          )}

        </div>

        <div className="flex flex-wrap justify-center gap-2 border-t border-white/10 p-6">

          {officer.facebook_url && (
            <a
              href={officer.facebook_url}
              target="_blank"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500"
            >
              Facebook
            </a>
          )}

          {officer.instagram_url && (
            <a
              href={officer.instagram_url}
              target="_blank"
              className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-bold text-white hover:bg-pink-500"
            >
              Instagram
            </a>
          )}

          {officer.tiktok_url && (
            <a
              href={officer.tiktok_url}
              target="_blank"
              className="rounded-lg bg-black px-4 py-2 text-sm font-bold text-white hover:bg-neutral-800"
            >
              TikTok
            </a>
          )}

          {officer.github_url && (
            <a
              href={officer.github_url}
              target="_blank"
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-bold text-white hover:bg-slate-600"
            >
              GitHub
            </a>
          )}

          {officer.gmail && (
            <a
              href={`mailto:${officer.gmail}`}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
            >
              Gmail
            </a>
          )}

        </div>

      </div>

    ))}

  </div>

</div>

{/* Associate Officers */}

<div className="mt-20">

  <div className="mb-10 text-center">

    <h2 className="text-4xl font-black text-white">
      Associate Officers
    </h2>

    <p className="mt-3 text-slate-400">
      Supporting the executive team and helping deliver TECHNOBITS activities.
    </p>

  </div>

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">

    {associates.map((officer) => (

      <div
        key={officer.id}
        className="overflow-hidden rounded-3xl border border-white/10 bg-[#07182F] transition hover:-translate-y-2 hover:border-cyan-400"
      >

        <div className="p-8 text-center">

          <img
            src={officer.photo_url}
            alt={officer.full_name}
            className="mx-auto h-[280px] w-[200px] rounded-2xl border-4 border-cyan-400 object-contain bg-[#091f39]"
          />

          <p className="mt-5 text-sm font-bold uppercase tracking-widest text-cyan-400">
            {officer.club_positions?.title}
          </p>

          <h3 className="mt-2 text-xl font-bold text-white">
            {officer.full_name}
          </h3>

          {officer.quote && (
            <p className="mt-5 italic leading-7 text-slate-400">
              "{officer.quote}"
            </p>
          )}

        </div>

        <div className="flex flex-wrap justify-center gap-2 border-t border-white/10 p-6">

          {officer.facebook_url && (
            <a
              href={officer.facebook_url}
              target="_blank"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-500"
            >
              Facebook
            </a>
          )}

          {officer.instagram_url && (
            <a
              href={officer.instagram_url}
              target="_blank"
              className="rounded-lg bg-pink-600 px-4 py-2 text-sm font-bold text-white hover:bg-pink-500"
            >
              Instagram
            </a>
          )}

          {officer.tiktok_url && (
            <a
              href={officer.tiktok_url}
              target="_blank"
              className="rounded-lg bg-black px-4 py-2 text-sm font-bold text-white hover:bg-neutral-800"
            >
              TikTok
            </a>
          )}

          {officer.github_url && (
            <a
              href={officer.github_url}
              target="_blank"
              className="rounded-lg bg-slate-700 px-4 py-2 text-sm font-bold text-white hover:bg-slate-600"
            >
              GitHub
            </a>
          )}

          {officer.gmail && (
            <a
              href={`mailto:${officer.gmail}`}
              className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
            >
              Gmail
            </a>
          )}

        </div>

      </div>

    ))}

  </div>

</div>

{/* Closing Section */}

<div className="mt-24 rounded-3xl border border-white/10 bg-gradient-to-r from-[#07182F] to-[#0A2545] p-12 text-center">

  <h2 className="text-4xl font-black text-white">
    Together, We Lead.
  </h2>

  <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-400">
    Every achievement of TECHNOBITS is made possible through the dedication,
    teamwork, and passion of its officers. Together, we strive to inspire
    innovation, serve our fellow students, and create opportunities that
    empower the next generation through technology.
  </p>

  <div className="mt-10 h-px w-full bg-white/10" />

  <p className="mt-10 text-xl italic text-cyan-400">
    "Empowering Students Through Technology."
  </p>

  <p className="mt-4 text-sm tracking-[0.3em] text-slate-500 uppercase">
    TECHNOBITS
  </p>

</div>

  </div>
);
}