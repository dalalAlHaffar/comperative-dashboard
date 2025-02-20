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
  UserIcon,
} from "@heroicons/react/24/outline";

const SignUp = () => {
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    passwordConfirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });
  return (
    <div className="min-w-screen">
      <div className="flex align-middle justify-center">
        {showSuccess ? (
          <div
            className={`absolute top-0 items-center justify-center min-h-fit w-fit bg-white shadow-2xs mt-2 right-0 transition-transform duration-1000 ease-in-out 
                   ${
                     showSuccess
                       ? "translate-x-0 opacity-100"
                       : "translate-x-full opacity-0"
                   }`}
          >
            <SuccessAlert
              message="Sign up successful! Welcome to our platform."
              onClose={() => setShowSuccess(false)}
            />
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="card w-1/2 lg:w-[30%] md:w-2/5">
        <div className="text-center mt-5">
          <img src={logo} alt="Logo" className="w-10 h-10 mx-auto" />
        </div>
        <div className="mt-6">
          <h2 className="text-center text-black-50 font-bold text-md">
            Get started with Matrix
          </h2>
          <h2 className="text-center text-black-30 text-sm font-light">
            Create your account
          </h2>
        </div>
        <Formik
          initialValues={{
            name: "",
            password: "",
            passwordConfirm: "",
            email: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            localStorage.setItem("user", JSON.stringify(values));
            setShowSuccess(true);
            setInterval(() => {
              setShowSuccess(false);
              navigate("/");
            }, 3000);
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mt-10 mb-5 ">
                <div
                  className={`flex items-center px-4 py-1 gap-2 w-4/5 font-light  bg-main-background  rounded shadow mx-5 md:mx-10  ${
                    errors.name && touched.name
                      ? "border-actions-stop text-actions-stop focus:border-actions-stop focus:outline-actions-stop border-1"
                      : "focus-within:ring-2 focus-within:ring-primary-100 border-none outline-none text-black-30"
                  }`}
                >
                  <UserIcon className="w-5 h-5  text-black-40" />
                  <Field
                    name="name"
                    type="text"
                    required
                    placeholder="Your full name"
                    className="auth-input"
                  />
                </div>
                <ErrorMessage name="name" component="div" className="error" />
              </div>

              <div className="mb-5">
                <div
                  className={`flex items-center px-4 py-1 gap-2 w-4/5 font-light  bg-main-background  rounded shadow mx-5 md:mx-10  ${
                    errors.email && touched.email
                      ? "border-actions-stop text-actions-stop focus:border-actions-stop focus:outline-actions-stop border-1"
                      : "focus-within:ring-2 focus-within:ring-primary-100 border-none outline-none text-black-30"
                  }`}
                >
                  <EnvelopeIcon className="w-5 h-5  text-black-40" />
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
                    placeholder="Create a strong password"
                    className="auth-input"
                  />
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className="error"
                />
              </div>
              <div className="mb-5">
                <div
                  className={`flex items-center px-4 py-1 gap-2 w-4/5 font-light  bg-main-background  rounded shadow mx-5 md:mx-10  ${
                    errors.passwordConfirm && touched.passwordConfirm
                      ? "border-actions-stop text-actions-stop focus:border-actions-stop focus:outline-actions-stop border-1"
                      : "focus-within:ring-2 focus-within:ring-primary-100 border-none outline-none text-black-30"
                  }`}
                >
                  <LockClosedIcon className="w-5 h-5 text-black-40" />
                  <Field
                    name="passwordConfirm"
                    type="password"
                    required
                    placeholder="Confirm your password"
                    className="auth-input"
                  />
                </div>
                <ErrorMessage
                  name="passwordConfirm"
                  component="div"
                  className="error"
                />
              </div>

              <button type="submit" className="auth-button">
                Register
              </button>
            </Form>
          )}
        </Formik>

        <div className="mb-8 mt-3">
          <span className="text-black-30 text-xs">
            Already have an account?
            <a onClick={() => navigate("/")}> Login</a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
