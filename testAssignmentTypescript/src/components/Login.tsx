import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

const Login = ({
  handleLogin,
  loginError,
  setLoginError,
  setPasswordError,
  passwordError,
  setEmailError,
  emailError,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
    setLoginError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
    setLoginError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, password, setEmail, setPassword);
  };

  return (
    <div>
      {loginError && (
        <div className="alert alert-warning">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="stroke-current shrink-0 h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <span>Failed! {loginError}.</span>
        </div>
      )}

      <section class=" dark:bg-gray-900">
        <div className="flex my-20 flex-col items-center justify-center sm:w-screen lg:py-0">
          <div className="w-3/4 p-4 sm:w-screen bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8 ">
            <div className="p-6 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-white">
                Log in to your account
              </h1>
              <form
                className="space-y-4 md:space-y-6 mt-6"
                method="POST"
                onSubmit={handleSubmit}
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-md font-medium text-white-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleEmailChange}
                    className=" mt-3 bg-gray-700 border border-gray-300 text-white-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5
                ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.in"
                    required
                  />
                  {emailError && <p className="text-red-500">{emailError}</p>}
                </div>
                <div className="mt-10">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-md font-medium text-white-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={handlePasswordChange}
                    className="mt-3 dark:text-white bg-gray-700 border border-gray-300 text-white-700 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required
                  />
                  {passwordError && (
                    <p className="text-red-500">{passwordError}</p>
                  )}
                </div>
                <div className="flex md:items-center justify-between md:flex-row flex-col">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-700 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 cursor-pointer"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label
                        htmlFor="remember"
                        className="text-gray-500 dark:text-gray-300"
                      >
                        Remember me
                      </label>
                    </div>
                  </div>
                  <NavLink
                    to="/forpass"
                    className="text-sm font-medium mt-2 text-primary-600 hover:underline dark:text-primary-500"
                  >
                    Forget Password?
                  </NavLink>
                </div>
                <button
                  type="submit"
                  className="w-full hover:bg-slate-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 transition-all duration-300"
                >
                  Log In
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
