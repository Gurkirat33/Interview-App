import React from "react";
import { Link } from "react-router-dom";
import { pricingData } from "../data/PricingData";

const Pricing = () => {
  return (
    <div className="section-container pt-24">
      <header>
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">
            Choose{" "}
            <span className="text-secondary-700 underline decoration-secondary-700 decoration-wavy decoration-2">
              Your Plan
            </span>
          </h1>
          <p className="mb-2 text-lg">
            Find the perfect plan for your needs. Simple pricing, no hidden
            fees.
          </p>
        </div>
      </header>

      <section className="py-8">
        <div className="flex flex-col gap-6 lg:flex-row">
          {pricingData.map((item) => (
            <div
              key={item.title}
              className={`rounded-md ${item.isBest ? "bg-black text-white" : "bg-slate-100"} flex-1 bg-[url('/src/assets/hero-bg.svg')] bg-cover bg-no-repeat px-6 py-8 bg-blend-overlay`}
            >
              <div>
                <div>
                  <h3 className="text-3xl font-bold capitalize md:text-4xl">
                    {item.title}
                  </h3>
                  <p className="mt-4 text-4xl font-bold">
                    ${item.perMonth}{" "}
                    <span className="text-lg font-normal">/month</span>
                  </p>
                  <p
                    className={`${item.isBest ? "text-white" : "text-slate-500"} mb-4 mt-2 text-lg`}
                  >
                    Billed ${item.billed} {item.title}
                  </p>
                </div>
                <div>
                  {item.features.map((feature, index) => (
                    <div
                      className="my-4 mt-1 flex items-center gap-4 py-1"
                      key={index}
                    >
                      <p className="rounded-full bg-slate-200 text-lg">
                        {feature.icon}
                      </p>
                      <p
                        className={`${item.isBest ? "text-white" : "text-slate-600"}`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <div className="group relative">
                  <div className="absolute -inset-px w-full rounded-xl bg-gradient-to-r from-primary-400 via-secondary-600 to-secondary-350 opacity-60 blur-lg duration-1000 group-hover:-inset-1 group-hover:opacity-100 group-hover:duration-200"></div>
                  <Link
                    to={"/sign-up"}
                    className="relative flex w-full items-center justify-center rounded-xl bg-gray-900 px-4 py-2 text-white transition-all duration-200"
                  >
                    Get it now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Pricing;
