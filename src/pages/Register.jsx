import { Form, Link, redirect } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";

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
  return (
    <section className=" grid place-items-center h-screen py-12 lg:py-10">
      <Form
        method="POST"
        className="card w-96 mx-auto bg-base-100 shadow-lg p-8 flex flex-col gap-y-4"
      >
        <h1 className=" text-3xl font-bold text-center ">Register</h1>
        <FormInput type="text" label="Username" name="username" />
        <FormInput type="email" label="Email" name="email" />
        <FormInput type="password" label="Password" name="password" />
        <div className=" mt-3">
          <SubmitBtn text="Register" />
        </div>

        <p className="text-center">
          Already a Member yet?
          <Link
            to="/login"
            className=" link link-hover link-primary ml-1 no-underline"
            style={{ textDecorationLine: "none" }}
          >
            Login
          </Link>
        </p>
      </Form>
    </section>
  );
};

export default Register;
