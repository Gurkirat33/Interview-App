import React from "react";
import { Link } from "react-router-dom";
const Cta = () => {
  return (
    <section className="bg-blend-overlays bg-primary-900 bg-[url('/src/assets/hero-bg.svg')] bg-cover bg-no-repeat text-white">
      <div className="section-container py-8 md:py-12">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl md:leading-tight">
            Level Up Your Coding Interviews
          </h1>

          <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
            Join now to practice real-time coding interviews and ace your next
            technical challenge. Start your journey to success today.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link className="relative overflow-hidden rounded bg-secondary-850 px-8 py-4 font-semibold text-white">
              Get Started
              <span className="whitespace-no-wrap absolute right-0 top-0 origin-bottom-left -translate-y-full translate-x-1/3 rotate-45 transform bg-primary-800 px-5 py-1 text-center text-xs uppercase tracking-wider">
                Free
              </span>
            </Link>

            <Link
              className="block rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white sm:w-auto"
              href="#"
            >
              IDK
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cta;
