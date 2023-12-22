import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import registerImg from "../assets/register.svg";
import { useState } from "react";
import { AiTwotoneEye, AiTwotoneEyeInvisible } from "react-icons/ai";

const register = "/auth/local/register";

export const action = async ({ request }) => {
  const formData = await request.formData(); // retrieve the formData that has been serialized from the browser api
  const requestBody = Object.fromEntries(formData); // convert it into an object
  try {
    await customFetch.post(register, requestBody);
    toast.success("Account Created Successfully");
    return redirect("/login");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message || "Please Check Your credentials";
    toast.error(errorMessage);
    return null;
  }
}; // Route Action func for Register

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <section className=" grid lg:grid-cols-2 place-items-center m-0 ">
      <Form
        className="my-10 md:my-0 p-8 flex flex-col gap-y-4 w-[95vw] mx-auto md:w-9/12 "
        method="POST"
      >
        <h1 className=" text-2xl lg:text-3xl font-bold text-center mb-3">
          Hello! Create an Account
        </h1>
        <FormInput
          type="text"
          label="Username"
          name="username"
          size="input-md"
        />
        <FormInput type="email" label="Email" name="email" size="input-md" />
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
          <SubmitBtn text="Register" />
        </div>
        <div className="divider">OR</div>
        <p className="text-center">
          Already a Member?
          <Link
            to="/login"
            className=" link link-hover link-primary ml-1 "
            style={{ textDecorationLine: "none" }}
          >
            Login
          </Link>
        </p>
      </Form>
      <div className=" hidden lg:flex items-center lg:justify-center lg:h-screen">
        <img
          src={registerImg}
          alt="Register"
          className=" w-96 h-auto object-fit"
        />
      </div>
    </section>
  );
};

export default Register;
