# Order Management System

A simple **Order Management System** built using **React, Tailwind CSS, ChartJS and Formik** for managing customer orders with **localStorage** persistence.

## 🚀 Features

- Register and Login
- Dashboard with chart 
- View users and block theme
- Create, edit, and delete Products
- Create, edit, and delete Orders
- Form validation with **Formik & Yup**
- LocalStorage persistence for saving orders
- Responsive UI with **Tailwind CSS**
- Modal-based order creation & editing
- Navigation with **React Router**

## 🛠️ Tech Stack

- **React** (Frontend framework)
- **Tailwind CSS** (Styling)
- **Formik & Yup** (Form handling & validation)
- **React Router** (Navigation)
- **ChartJs** (Charts)

## 📂 Project Structure

```
📦 order-management-system
 ┣ 📂 src
 ┃ ┣ 📂 components
 ┃ ┃ ┣ 📜 NavBar.jsx
 ┃ ┃ ┣ 📜 Sidebar.jsx
 ┃ ┃ ┣ 📜 OrderManagement.jsx
 ┃ ┃ ┣ 📜 Users.jsx
 ┃ ┃ ┣ 📜 ProductManagement.jsx
 ┃ ┃ ┣ 📜 SalesChart.jsx 
 ┃ ┃ ┣ 📜 SignUp.jsx 
 ┃ ┃ ┣ 📜 Login.jsx 
 ┃ ┃ ┣ 📜 Dashboard.jsx
 ┃ ┣ 📜 App.js
 ┃ ┣ 📜 index.js
 ┣ 📜 package.json
 ┣ 📜 vite.config.js
 ┣ 📜 README.md
```

## 🚀 Installation & Setup

1. **Clone the repository**
   ```sh
   git clone git@github.com:dalalAlHaffar/comperative-dashboard.git
   cd order-management-system
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Run the project**
   ```sh
   npm run dev
   ```


## 📜 Code Example

```jsx
importimport { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import {
  EnvelopeIcon,
  EyeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import hashPassword from "../helpers/hashPassword";
import { useNotification } from "../helpers/NotificationContext";

const SignUp = () => {
  const { showSuccess, showError } = useNotification();
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
            values.password = await hashPassword(values.password);
            localStorage.setItem("user", JSON.stringify(values));
            showSuccess("Your account was created successfully!!");
            navigate("/");
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
```

## 📸 Screenshots

### 📌 Order List Page
-[Order Management](https://drive.google.com/file/d/14gdb4gpT5DVy5IsWJl64OjoVr4bMN3YF/view?usp=drive_link)
### 📌 Users List Page
-[User Management](https://drive.google.com/file/d/1IRRj-9M_b4o3o-IEWp8Ll66-VcPOBnmr/view?usp=sharing)
### 📌 DashBoard Page
-[Dashboard Management](https://drive.google.com/file/d/1f33-CDRNPz8ITKRiSbwfxq1XFBpBocdS/view?usp=drive_link)
### 📌 Login Page
-[Login Management](https://drive.google.com/file/d/1glkGWV2BPdP5bfaGmfpIbTFFFOnfhbNY/view?usp=sharing)
## 🛠️ Future Enhancements
- API integration for real-time data storage
- Export orders as CSV or PDF


## 🔗 Useful Links

- [GitHub Repository](https://github.com/dalalAlHaffar/comperative-dashboard)
- [Live Demo](https://drive.google.com/drive/folders/1048ZHYChKnu9JkMURQv4FOHfuCS1bvFl?usp=drive_link)
- [Figma Design](https://www.figma.com/design/41U9dUZLu8LbUq8oRISLKo/Metrix-SaaS-Dashboard-UI-Kit-(Community)?node-id=36-13667&t=Udg96NB6764JdNS3-0)