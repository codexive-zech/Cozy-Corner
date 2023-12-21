import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { clearItem } from "../features/cartSlice";
import { logoutUser } from "../features/userSlice";
import { useQueryClient } from "@tanstack/react-query";

const Header = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const handleUserLogOut = () => {
    navigate("/");
    dispatch(clearItem());
    queryClient.removeQueries();
    dispatch(logoutUser());
  }; // dispatch the func that log user's out and clear the cart items
  return (
    <header className=" bg-neutral py-2 text-neutral-content ">
      <div className="align-element flex justify-center sm:justify-end">
        {/* user */}
        {user ? (
          <div className="flex items-center gap-x-5">
            <p className=" capitalize text-xs font-medium">
              Hello, {user.username}!
            </p>
            <button
              className=" btn btn-outline btn-xs btn-primary"
              onClick={handleUserLogOut}
            >
              Logout
            </button>
          </div>
        ) : (
          // Links
          <div className=" flex items-center justify-center gap-x-5">
            <Link
              to="/login"
              className=" link link-hover text-sm"
              style={{ textDecorationLine: "none" }}
            >
              Login / Guest
            </Link>
            <Link
              to="/register"
              className=" link link-hover text-sm"
              style={{ textDecorationLine: "none" }}
            >
              Create Account
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
