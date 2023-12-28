import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/userSlice";
import { useDispatch } from "react-redux";
import loginImg from "../assets/login.svg";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";
import { useState } from "react";

const login = "/auth/local";

export const action =
  // adding the store as a parameter to the action func


    (store) =>
    async ({ request }) => {
      const formData = await request.formData(); // retrieve the formData that has been serialized from the browser api
      const requestBody = Object.fromEntries(formData); // convert it into an object

      try {
        const response = await customFetch.post(login, requestBody);
        store.dispatch(loginUser(response.data)); // dispatch an action directly from the store
        console.log(response);
        toast.success("Successfully Logged In");
        return redirect("/");
      } catch (error) {
        const errorMessage =
          error?.response?.data?.error?.message ||
          "Please Check Your credentials";
        toast.error(errorMessage);
        return null;
      }
    }; // Route Action func for Login

const Login = () => {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  // const loginGuestUser = async () => {
  //   try {
  //     const response = await customFetch.post(login, {
  //       identifier: "test@test.com",
  //       password: "secret",
  //     });
  //     dispatch(loginUser(response.data));
  //     navigate("/");
  //     toast.success("Guest User Logged In");
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Please Check Your credentials");
  //   }
  // }; // guest user login func

  return (
    <section className=" grid lg:grid-cols-2 place-items-center m-0 ">
      <div className=" hidden lg:flex items-center lg:justify-center lg:h-screen">
        <img src={loginImg} alt="Login" className=" w-96 h-auto object-fit" />
      </div>
      <Form
        className="my-10 md:my-0 p-8 flex flex-col gap-y-4 w-[95vw] mx-auto md:w-9/12 "
        method="POST"
      >
        <h1 className=" text-2xl lg:text-3xl font-bold text-center mb-3">
          Welcome Back, Login!
        </h1>
        <FormInput
          type="email"
          label="Email"
          name="identifier"
          size="input-md"
        />
        <div className=" relative">
          <FormInput
            type={showPassword ? "text" : "password"}
            label="Password"
            name="password"
            size="input-md"
          />
          <span
            className=" absolute right-4 bottom-4 cursor-pointer text-secondary"
            onClick={handleShowPassword}
          >
            {showPassword ? (
              <AiTwotoneEyeInvisible size={20} />
            ) : (
              <AiTwotoneEye size={20} />
            )}
          </span>
        </div>
        <div className=" mt-3">
          <SubmitBtn text="Login" />
        </div>
        <div className="divider">OR</div>

        <p className="text-center">
          Not a Member yet?
          <Link
            to="/register"
            className=" link link-hover link-primary ml-1 "
            style={{ textDecorationLine: "none" }}
          >
            Register
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Login;
