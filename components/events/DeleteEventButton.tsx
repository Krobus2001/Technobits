"use client";

type Props = {
  action: () => void;
};

export default function DeleteEventButton({
  action,
}: Props) {
  return (
    <button
      type="button"
      onClick={() => {
        if (confirm("Delete this event permanently?")) {
          action();
        }
      }}
      className="rounded-lg bg-red-600 px-4 py-2 font-semibold text-white transition hover:bg-red-500"
    >
      Delete
    </button>
  );
}