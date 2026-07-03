import Badge from "./Badge";
import GradientText from "./GradientText";

type Props = {
  badge?: string;
  title: string;
  subtitle?: string;
};

export default function SectionTitle({
  badge,
  title,
  subtitle,
}: Props) {
  return (
    <div className="mb-16 text-center">

      {badge && (
        <div className="mb-4">
          <Badge>{badge}</Badge>
        </div>
      )}

      <h2 className="text-4xl font-black text-white md:text-5xl">
        <GradientText>{title}</GradientText>
      </h2>

      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">
          {subtitle}
        </p>
      )}

    </div>
  );
}