import {Link, Outlet} from "react-router-dom"
import './App.css';
import logo from "./logo.png"
import searchIcon from "./images/search.png"
import {useEffect, useRef, useState} from "react"

function App() {
  const navMenuBtnRef = useRef()
  const navMenuRef = useRef()
  //keeps track if the menu is active or not
  const [isMenuActive, setIsMenuActive] = useState(false)
  const [menuClass, setMenuClass] = useState("nav-links-mobile")

  const handleMenuBtn = () =>{
    //checks if the menu is active 
    if(isMenuActive===false){
      //set menu status to true and makes it visible by adding activeMenu class
      setIsMenuActive(true);
      setMenuClass("nav-links-mobile activateMenu")
    }else if(isMenuActive===true){
      //set menu status to false and make it invisible by removing activeMenu class
      setIsMenuActive(false);
      setMenuClass("nav-links-mobile")
    }
  }
  const handleMenubtnClick = ()=>{
    //on any nav bar button click, the menu is deactivated
      setIsMenuActive(false);
      setMenuClass("nav-links-mobile")
  }


  return (
    <div>
      <nav>
        <div className='logo-container'>
          <img src={logo} alt="logo" id="logo"></img>
        </div>
       {/*Nav bar menu with links that is always active on the navbar, for bigger screens */}
        <div className="nav-links">
          <Link to="./search" onClick={handleMenubtnClick}><img src={searchIcon} alt="search icon" id="search-icon"></img>Search</Link>
          <Link to="./home" onClick={handleMenubtnClick}>Home</Link>
          <Link to="./top" onClick={handleMenubtnClick}>Top Movies</Link>
          <Link to="./about" onClick={handleMenubtnClick}>About</Link>
          <Link to="./account" onClick={handleMenubtnClick}>Account</Link>
        </div>
        <div className="nav-button-container ">
            {/*menu burger button that is visible only on smaller screens and activate/deactivate the mobile menu*/}
            <div ref={navMenuBtnRef} className="nav-menu-btn" onClick={handleMenuBtn}>
                <div className="menu-line" id="menu-line1"></div>
                <div></div>
                <div className="menu-line"></div>
                <div></div>
                <div className="menu-line" id="menu-line2"></div>
            </div>
        </div>
      </nav>
      <div className="app-body">
        {/*menu with links that is active on mobile devices and smaller screens */}
      <div ref={navMenuRef} className={menuClass}>
          <Link to="./search" onClick={handleMenubtnClick}><img src={searchIcon} alt="search icon" id="search-icon"></img>Search</Link>
          <Link to="./home" onClick={handleMenubtnClick}>Home</Link>
          <Link to="./top" onClick={handleMenubtnClick}>Top Movies</Link>
          <Link to="./about" onClick={handleMenubtnClick}>About</Link>
        </div>
        <Outlet />
      </div>
      <footer>
        <p>This website is made for TheOdinProject</p>
      </footer>
    </div>
  );
}

export default App;
