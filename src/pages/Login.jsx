import { Form, Link, redirect, useNavigate } from "react-router-dom";
import { FormInput, SubmitBtn } from "../components";
import { customFetch } from "../utils";
import { toast } from "react-toastify";
import { loginUser } from "../features/userSlice";
import { useDispatch } from "react-redux";

const login = "/auth/local";

export const action =
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginGuestUser = async () => {
    try {
      const response = await customFetch.post(login, {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      navigate("/");
      toast.success("Guest User Logged In");
    } catch (error) {
      console.log(error);
      toast.error("Please Check Your credentials");
    }
  }; // guest user login func

  return (
    <section className=" grid place-items-center h-screen py-12 lg:py-10 ">
      <Form
        className="card w-96 bg-base-100 shadow-lg p-8 flex flex-col gap-y-4"
        method="POST"
      >
        <h1 className=" text-3xl font-bold text-center ">Login</h1>
        <FormInput type="email" label="Email" name="identifier" />
        <FormInput type="password" label="Password" name="password" />
        <div className=" mt-3">
          <SubmitBtn text="Login" />
        </div>
        <button
          type="button"
          className=" btn btn-secondary btn-block capitalize"
          onClick={loginGuestUser}
        >
          Guest User
        </button>
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
