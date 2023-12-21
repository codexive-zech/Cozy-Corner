import { BsCart3, BsMoonFill, BsSunFill } from "react-icons/bs";
import { FaBarsStaggered } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import NavLinks from "./NavLinks";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../features/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const { cartItemNumb } = useSelector((state) => state.cart);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  }; // updating the theme

  return (
    <nav className=" bg-base-200 ">
      <div className="align-element navbar">
        <div className=" navbar-start">
          {/* Logo */}
          <NavLink
            to="/"
            className=" hidden lg:flex items-center btn btn-primary text-3xl"
          >
            C
          </NavLink>
          {/* Hamburger and Mobile Menu */}
          <div className=" dropdown">
            <label tabIndex={0} className=" btn btn-ghost lg:hidden ">
              <FaBarsStaggered className="w-6 h-6" />
            </label>
            <ul
              tabIndex={0}
              className=" inline-block lg:hidden menu menu-sm dropdown-content mt-2 z-[1] shadow-md bg-base-200 rounded-box w-60"
            >
              <NavLinks />
            </ul>
          </div>
        </div>
        <div className=" navbar-center hidden lg:flex">
          <ul className=" menu menu-horizontal">
            <NavLinks />
          </ul>
        </div>
        <div className=" navbar-end">
          {/* Theme Toggle */}
          <label className=" swap swap-rotate">
            <input type="checkbox" onChange={handleThemeToggle} />
            <BsSunFill className=" swap-on w-4 h-4" />
            <BsMoonFill className=" swap-off w-4 h-4" />
          </label>
          {/* Cart */}
          <NavLink to="/cart" className=" btn btn-circle btn-ghost btn-md ml-3">
            <div className=" indicator">
              <BsCart3 className=" w-6 h-6" />
              <span className=" badge badge-primary badge-sm indicator-item">
                {cartItemNumb}
              </span>
            </div>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
