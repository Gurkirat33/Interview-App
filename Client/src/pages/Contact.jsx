import LocationMap from "../components/LocationMap";

const Contact = () => {
  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");
    // TODO : Add your form submission logic here
  };
  return (
    <div className="section-container pt-24">
      <h2 className="pt-4 text-center text-3xl font-bold md:text-4xl lg:text-5xl">
        Get in{" "}
        <span className="text-secondary-700 underline decoration-secondary-700 decoration-wavy decoration-2 underline-offset-auto">
          Touch with Us
        </span>
      </h2>
      <p className="mx-auto mt-2 max-w-xl pb-8 text-center text-slate-600">
        We're here to assist you with any questions or support you need. Reach
        out to us via the contact form or other methods provided below.
      </p>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="order-2 flex-1 md:order-1">
          <LocationMap />
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="flex-1 space-y-4 md:order-2"
        >
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="flex flex-1 flex-col gap-1">
              <label
                htmlFor="firstname"
                className="cursor-pointer text-lg font-medium text-primary-700"
              >
                Enter your name
              </label>
              <input
                type="text"
                id="firstname"
                className="rounded-md border-2 border-black p-2 focus:outline-none"
                placeholder="John"
              />
            </div>
            <div className="flex flex-1 flex-col gap-1">
              <label
                htmlFor="lastname"
                className="cursor-pointer text-lg font-medium text-primary-700"
              >
                Enter your last name
              </label>
              <input
                type="text"
                id="lastname"
                className="rounded-md border-2 border-black p-2 focus:outline-none"
                placeholder="Doe"
              />
            </div>
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label
              htmlFor="email"
              className="cursor-pointer text-lg font-medium text-primary-700"
            >
              Enter your Email
            </label>
            <input
              type="text"
              id="email"
              className="rounded-md border-2 border-black p-2 focus:outline-none"
              placeholder="Johndoe@mail.com"
            />
          </div>
          <div className="flex flex-1 flex-col gap-1">
            <label
              htmlFor="message"
              className="cursor-pointer text-lg font-medium text-primary-700"
            >
              Enter your Message
            </label>
            <textarea
              type="text"
              id="message"
              rows={4}
              className="rounded-md border-2 border-black p-2 focus:outline-none"
              placeholder="Write your message here..."
            />
          </div>
          <button className="flex">
            <a className="relative" href="#">
              <span className="absolute left-0 top-0 ml-1 mt-1 h-full w-full rounded bg-black"></span>
              <span className="fold-bold relative inline-block h-full w-full rounded border-2 border-black bg-white px-3 py-1 font-bold text-black transition duration-200 hover:bg-primary-600 hover:text-white">
                Submit
              </span>
            </a>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
