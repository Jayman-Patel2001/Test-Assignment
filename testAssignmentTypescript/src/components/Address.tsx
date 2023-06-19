import TextField from "@mui/material/TextField";
import { useState, useEffect } from "react";

const Address = ({ useFormContext, Controller }) => {
  const { control } = useFormContext();

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="sm:w-2/5 w-2/4">
        <label
          htmlFor="address_one"
          className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
        >
          Address Line-1
        </label>
        <Controller
          control={control}
          name="line_one"
          rules={{
            required: "Line One is required",
            minLength: {
              value: 5,
              message: "Line One must be at least 5 characters long",
            },
            maxLength: {
              value: 100,
              message: "Line One cannot exceed 100 characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                type="text"
                className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Address"
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
          htmlFor="address_two"
          className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
        >
          Address Line-2
        </label>
        <Controller
          control={control}
          name="line_two"
          rules={{
            required: "Line Two is required",
            minLength: {
              value: 5,
              message: "Line Two must be at least 5 characters long",
            },
            maxLength: {
              value: 100,
              message: "Line Two cannot exceed 100 characters",
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                type="text"
                className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Enter Address"
                required
                {...field}
              />
              {error && <p className="text-red-500">{error.message}</p>}
            </div>
          )}
        />
      </div>
      <div className="flex flex-row sm:w-2/5 w-2/4 justify-between items-center">
        <div className="mt-6 w-2/5">
          <label
            htmlFor="state"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            State
          </label>
          <Controller
            control={control}
            name="state"
            rules={{
              required: "State is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  type="text"
                  className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter State"
                  required
                  {...field}
                />
                {error && <p className="text-red-500">{error.message}</p>}
              </div>
            )}
          />
        </div>
        <div className="mt-6 w-2/5">
          <label
            htmlFor="city"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            City
          </label>
          <Controller
            control={control}
            name="city"
            rules={{
              required: "City is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  type="text"
                  name="city"
                  className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter City"
                  required
                  {...field}
                />
                {error && <p className="text-red-500">{error.message}</p>}
              </div>
            )}
          />
        </div>
      </div>
      <div className="flex flex-row justify-between sm:w-2/5 w-2/4 items-center">
        <div className="mt-6 w-2/5">
          <label
            htmlFor="pinCode"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            PinCode
          </label>
          <Controller
            control={control}
            name="pinCode"
            rules={{
              required: "Pincode is required",
              pattern: {
                value: /^\d{6}$/,
                message: "Pincode must be a 6-digit number",
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  type="text"
                  className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Pincode"
                  required
                  {...field}
                />
                {error && <p className="text-red-500">{error.message}</p>}
              </div>
            )}
          />
        </div>
        <div className="mt-6 w-2/5">
          <label
            htmlFor="country"
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
          >
            Country
          </label>
          <Controller
            control={control}
            name="country"
            rules={{
              required: "Country is required",
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  type="text"
                  className="bg-gray-800 border border-gray-300 text-white-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Enter Country"
                  required
                  {...field}
                />
                {error && <p className="text-red-500">{error.message}</p>}
              </div>
            )}
          />
        </div>
      </div>
    </div>
  );
};

export default Address;
