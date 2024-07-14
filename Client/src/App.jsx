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
        <Route element={<ProtectedRoutes />}>
          <Route path="/dashboard" element={<Dashboard />} />
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
