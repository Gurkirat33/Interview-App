import { Link } from "react-router-dom";

const Btn = () => {
  return (
    <Link
      to="/contact"
      className="rounded-md bg-primary-600 px-4 py-2 text-white duration-300 hover:bg-primary-700"
    >
      Contact Us
    </Link>
  );
};

export const faqData = [
  {
    heading: "How does the interview platform work?",
    description:
      "Our platform connects interviewers with candidates in a seamless, real-time coding environment. Interviewers can create or join interview sessions and use our collaborative code editor to evaluate candidates effectively.",
  },
  {
    heading: "How can I create an interview?",
    description:
      "To create an interview, click the 'Create' button on the dashboard, set up your interview details, choose your language preferences, and invite candidates to join.",
  },
  {
    heading: "Can I join an interview as a candidate?",
    description:
      "Yes, you can join an interview as a candidate by clicking the 'Join' button on the dashboard and entering the interview code provided by the interviewer.",
  },
  {
    heading: "What languages does the platform support?",
    description:
      "Our platform currently supports several programming languages, including JavaScript, TypeScript, Python, Java, C#, and PHP. We are continually adding more languages based on user demand.",
  },
  {
    heading: "Is the platform free to use?",
    description:
      "The platform offers both free and paid plans. Free users can access basic features, while paid users get advanced features like unlimited interviews and detailed analytics.",
  },
  {
    heading: "What security measures are in place for interviews?",
    description:
      "We prioritize user security by implementing encryption for data transmission, role-based access control, and secure authentication methods to ensure that your interviews remain confidential.",
  },
  {
    heading: "How can I contact support?",
    description:
      "If you need assistance, you can contact our support team via the 'Contact Us' page. We are available 24/7 to help resolve any issues you may encounter.",
  },
  {
    heading: "Question Not Found 404?",
    description: `Please contact our support team for further assistance.`,
    button: <Btn />,
  },
];
