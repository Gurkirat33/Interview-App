import { Link, useNavigate } from "react-router-dom";
import { GithubSvg, GoogleSvg, ReviewImages } from "../data/SignInData";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email.trim() === "" || !formData.password.trim() === "") {
      toast.error("Please fill all the fields");
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Invalid email address");
      return;
    }
    if (formData.password.length < 8) {
      toast.error("Password must be at least 8 characters long");
      return;
    }
    if (/\s/.test(formData.password)) {
      toast.error("Password cannot contain empty spaces");
      return;
    }
    try {
      await axios.post("/api/v1/users/loginUser", {
        email: formData.email.trim(),
        password: formData.password,
      });
      toast.success("Login Successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error("error", error.response?.data?.message);
    }
  };

  const handleGoogleSignIn = () => {
    console.log("google sign in clicked");
    // TODO: handle google sign in
  };

  const handleGithubSignIn = () => {
    console.log("github sign in clicked");
    // TODO: handle github sign in
  };

  return (
    <main className="flex">
      <div className="relative hidden min-h-screen flex-1 items-center justify-center bg-primary-800 lg:flex">
        <div className="relative z-10 max-w-md">
          <img src="" alt="logo" width={150} />
          <div className="space-y-3">
            <h3 className="text-3xl font-bold text-white">
              Welcome Back to Enhanced Interview Experience!
            </h3>
            <p className="text-gray-300">
              Log in to continue your seamless coding interviews.
            </p>
            <div className="flex items-center -space-x-2 overflow-hidden">
              {ReviewImages.map((image) => (
                <img
                  src={image}
                  alt="reviewImage"
                  key={image}
                  className="h-10 w-10 rounded-full border-2 border-white"
                />
              ))}
              <p className="translate-x-5 text-sm font-medium text-gray-400">
                5000+ users joined
              </p>
            </div>
          </div>
        </div>
        <div
          className="absolute inset-0 my-auto h-[500px]"
          style={{
            background:
              "linear-gradient(152.92deg, rgba(69, 84, 156, 0.2) 4.54%, rgba(255, 158, 177, 0.26) 34.2%, rgba(69, 84, 156, 0.1) 77.55%)",
            filter: "blur(108px)",
          }}
        ></div>
      </div>
      <div className="flex min-h-screen flex-1 items-center justify-center">
        <div className="w-full max-w-md space-y-5 bg-white px-4 text-gray-600 sm:px-0 lg:space-y-8">
          <div className="">
            <img src="" alt="logo" width={150} className="lg:hidden" />
            <div className="mt-5 space-y-2">
              <h3 className="text-2xl font-bold text-gray-800 sm:text-3xl">
                Sign up
              </h3>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-x-3">
            <button
              className="flex items-center justify-center rounded-lg border py-2.5 duration-150 hover:bg-gray-100"
              onClick={handleGoogleSignIn}
            >
              <GoogleSvg />
            </button>

            <button
              className="flex items-center justify-center rounded-lg border py-2.5 duration-150 hover:bg-gray-100"
              onClick={handleGithubSignIn}
            >
              <GithubSvg />
            </button>
          </div>
          <div className="relative">
            <span className="block h-px w-full bg-gray-300"></span>
            <p className="absolute inset-x-0 -top-2 mx-auto inline-block w-fit bg-white px-2 text-sm">
              Or continue with
            </p>
          </div>
          <form className="space-y-5" onSubmit={handleFormSubmit}>
            <div>
              <label className="font-semibold" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-primary-600"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            <div className="">
              <label className="font-semibold" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="mt-2 w-full rounded-lg border bg-transparent px-3 py-2 shadow-sm outline-none focus:border-primary-600"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                {showPassword ? (
                  <FaEyeSlash
                    className="absolute bottom-3 right-6 cursor-pointer text-xl"
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <FaEye
                    className="absolute bottom-3 right-6 cursor-pointer text-xl"
                    onClick={() => setShowPassword(true)}
                  />
                )}
              </div>
            </div>
            <p className="">
              Don't have an account?{" "}
              <Link
                className="font-medium text-primary-600 hover:underline"
                to="/sign-in"
              >
                Sign in
              </Link>
            </p>
            <button className="w-full rounded-lg bg-primary-600 px-4 py-2 font-medium text-white duration-150 hover:bg-primary-700">
              Login
            </button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default Login;
