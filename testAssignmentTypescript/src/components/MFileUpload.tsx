import React, { useState, useEffect } from "react";

const MFileUpload = ({ useFormContext, Controller }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [selectedFileNames, setSelectedFileNames] = useState([]);
  const [status, setStatus] = useState("Geolocation not captured");
  const [coordinates, setCoordinates] = useState(null);
  const [shouldLogCoordinates, setShouldLogCoordinates] = useState(false);

  const { control, setValue } = useFormContext();

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files.length === 0) {
      setSelectedFiles([]);
      setSelectedFileNames([]);
      return;
    }

    const allowedTypes = ["image/png", "application/pdf"];
    const newFiles = [...selectedFiles];
    const newFileNames = [...selectedFileNames];
    const multiFiles = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = file.type;

      if (!allowedTypes.includes(fileType)) {
        alert("Invalid file type. Only PNG and PDF files are allowed.");
        setSelectedFiles([]);
        setSelectedFileNames([]);
        return;
      }

      const fileName = file.name;

      if (newFileNames.includes(fileName)) {
        alert(`File "${fileName}" has already been selected.`);
        continue;
      }

      if (newFiles.length >= 5) {
        alert("You have reached the maximum limit of 5 files.");
        setSelectedFiles(newFiles);
        setSelectedFileNames(newFileNames);
        return;
      }

      newFiles.push(file);
      newFileNames.push(fileName);

      multiFiles.push({
        path: file.path,
        name: file.name,
        type: file.type,
        size: file.size,
        mime: file.type,
        meta: {},
        url: URL.createObjectURL(file),
      });
    }

    setValue("multi_file", multiFiles);
    setSelectedFiles(newFiles);
    setSelectedFileNames(newFileNames);
  };

  const captureGeolocation = () => {
    if (navigator.geolocation) {
      setStatus("Acquiring Geolocation...");
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setCoordinates({ latitude, longitude });
          setStatus("Geolocation Captured");
          setShouldLogCoordinates(true);
        },
        (error) => {
          setStatus("Error capturing Geolocation");
          console.error(error);
        }
      );
    } else {
      setStatus("Geolocation not supported");
    }
  };

  useEffect(() => {
    captureGeolocation();
  }, []);

  useEffect(() => {
    if (shouldLogCoordinates && coordinates !== null) {
      setValue(
        "geolocation",
        `lat: ${coordinates.latitude} - long: ${coordinates.longitude}`
      );
    }
  }, [shouldLogCoordinates, coordinates]);

  return (
    <div className="flex flex-col items-center w-screen">
      <div className="sm:w-2/5 w-2/4">
        <label
          htmlFor="file_input"
          className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
        >
          Upload files (Max 5)
        </label>
        <Controller
          control={control}
          name="multi_file"
          rules={{
            required: "Please select a file",
            validate: (value) => {
              if (value[0].name.length < 1)
                return "Please select atleast one file";
              return true;
            },
          }}
          render={({ field, fieldState: { error } }) => (
            <div>
              <input
                type="file"
                accept=".png,.pdf"
                multiple
                className="block w-full text-sm text-white-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-900 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                onChange={handleFileChange}
              />
              {error && <p className="text-red-500">{error.message}</p>}
            </div>
          )}
        />
        {selectedFiles.length > 0 && (
          <div>
            <p>Selected files:</p>
            <ul>
              {selectedFiles.map((file, index) => (
                <li key={index}>{file.name}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <div className="sm:w-2/5 w-2/4 mt-8">
        <kbd
          onClick={captureGeolocation}
          className="cursor-pointer px-4 py-1.5 text-sm font-semibold text-white-800 bg-gray-700 border border-gray-200 rounded-lg dark:bg-gray-600 dark:text-gray-100 dark:border-gray-500"
        >
          Capture Geolocation
        </kbd>
        <div className="md:mt-2 mt-4">
          <p>Status: {status}</p>
          {coordinates && (
            <p>
              Coordinates: {coordinates.latitude}, {coordinates.longitude}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MFileUpload;
