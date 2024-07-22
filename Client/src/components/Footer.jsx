import { Link } from "react-router-dom";
import { FooterAddress, FooterData, FooterSocials } from "../data/FooterData";

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="section-container">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-4">
          <div>
            <h4 className="mb-6 text-xl font-semibold tracking-wider text-secondary-600">
              About Us
            </h4>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
              gravida, mi eu pulvinar cursus, sem elit interdum mauris.
            </p>
          </div>
          <div>
            <h4 className="mb-6 text-xl font-semibold tracking-wider text-secondary-600">
              Services
            </h4>
            <div className="inline-flex flex-col space-y-4">
              {FooterData.map((item) => (
                <Link to={item.path} key={item.name} className="">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="mb-6 text-xl font-semibold tracking-wider text-secondary-600">
              Contact Us
            </h4>
            {FooterAddress.map((item) => (
              <p key={item}>{item}</p>
            ))}
          </div>
          <div>
            <h4 className="mb-6 text-xl font-semibold tracking-wider text-secondary-600">
              Follow Us
            </h4>
            <div className="flex flex-wrap gap-4 gap-x-5">
              {FooterSocials.map((item) => (
                <a href={item.link} key={item.name}>
                  {item.svg}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-6 border-2 p-5">
          <p className="text-center">
            Copyright © 2024
            <span className="font-bold"> Company Name</span>. All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
