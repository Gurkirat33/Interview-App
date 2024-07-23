import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";
import { clearUser } from "../redux/slices/userSlice";
import toast from "react-hot-toast";
import axios from "axios";

const Header = () => {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await axios.post("/api/v1/users/logoutUser");
      toast.success("Logout Successful");
      dispatch(clearUser());
      navigate("/login");
      setShowModal(false);
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };
  const navigation = [
    {
      title: "Pricing",
      path: "/pricing",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];
  const [state, setState] = useState(false);
  return (
    <>
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          onClickHandler={handleLogout}
          text={"Do you want to logout from your account?"}
        />
      )}
      <nav className="fixed left-8 right-8 top-2 z-50 mx-auto max-w-7xl items-center rounded-lg border border-white px-4 backdrop-blur-lg backdrop-brightness-90 md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:block md:py-5">
          <Link to="/">
            <h2 className="text-2xl font-bold">InterviewIT</h2>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-500 hover:text-gray-800"
              onClick={() => setState(!state)}
            >
              {state ? (
                <IoMdClose className="text-3xl" />
              ) : (
                <GiHamburgerMenu className="text-2xl" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`mt-8 flex-1 pb-3 md:mt-0 md:block md:pb-0 ${state ? "block" : "hidden"}`}
        >
          <div className="items-center justify-end space-y-6 md:flex md:space-x-6 md:space-y-0">
            {navigation.map((item, index) => {
              return (
                <Link
                  to={item.path}
                  onClick={() => setState(!state)}
                  className="flex flex-col text-lg font-semibold"
                  key={index}
                >
                  {item.title}
                </Link>
              );
            })}
            <span className="hidden h-6 w-px bg-gray-300 md:block"></span>
            <div className="items-center gap-x-6 space-y-3 md:flex md:space-y-0">
              {user ? (
                <>
                  <Link
                    to="/dashboard"
                    className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-semibold text-white shadow hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none md:inline md:text-lg"
                    onClick={() => setState(!state)}
                  >
                    Dashboard
                  </Link>
                  <button
                    className="w-full rounded-lg bg-gray-100 px-4 py-2 font-semibold"
                    onClick={() => {
                      setShowModal(true);
                      setState(!state);
                    }}
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="block rounded-lg border py-2 text-center font-semibold text-gray-700 hover:text-indigo-600 md:border-none md:text-lg"
                  >
                    Log in
                  </Link>
                  <Link
                    to="/signin"
                    className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-semibold text-white shadow hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none md:inline md:text-lg"
                  >
                    Sign in
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
