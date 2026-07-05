type Props = {
  title: string;
  value: number;
  color: string;
};

export default function StatCard({
  title,
  value,
  color,
}: Props) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/5 p-6">
      <p className="text-sm text-slate-400">
        {title}
      </p>

      <h2
        className="mt-3 text-4xl font-black"
        style={{ color }}
      >
        {value}
      </h2>
    </div>
  );
}