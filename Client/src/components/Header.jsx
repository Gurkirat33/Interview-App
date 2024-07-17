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
      title: "About",
      path: "/about",
    },
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
    <nav className="mx-auto max-w-7xl items-center px-4 md:flex md:px-8">
      {showModal && (
        <Modal
          setShowModal={setShowModal}
          onClickHandler={handleLogout}
          text={"Do you want to logout from your account?"}
        />
      )}
      <div className="flex items-center justify-between py-3 md:block md:py-5">
        <Link to="/">
          <img src="" className="object-cover" alt="Logo" />
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
                className="flex flex-col text-lg font-medium"
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
                  className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white shadow hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none md:inline md:text-lg"
                >
                  Dashboard
                </Link>
                <button
                  className="rounded-lg bg-gray-100 px-4 py-2"
                  onClick={() => setShowModal(true)}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="block rounded-lg border py-2 text-center font-medium text-gray-700 hover:text-indigo-600 md:border-none md:text-lg"
                >
                  Log in
                </Link>
                <Link
                  to="/signin"
                  className="block rounded-lg bg-indigo-600 px-4 py-2 text-center font-medium text-white shadow hover:bg-indigo-500 active:bg-indigo-700 active:shadow-none md:inline md:text-lg"
                >
                  Sign in
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
