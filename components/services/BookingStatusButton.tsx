"use client";

import { useState } from "react";

type Booking = {
  id: string;
  status: string;
};

export default function BookingStatusButton({
  booking,
}: {
  booking: Booking;
}) {
  const [status, setStatus] = useState(booking.status);

  const [showCancel, setShowCancel] = useState(false);

  const [reason, setReason] = useState("");

  async function updateStatus(
    newStatus: string,
    cancelReason?: string
  ) {
    const res = await fetch(
      `/api/bookings/${booking.id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: newStatus,
          cancel_reason: cancelReason,
        }),
      }
    );

    if (!res.ok) {
      alert("Failed to update booking.");
      return;
    }

    setStatus(newStatus);
    setShowCancel(false);
    setReason("");
  }

  async function archiveBooking() {
    const res = await fetch(
      `/api/bookings/${booking.id}/archive`,
      {
        method: "PATCH",
      }
    );

    if (!res.ok) {
      alert("Failed to archive booking.");
      return;
    }

    // Remove the archived booking from the page
    window.location.reload();
  }

  return (
    <div className="space-y-3">

      <span
        className={`block rounded-lg px-4 py-2 text-center font-bold ${
          status === "Pending"
            ? "bg-yellow-500/20 text-yellow-400"
            : status === "Approved"
            ? "bg-green-500/20 text-green-400"
            : status === "Completed"
            ? "bg-cyan-500/20 text-cyan-400"
            : "bg-red-500/20 text-red-400"
        }`}
      >
        {status}
      </span>

      {/* Pending */}

      {status === "Pending" && (
        <>
          <button
            onClick={() =>
              updateStatus("Approved")
            }
            className="w-full rounded-lg bg-green-500 px-4 py-2 font-bold text-black hover:bg-green-400"
          >
            Approve
          </button>

          <button
            onClick={() =>
              setShowCancel(true)
            }
            className="w-full rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-400"
          >
            Cancel
          </button>
        </>
      )}

      {/* Approved */}

      {status === "Approved" && (
        <>
          <button
            onClick={() =>
              updateStatus("Completed")
            }
            className="w-full rounded-lg bg-cyan-500 px-4 py-2 font-bold text-black hover:bg-cyan-400"
          >
            Complete
          </button>

          <button
            onClick={() =>
              setShowCancel(true)
            }
            className="w-full rounded-lg bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-400"
          >
            Cancel
          </button>
        </>
      )}

      {/* Completed */}

      {status === "Completed" && (
        <button
          onClick={archiveBooking}
          className="w-full rounded-lg bg-slate-700 px-4 py-2 font-bold text-white hover:bg-slate-600"
        >
          Archive
        </button>
      )}

      {/* Cancelled */}

      {status === "Cancelled" && (
        <button
          onClick={archiveBooking}
          className="w-full rounded-lg bg-slate-700 px-4 py-2 font-bold text-white hover:bg-slate-600"
        >
          Archive
        </button>
      )}

      {/* Cancel Dialog */}

      {showCancel && (
        <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-4">

          <p className="mb-3 font-bold text-red-300">
            Reason for cancellation
          </p>

          <textarea
            value={reason}
            onChange={(e) =>
              setReason(e.target.value)
            }
            rows={4}
            placeholder="Enter the reason..."
            className="w-full rounded-lg border border-white/10 bg-[#07182F] p-3 text-white outline-none"
          />

          <div className="mt-4 flex gap-3">

            <button
              onClick={() =>
                updateStatus(
                  "Cancelled",
                  reason
                )
              }
              disabled={!reason.trim()}
              className="flex-1 rounded-lg bg-red-500 px-4 py-3 font-bold text-white disabled:opacity-50"
            >
              Confirm
            </button>

            <button
              onClick={() => {
                setShowCancel(false);
                setReason("");
              }}
              className="flex-1 rounded-lg border border-white/10 px-4 py-3 text-white"
            >
              Back
            </button>

          </div>

        </div>
      )}

    </div>
  );
}