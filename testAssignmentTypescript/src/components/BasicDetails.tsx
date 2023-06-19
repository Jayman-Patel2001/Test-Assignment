import TextField from "@mui/material/TextField";
import PhoneInput from "react-phone-input-2";
import "../styles/BasicDetails.css";
import "react-phone-input-2/lib/style.css";
import { useState, useEffect } from "react";
import { dividerClasses } from "@mui/material";
import { parsePhoneNumberFromString } from "libphonenumber-js";

const BasicDetails = ({ useFormContext, Controller }) => {
  const { control } = useFormContext();
  const [country, setCountry] = useState("in");

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="sm:w-2/5 w-2/4">
        <label
          htmlFor="user_name"
          className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
        >
          User name
        </label>
        <Controller
          control={control}
          name="userName"
          rules={{
            required: "Name is required",
            maxLength: {
              value: 10,
              message: "Name cannot exceed 10 characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                type="text"
                className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Name"
                required
                {...field}
              />
              {error && <p className="text-red-500">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="mt-6 sm:w-2/5 w-2/4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
        >
          Email
        </label>
        <Controller
          control={control}
          name="email"
          rules={{
            required: "Email is required",
            pattern: {
              value: /^[\w-.]+@(?:[a-zA-Z0-9-]+\.)+(com|in)$/,
              message: "Invalid email address",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                type="email"
                id="email"
                className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Email"
                required
                {...field}
              />
              {error && <p className="text-red-500">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="mt-6 sm:w-2/5 w-2/4">
        <label
          htmlFor="number"
          className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
        >
          Phone
        </label>
        <Controller
          control={control}
          name="number"
          rules={{
            required: "Phone number is required",
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <PhoneInput
                className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="number"
                country={country}
                countryCodeEditable={false}
                {...field}
              />
              {error && <p className="text-red-500">{error.message}</p>}
            </div>
          )}
        />
      </div>
    </div>
  );
};

export default BasicDetails;
