import {
  Testimonials1,
  Testimonials2,
  Testimonials3,
} from "../data/Testimonials";
import Testimonialicon from "../assets/Testimonialicon.jpg";
import { FaQuoteRight } from "react-icons/fa";

const Testimonials = () => {
  return (
    <div className="section-container">
      <h2 className="pt-4 text-center text-3xl font-semibold md:text-4xl">
        Hear from our{" "}
        <span className="text-secondary-700 underline decoration-secondary-700 decoration-wavy decoration-2 underline-offset-auto">
          satisfied users
        </span>
      </h2>
      <p className="mx-auto mt-2 max-w-xl pb-8 text-center text-slate-600">
        Discover how our platform has transformed the interview experience for
        developers and organizations alike
      </p>
      <div className="flex gap-6">
        <div className="flex-1 space-y-6">
          {Testimonials1.map((item, index) => (
            <div className="rounded-lg border p-6 shadow-lg" key={index}>
              <FaQuoteRight className="text-3xl" />
              <p className="my-4">"{item.review}"</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt="person"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <div>
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="text-slate-600">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden flex-1 space-y-6 sm:block">
          {Testimonials2.map((item, index) => (
            <div className="rounded-lg border p-6 shadow-lg" key={index}>
              <FaQuoteRight className="text-3xl" />
              <p className="my-4">"{item.review}"</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt="person"
                  className="h-14 w-14 rounded-full"
                />
                <div>
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="text-slate-600">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="hidden flex-1 space-y-6 lg:block">
          {Testimonials3.map((item, index) => (
            <div className="rounded-lg border p-6 shadow-lg" key={index}>
              <FaQuoteRight className="text-3xl" />
              <p className="my-4">"{item.review}"</p>
              <div className="flex items-center gap-2">
                <img
                  src={item.image}
                  alt="person"
                  className="h-14 w-14 rounded-full"
                />
                <div>
                  <p className="text-lg font-bold">{item.name}</p>
                  <p className="text-slate-600">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
