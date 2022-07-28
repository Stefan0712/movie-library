import {Link, Outlet} from "react-router-dom"
import './App.css';
import logo from "./logo.png"
import searchIcon from "./images/search.png"
import {useEffect, useRef, useState} from "react"

function App() {
  const navMenuBtnRef = useRef()
  const navMenuRef = useRef()
  const [isMenuActive, setIsMenuActive] = useState(false)

  const handleMenuBtn = () =>{
    if(isMenuActive===false){
      setIsMenuActive(true);
      navMenuRef.current.style.display = "flex";
    }else if(isMenuActive===true){
      setIsMenuActive(false);
      navMenuRef.current.style.display = "none";
    }
  }
  const handleMenubtnClick = ()=>{
      setIsMenuActive(false);
      navMenuRef.current.style.display = "none";
  }


  return (
    <div>
      <nav>
        <div className='logo-container'>
          <img src={logo} alt="logo" id="logo"></img>
        </div>
       
        <div className='nav-links'>
          <Link to="./search" onClick={handleMenubtnClick}><img src={searchIcon} alt="search icon" id="search-icon"></img>Search</Link>
          <Link to="./home" onClick={handleMenubtnClick}>Home</Link>
          <Link to="./top" onClick={handleMenubtnClick}>Top Movies</Link>
          <Link to="./about" onClick={handleMenubtnClick}>About</Link>
        </div>
        <div className="nav-button-container ">

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
      <div ref={navMenuRef} className='nav-links-mobile'>
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
