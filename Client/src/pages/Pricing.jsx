import React from "react";
import { Link } from "react-router-dom";

const Pricing = () => {
  const pricingData = [
    {
      title: "montly",
      perMonth: "14",
      billed: "14",
      isBest: false,
      features: [
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
      ],
    },
    {
      title: "quarterly",
      perMonth: "12",
      billed: "36",
      isBest: false,
      features: [
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
      ],
    },
    {
      title: "yearly",
      perMonth: "10",
      billed: "120",
      isBest: true,
      features: [
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
        {
          icon: "",
          description: "Browse all screens & flows",
        },
      ],
    },
  ];
  return (
    <div className="section-container">
      <header>
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">Choose Your Plan</h1>
          <p className="mb-8 text-lg">
            Find the perfect plan for your needs. Simple pricing, no hidden
            fees.
          </p>
          <a
            href="#pricing-cards"
            className="text-primary rounded-full px-6 py-2 font-semibold shadow transition"
          >
            Get Started
          </a>
        </div>
      </header>

      <section className="py-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {pricingData.map((item) => (
            <div
              className={`rounded-md ${item.title === "yearly" ? "sm:col-span-2 lg:col-span-1" : ""} ${item.isBest ? "bg-black text-white" : "bg-slate-100"} px-6 py-8`}
            >
              <div
                className={`${item.title === "yearly" ? "flex flex-col sm:flex-row lg:flex-col" : ""}`}
              >
                <div>
                  <h3 className="text-[2rem] font-bold capitalize">
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
                  {item.features.map((feature) => (
                    <div className="my-4 mt-1 flex items-center gap-4">
                      <p className="rounded-full bg-slate-200">
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
