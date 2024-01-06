import { MdWindow } from "react-icons/md";
import { RiMenuFill } from "react-icons/ri";
import { AiOutlineFolderOpen } from "react-icons/ai";
import { MdAddBox } from "react-icons/md";
import { FiSearch } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import image from "../../assets/images/circle-photo.jpg";

export default function NavBar({ toggleMenu, onHandleClick, value }) {

  return (
    <>

      <nav className="NavBar">
        <ul className="Left-side">
          <li>
            <a className="icon1">
              <RiMenuFill onClick={toggleMenu} />
            </a>
          </li>
          <li>
            <a className="icon1" >
              <MdWindow />
              <span className="title">DashBoard</span>
            </a>
          </li>

          <li >
            <a className="icon1 " >
              <AiOutlineFolderOpen />
              <span className="title">Collections</span>
            </a>
          </li>
        </ul>

        <ul className="Right-side">
          <li>
            <a className="icon2">
              <MdAddBox />
            </a>
          </li>
          <li>
            <a className="icon1">
              <FiSearch />
            </a>
          </li>
          <li>
            <a className="icon1">
              <IoMdNotificationsOutline />
            </a>
          </li>
          <li>
            <a className="icon1">
              <img className="img" src={image} alt="image" />
            </a>
          </li>
        </ul>
      </nav>
    </>
  );
}
