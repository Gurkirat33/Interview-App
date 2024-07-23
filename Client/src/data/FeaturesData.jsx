import { FaLaptopCode } from "react-icons/fa";
import { FaLanguage } from "react-icons/fa";
import { RiAdminFill } from "react-icons/ri";
import { MdFitScreen } from "react-icons/md";
import { FaUserSecret } from "react-icons/fa";
import { GrSecure } from "react-icons/gr";

export const FeaturesData = [
  {
    heading: "Integrated Code Editor",
    description:
      "Experience seamless coding with our built-in editor that supports syntax highlighting and multiple languages.",
    icon: <FaLaptopCode />,
  },
  {
    heading: "Multi-language Support",
    description:
      "Conduct interviews in various programming languages to suit your needs and preferences.",
    icon: <FaLanguage />,
  },
  {
    heading: "Admin Controls",
    description:
      "Manage interviews with ease using advanced admin controls, including the ability to oversee user actions.",
    icon: <RiAdminFill />,
  },
  {
    heading: "Focus and Full-Screen Detection",
    description:
      "Ensure fairness and prevent cheating by monitoring whether participants are focused and in full-screen mode.",
    icon: <MdFitScreen />,
  },
  {
    heading: "Instant Interview Setup",
    description:
      "Quickly set up interviews with minimal steps, allowing you to focus on what truly matters.",
    icon: <FaUserSecret />,
  },
  {
    heading: "Secure Connections",
    description:
      "Protect your data and privacy with end-to-end encryption and secure communication protocols.",
    icon: <GrSecure />,
  },
];
