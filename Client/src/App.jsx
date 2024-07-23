import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./pages/SignIn";
import { Toaster } from "react-hot-toast";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoutes from "./components/ProtectedRoutes";
import Pricing from "./pages/Pricing";
import CreateInterview from "./pages/CreateInterview";
import InterviewRoom from "./socket/InterviewRoom";
import JoinInterview from "./pages/JoinInterview";
import Contact from "./pages/Contact";

const AppRouting = () => {
  const location = useLocation();
  const noHeaderFooterRoutes = ["/sign-in", "/login"];
  return (
    <>
      <Toaster />
      {!noHeaderFooterRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/login" element={<Login />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/contact" element={<Contact />} />
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route
            path="/dashboard/create/interview"
            element={<CreateInterview />}
          />
          <Route
            path="/dashboard/interview/:roomId"
            element={<InterviewRoom />}
          />
          <Route path="/dashboard/join/interview" element={<JoinInterview />} />
        </Route>
      </Routes>
      {!noHeaderFooterRoutes.includes(location.pathname) && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <Router>
      <AppRouting />
    </Router>
  );
};

export default App;
