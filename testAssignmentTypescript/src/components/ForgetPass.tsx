import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ForgetPass = () => {
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newEmailError, setNewEmailError] = useState("");
  const [newPasswordError, setNewPasswordError] = useState("");

  const navigateTo = useNavigate();

  const handleNewEmail = (e) => {
    setNewEmail(e.target.value);
    setNewEmailError("");
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
    setNewPasswordError("");
  };

  const changePassword = (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.(com|in)$/i;
    if (!emailRegex.test(newEmail)) {
      setNewEmailError("Invalid email format");
      return;
    }

    //! Password validation
    if (newPassword.length < 8) {
      setNewPasswordError("Password should be at least 8 characters long");
      return;
    }

    const newPasswordData = {
      email: newEmail,
      password: newPassword,
    };

    fetch("http://127.0.0.1:8000/auth/chaPass", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPasswordData),
    })
      .then((response) => {
        if (response.ok) {
          console.log("Password Changed Successfully");
          alert("Password Changed Sucessfully");

          //! Reset form fields
          setNewEmail("");
          setNewPassword("");
          navigateTo("/");
        } else {
          console.log("Invalid Email Id");
          alert("Invalid Emaid ID");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <section className=" dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center sm:w-screen my-14 lg:py-0">
        <div className="w-3/4 p-4 sm:w-screen bg-gray-800 rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-4 text-xl font-bold leading-tight tracking-tight text-white-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form
            className="mt-4 space-y-4 lg:mt-5 md:space-y-5"
            method="POST"
            onSubmit={changePassword}
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
                onChange={handleNewEmail}
                className="bg-gray-700 mt-3 border border-gray-300 text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="name@company.com"
                required
              />
              {newEmailError && <p className="text-red-500">{newEmailError}</p>}
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-md font-medium text-white-900 dark:text-white"
              >
                New Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleNewPassword}
                placeholder="••••••••"
                className="bg-gray-700 mt-3 border border-gray-300 text-white-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                required
              />
              {newPasswordError && (
                <p className="text-red-500">{newPasswordError}</p>
              )}
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-800 cursor-pointer focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="newsletter"
                  className="font-light text-white-900 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div>
            <button
              type="submit"
              className="w-full hover:bg-slate-600 text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Reset password
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ForgetPass;
