import { Link } from "react-router-dom";
import heroSectionImg from "../assets/hero-section-image.webp"; //image needs to be changed
import { FeaturesData } from "../data/FeaturesData.jsx";
import Cta from "../components/Cta";
import Testimonials from "../components/Testimonials";
import Faq from "../components/Faq.jsx";

const Home = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-primary-100 bg-[url('/src/assets/hero-bg.svg')] bg-cover bg-no-repeat py-8 pt-24 bg-blend-overlay">
        <div className="section-container flex flex-col md:flex-row">
          <div className="flex flex-col justify-center space-y-4 md:space-y-8">
            <p>
              <span className="rounded-full bg-primary-600 px-2 py-1 text-sm text-white">
                #1
              </span>
              <span className="ml-2 text-slate-600">Interview app</span>
            </p>
            <h1 className="text-center text-3xl font-bold tracking-wide sm:text-4xl md:text-left md:text-5xl md:leading-tight">
              Conduct <span className="text-primary-600">Seamless</span> Live{" "}
              Coding Interviews{" "}
              <span className="text-primary-600">Effortlessly</span>
            </h1>

            <p className="-mt-2 text-center text-slate-600 md:text-left">
              Streamline Your Interview Process with Integrated Video, Audio,
              and Code Collaboration.
            </p>
            <div className="flex justify-center gap-4 md:justify-start">
              <Link className="relative" to="/sign-in">
                <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded bg-black"></span>
                <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-200 hover:bg-primary-600 hover:text-white">
                  Get Started
                </span>
              </Link>
              <a className="relative" href="#">
                <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded bg-black"></span>
                <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 text-base font-bold text-black transition duration-200 hover:bg-primary-600 hover:text-white">
                  More Info
                </span>
              </a>
            </div>
          </div>
          <div>
            <img
              src={heroSectionImg}
              alt="heroSectionImg"
              className="object-cover"
            />
          </div>
        </div>
      </section>
      {/* Feature section */}
      <section className="section-container py-12">
        <h2 className="text-center text-3xl font-semibold md:text-4xl">
          Do more with{" "}
          <span className="text-secondary-700 underline decoration-secondary-700 decoration-wavy decoration-2 underline-offset-auto">
            less complexity
          </span>
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-slate-600">
          Streamline interviews and elevate candidate assessments with our
          intuitive platform designed for seamless collaboration and insightful
          feedback
        </p>

        <div className="my-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {FeaturesData.map((item) => (
            <div
              key={item.heading}
              className="rounded-lg border-2 border-primary-300 p-4"
            >
              <div className="text-4xl text-primary-700">{item.icon}</div>
              <h3 className="my-2 text-xl font-semibold">{item.heading}</h3>
              <p className="text-slate-600">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <Cta />
      <Testimonials />
      <Faq />
    </div>
  );
};

export default Home;
