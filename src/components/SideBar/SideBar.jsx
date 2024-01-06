
import { BsBook } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { BsFillBrushFill } from "react-icons/bs";
import { Link, useLocation } from "react-router-dom";



export default function SideBar({ isMenuOpen }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <div className={`SideBar ${isMenuOpen ? "" : "open"}`}>
        <nav className="">
          <ul>
            <li>
              <span className="title">Collections</span>
            </li>
            <li className={currentPath === "/" ? "active" : ""} >
              <Link className="aligning" to="/">
                <BsBook className="menuIcon1" />
                <span className="menuTitle"  >School</span>
              </Link>
            </li>

            <li className={currentPath === "/Personal" ? "active" : ""} >
              <Link className="aligning" to="/Personal">
                <BsFillPersonFill className="menuIcon2" />
                <span className="menuTitle">Personal</span>
              </Link>
            </li>

            <li className={currentPath === "/Design" ? "active" : ""} >
              <Link className="aligning" to="/Design" >
                <BsFillBrushFill className="menuIcon3" />
                <span className="menuTitle">Design</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}


