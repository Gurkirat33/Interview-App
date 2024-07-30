import { useState } from "react";
import { faqData } from "../data/FaqData.jsx";

const Faq = () => {
  const [accordionId, setAccordionId] = useState([]);

  return (
    <div className="bg-gray-100 pb-8">
      <div className="section-container">
        <h2 className="pt-4 text-center text-3xl font-semibold md:text-4xl">
          Frequently{" "}
          <span className="text-secondary-700 underline decoration-secondary-700 decoration-wavy decoration-2 underline-offset-auto">
            Asked Questions
          </span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl pb-8 text-center text-slate-600">
          Find answers to common questions about our platform and how it can
          help you streamline the interview process.
        </p>

        <div className="mx-auto max-w-5xl rounded-lg bg-white p-4 shadow-md">
          {faqData.map((data, index) => (
            <div
              key={index}
              className="border-b border-gray-200 last:border-none"
            >
              <div
                onClick={() => {
                  setAccordionId((prevIds) =>
                    prevIds.includes(index)
                      ? prevIds.filter((id) => id !== index)
                      : [...prevIds, index],
                  );
                }}
                className="flex cursor-pointer items-center justify-between py-4"
              >
                <span className="text-lg font-semibold">{data.heading}</span>
                <svg
                  className="ml-8 shrink-0 fill-indigo-500"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`origin-center transform transition duration-200 ease-out ${accordionId.includes(index) && "!rotate-180"}`}
                  />
                  <rect
                    y="7"
                    width="16"
                    height="2"
                    rx="1"
                    className={`origin-center rotate-90 transform transition duration-200 ease-out ${accordionId.includes(index) && "!rotate-180"}`}
                  />
                </svg>
              </div>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  accordionId.includes(index)
                    ? "max-h-96 opacity-100"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="pb-4 text-gray-600">{data.description}</div>
                {data.button && <div>{data.button}</div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Faq;
