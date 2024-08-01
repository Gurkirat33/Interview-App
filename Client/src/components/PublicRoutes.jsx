import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { setUser } from "../redux/slices/userSlice";

const PublicRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  const notAllowedPaths = ["/sign-in", "/login"];
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(
          "https://interview-app-server.vercel.app/api/v1/users/get-user",
        );
        dispatch(setUser(res.data?.data));
      } catch (error) {
        dispatch(setUser(null));
      }
    };
    fetchUser();
  }, [dispatch, location.pathname]);
  if (user === undefined) {
    return <div>Loading...</div>;
  }
  if (user && notAllowedPaths.includes(location.pathname)) {
    return <Navigate to="/dashboard" />;
  }
  return <Outlet />;
};

export default PublicRoutes;
