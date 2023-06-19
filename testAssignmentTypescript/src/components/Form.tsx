import React, { useState } from "react";
import {
  useForm,
  FormProvider,
  useFormContext,
  Controller,
} from "react-hook-form";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import "../styles/Form.css";
import BasicDetails from "./BasicDetails";
import Address from "./Address";
import FileUpload from "./FileUpload";
import MFileUpload from "./MFileUpload";

function getSteps() {
  return ["Basic Details", "Address", "File Upload", "Multi-File Upload"];
}

function getStepContent(step) {
  switch (step) {
    case 0:
      return (
        <BasicDetails useFormContext={useFormContext} Controller={Controller} />
      );
    case 1:
      return (
        <Address useFormContext={useFormContext} Controller={Controller} />
      );
    case 2:
      return (
        <FileUpload useFormContext={useFormContext} Controller={Controller} />
      );
    case 3:
      return (
        <MFileUpload useFormContext={useFormContext} Controller={Controller} />
      );
    default:
      return "Unknown Step";
  }
}

const Form = ({ isLoggedIn }) => {
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();

  const isMobile = useMediaQuery("(max-width: 640px)");

  const methods = useForm({
    defaultValues: {
      userName: "Jayman",
      email: "jaymanpatel8@gmail.com",
      number: "917016706919",
      line_one: "A/105, Shyam Residency",
      line_two: "Near Shree Hari Bunglows, Mahadevnagar, Vastral",
      city: "Ahmedabad",
      state: "Gujarat",
      pinCode: "382418",
      country: "India",
      single_file: {
        path: "",
        name: "",
        type: "",
        size: 0,
        mime: "",
        meta: {},
        url: "",
      },
      multi_file: [
        { path: "", name: "", type: "", size: 0, mime: "", meta: {}, url: "" },
        { path: "", name: "", type: "", size: 0, mime: "", meta: {}, url: "" },
        { path: "", name: "", type: "", size: 0, mime: "", meta: {}, url: "" },
        { path: "", name: "", type: "", size: 0, mime: "", meta: {}, url: "" },
        { path: "", name: "", type: "", size: 0, mime: "", meta: {}, url: "" },
      ],
      geolocation: "",
    },
  });

  const handleNext = (data) => {
    if (activeStep == steps.length - 1) {
      fetch("http://127.0.0.1:8000/form", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (response.ok) {
            alert("Form Submitted Successfully");
            setActiveStep(activeStep + 1);
            console.log(form.current);
          } else {
            console.log("Data hasn't reached to Backend");
            alert("Network Error! Try again after some time!");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <div className="flex justify-evenly items-center  w-screen flex-col my-20">
      <Stepper
        className="text-gray-300"
        alternativeLabel
        activeStep={activeStep}
      >
        {steps.map((step, index) => {
          const labelProps = {};
          const stepProps = {};
          return (
            <Step {...stepProps} key={index}>
              <StepLabel {...labelProps}>{step}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === steps.length ? (
        <div className="p-10 flex flex-col items-center w-screen">
          <Typography
            variant={isMobile ? "h5" : "h4"}
            className="sm:w-2/5 w-4/5"
            align="center"
          >
            Thank You for submitting the form !!
          </Typography>
          <Typography
            variant={isMobile ? "h6" : "h5"}
            align="center"
            className="sm:w-2/5 w-4/5 mt-10"
          >
            Stay Connected For Next Updates !!
          </Typography>
        </div>
      ) : (
        <>
          <FormProvider {...methods}>
            <form
              id="myForm"
              onSubmit={methods.handleSubmit(handleNext)}
              className="mt-14"
            >
              {getStepContent(activeStep)}
            </form>
          </FormProvider>
          <div className="flex flex-row justify-between items-center sm:w-2/5 w-2/4 mt-10">
            <Button
              disabled={activeStep === 0}
              variant="contained"
              onClick={handleBack}
            >
              Back
            </Button>
            <Button form="myForm" variant="outlined" type="submit">
              {activeStep === steps.length - 1 ? "Finish" : "Next"}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default Form;
