"use client";

import Button from "../ui/Button";
import Container from "../ui/Container";

export default function Newsletter() {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-cyan-500 py-24">
      <Container>

        <div className="mx-auto max-w-3xl text-center">

          <h2 className="text-5xl font-black text-white">
            Stay Updated
          </h2>

          <p className="mt-6 text-blue-100">
            Subscribe to receive announcements, workshops,
            events and tutorials.
          </p>

          <div className="mt-10 flex flex-col gap-4 md:flex-row">

            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-xl px-5 py-4 outline-none"
            />

            <Button>
              Subscribe
            </Button>

          </div>

        </div>

      </Container>
    </section>
  );
}