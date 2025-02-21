import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  EnvelopeIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
} from "@heroicons/react/24/outline";
import hashPassword from "../helpers/hashPassword";
import { useNotification } from "../helpers/NotificationContext";

const Login = () => {
  const { showSuccess, showError } = useNotification();
  const [showPassword, setShowPassword] = useState(false);

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
              storedUser.password === (await hashPassword(values.password))
            ) {
              localStorage.setItem("authToken", storedUser.email);
              localStorage.setItem("userName", storedUser.name);
              showSuccess("Login successful!");
              navigate("/dashboard");
            } else {
              showError("Invalid Email/password!");
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
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Password"
                    className="auth-input"
                  />
                  {!showPassword ? (
                    <EyeSlashIcon
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(true)}
                    />
                  ) : (
                    <EyeIcon
                      className="w-5 h-5 text-gray-500 cursor-pointer"
                      onClick={() => setShowPassword(false)}
                    />
                  )}
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
