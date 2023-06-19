import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex justify-around w-screen mt-5">
      <div className="flex">
        <NavLink to="/" className="btn btn-ghost normal-case text-xl">
          AJ Tech
        </NavLink>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
            <div className="w-10 rounded-full">
              <img
                src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                alt="user"
              />
            </div>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
