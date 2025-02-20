import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import SuccessAlert from "./SuccessAlert";
import { useNavigate } from "react-router-dom";
import ErrorAlert from "./ErrorAlert";
import logo from "../assets/logo.svg";
import {
  EnvelopeIcon,
  EyeIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";

const Login = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  return (
    <div className="min-w-screen">
      {showSuccess ? (
        <div
          className={`absolute top-0 items-center justify-center min-h-fit w-fit bg-white shadow-2xs mt-2 right-0 transition-transform duration-700 ease-in-out 
                   ${
                     showSuccess
                       ? "translate-x-0 opacity-100"
                       : "translate-x-full opacity-0"
                   }`}
        >
          <SuccessAlert
            message="You logged in successfully!"
            onClose={() => setShowSuccess(false)}
          />
        </div>
      ) : (
        ""
      )}
      {showError ? (
        <div
          className={`absolute top-0 items-center justify-center min-h-fit w-fit bg-white shadow-2xs mt-2 right-0 transition-transform duration-700 ease-in-out 
                   ${
                     showError
                       ? "translate-x-0 opacity-100"
                       : "translate-x-full opacity-0"
                   }`}
        >
          <ErrorAlert
            message="Error ,Invalid data Please try again!!"
            onClose={() => setShowError(false)}
          />
        </div>
      ) : (
        ""
      )}
      <div className="card w-1/2 lg:w-[30%] md:w-2/5">
        <div className="text-center mt-10">
          <img src={logo} alt="Logo" className="w-10 h-10 mx-auto" />
        </div>
        <div className="mt-6">
          <h2 className="text-center text-black-50 font-semibold text-md">
            Welcome Back!
          </h2>
          <h2 className="text-center text-black-30 text-sm font-light">
            Login to your account
          </h2>
        </div>
        <Formik
          initialValues={{
            password: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            if (
              storedUser &&
              storedUser.email === values.email &&
              storedUser.password === values.password
            ) {
              setShowSuccess(true);
              setInterval(() => {
                setShowSuccess(false);
                navigate("/dashboard");
              }, 2000);
            } else {
              setShowError(true);
              setInterval(() => {
                setShowError(false);
              }, 2000);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className=" mt-10 mb-5">
                <div
                  className={`flex items-center px-4 py-1 gap-2 w-4/5 font-light  bg-main-background  rounded shadow mx-5 md:mx-10  ${
                    errors.email && touched.email
                      ? "border-actions-stop text-actions-stop focus:border-actions-stop focus:outline-actions-stop border-1"
                      : "focus-within:ring-2 focus-within:ring-primary-100 border-none outline-none text-black-30"
                  }`}
                >
                  <EnvelopeIcon className="w-5 h-5 text-black-40" />
                  <Field
                    name="email"
                    type="email"
                    required
                    placeholder="Email Address"
                    className="auth-input"
                  />
                </div>
                <ErrorMessage name="email" component="div" className="error" />
              </div>
              <div className="mb-5">
                <div
                  className={`flex items-center px-4 py-1 gap-2 w-4/5 font-light  bg-main-background  rounded shadow mx-5 md:mx-10  ${
                    errors.password && touched.password
                      ? "border-actions-stop text-actions-stop focus:border-actions-stop focus:outline-actions-stop border-1"
                      : "focus-within:ring-2 focus-within:ring-primary-100 border-none outline-none text-black-30"
                  }`}
                >
                  <LockClosedIcon className="w-5 h-5 text-black-40" />
                  <Field
                    name="password"
                    type="password"
                    required
                    placeholder="Password"
                    className="auth-input"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <button type="submit" className="auth-button">
                Login
              </button>
            </Form>
          )}
        </Formik>

        <div className="mb-8 mt-3">
          <span className="text-black-30 text-xs">
            Don’t have an account?
            <a onClick={() => navigate("/signup")}> Sign Up</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
