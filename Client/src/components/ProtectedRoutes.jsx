import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import axios from "axios";
import { setUser } from "../redux/slices/userSlice";

const ProtectedRoutes = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const location = useLocation();
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("/api/v1/users/get-user");
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
  return user ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default ProtectedRoutes;
