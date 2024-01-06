
import NavBar from "./components/NavBar/NavBar";
import SideBar from "./components/SideBar/SideBar";
import './assets/scss/components/Main.scss';
import './assets/scss/index.scss'
import { useState } from "react";

import Router from "./Router";

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <NavBar toggleMenu={toggleMenu}/>
      <div>
      <SideBar isMenuOpen={isMenuOpen} />
      <Router />
      </div>
    </>
  );
};