import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setUser } from "../redux/slices/userSlice";
import Loading from "./Loading";
axios.defaults.withCredentials = true;

const PublicRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const notAllowedPaths = ["/sign-in", "/login"];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://interview-app-v8ez.onrender.com/api/v1/users/get-user",
        );
        dispatch(setUser(res.data?.data));
      } catch (error) {
        dispatch(setUser(null));
      }
    };
    fetchUser();
  }, [dispatch, location.pathname]);
  if (user === undefined) {
    return <Loading />;
  }
  if (user && notAllowedPaths.includes(location.pathname)) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default PublicRoutes;
