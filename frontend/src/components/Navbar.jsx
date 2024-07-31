import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoMdSearch } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useContext, useState } from "react";
import Menu from "./Menu";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
  const path = useLocation().pathname;
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();

  const showMenu = () => {
    setMenu(!menu);
  };

  const { user } = useContext(UserContext);

  const handleSearch = () => {
    if (prompt) {
      navigate(`?search=${prompt}`);
    } else {
      navigate("/");
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-between px-6 md:px-[200px] py-4">
      <h1 className="text-lg font-extrabold md:mr-8 sm:mr-4 whitespace-nowrap">
        <Link to='/'>Blog-Central</Link>
      </h1>
      {path === "/" && (
        <div className="flex justify-center items-center space-x-0 ml-8">
          <p onClick={handleSearch} className="cursor-pointer">
            <IoMdSearch />
          </p>
          <input
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
            type="text"
            placeholder="Search A Post"
            className="outline-none px-3 py-1"
          />
        </div>
      )}
      <div className="hidden md:flex items-center justify-center space-x-2 md:space-x-4">
        {user ? (
          <h3><Link to='/write'>Write</Link></h3>
        ) : (
          <h3><Link to='/login'>Login</Link></h3>
        )}
        {user ? (
          <div onClick={showMenu}>
            <p className="cursor-pointer relative"><GiHamburgerMenu /></p>
            {menu && <Menu />}
          </div>
        ) : (
          <h3><Link to="/register">Register</Link></h3>
        )}
      </div>
      <div onClick={showMenu} className="md:hidden text-lg">
        <p className="cursor-pointer relative"><GiHamburgerMenu /></p>
        {menu && <Menu />}
      </div>
    </div>
  );
};

export default Navbar;
