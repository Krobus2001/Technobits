"use client";

import {
  createContext,
  useContext,
  useState,
} from "react";

import { Reply } from "./types";

type RepliesContextType = {
  replies: Reply[];

  addReply: (reply: Reply) => void;

  updateReply: (reply: Reply) => void;

  removeReply: (id: string) => void;

  toggleHelpful: (id: string) => Promise<void>;
};

const RepliesContext =
  createContext<RepliesContextType | null>(null);

export function RepliesProvider({
  initialReplies,
  children,
}: {
  initialReplies: Reply[];
  children: React.ReactNode;
}) {
  const [replies, setReplies] =
    useState(initialReplies);

  function addReply(reply: Reply) {
  console.log("Adding reply:", reply);

  setReplies((prev) => {
    const next = [...prev, reply];
    console.log("Replies after add:", next.length);
    return next;
  });
}

  function updateReply(reply: Reply) {
    setReplies((prev) =>
      prev.map((r) =>
        r.id === reply.id ? reply : r
      )
    );
  }

  function removeReply(id: string) {
    setReplies((prev) =>
      prev.filter((r) => r.id !== id)
    );
  }

  async function toggleHelpful(id: string) {
    // optimistic update
    setReplies((prev) =>
      prev.map((reply) =>
        reply.id === id
          ? {
              ...reply,
              likes: reply.likes + 1,
              likedByMe: !reply.likedByMe,
            }
          : reply
      )
    );

    try {
      const res = await fetch(
        `/api/replies/${id}/helpful`,
        {
          method: "POST",
        }
      );

      if (!res.ok) {
        throw new Error();
      }
    } catch {
      // rollback
      setReplies((prev) =>
        prev.map((reply) =>
          reply.id === id
            ? {
                ...reply,
                likes: reply.likes - 1,
                likedByMe: !reply.likedByMe,
              }
            : reply
        )
      );

      alert("Failed to update Helpful.");
    }
  }

  return (
    <RepliesContext.Provider
      value={{
        replies,
        addReply,
        updateReply,
        removeReply,
        toggleHelpful,
      }}
    >
      {children}
    </RepliesContext.Provider>
  );
}

  export function useReplies() {
    const context =
      useContext(RepliesContext);

    if (!context) {
    throw new Error("RepliesProvider missing.");
  }

  return context;

  }