import { LOGO } from "../utils/constants";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="flex justify-between bg-pink-100">
      <div className="w-40 mx-4 shadow-2xl">
        <img src={LOGO} alt="hungry-hour" />
      </div>

      <div className="w-[450px] m-12">
        <ul className="flex justify-between">
          <li>
            <Link to={"/"}>Home</Link>
          </li>
          <li>
            <Link to={"/about"}>About Us</Link>
          </li>
          <li>
            <Link to={"/contact"}>Contact Us</Link>
          </li>
          <li>Cart</li>
        </ul>
      </div>
    </div>
  );
};

export default Header;
