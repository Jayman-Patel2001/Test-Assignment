import { useState } from "react";

const FileUpload = ({ useFormContext, Controller }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const { control, setValue } = useFormContext();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      setSelectedFile(null);
      return;
    }

    const allowedTypes = ["image/png", "application/pdf"];
    const fileType = file.type;

    if (!allowedTypes.includes(fileType)) {
      alert("Invalid file type. Only PNG and PDF files are allowed.");
      setSelectedFile(null);
      return;
    }

    if (event.target.files.length > 1) {
      alert("Please select only one file.");
      setSelectedFile(null);
      return;
    }

    setSelectedFile(file);
    setValue("single_file", {
      path: file.path,
      name: file.name,
      type: file.type,
      size: file.size,
      mime: file.type,
      meta: {},
      url: URL.createObjectURL(file),
    });
  };

  return (
    <>
      <div className="flex flex-col items-center w-screen">
        <div className="sm:w-2/5 w-2/4 mt-4">
          <label
            className="block mb-2 text-sm font-medium text-white-900 dark:text-white"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <Controller
            control={control}
            name="single_file"
            rules={{
              required: "Please select a file",
              validate: (value) => {
                if (value.name.length < 1) return "Please select a file";
                return true;
              },
            }}
            render={({ field, fieldState: { error } }) => (
              <div>
                <input
                  className="block w-full text-sm text-white-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-800 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                  type="file"
                  accept=".png,.pdf"
                  onChange={handleFileChange}
                />
                {error && <p className="text-red-500">{error.message}</p>}
              </div>
            )}
          />

          {selectedFile && (
            <div>
              <p>Selected file: {selectedFile.name}</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default FileUpload;
