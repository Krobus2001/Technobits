import { ReactNode } from "react";

export default function GradientText({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
      {children}
    </span>
  );
}