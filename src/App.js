import {Link, Outlet} from "react-router-dom"
import './App.css';
import logo from "./logo.png"
import searchIcon from "./images/search.png"

function App() {
  //api key = 1d23eb17c73e05952dad0294acb0007d





  return (
    <div>
      <nav>
        <div className='logo-container'>
          <img src={logo} alt="logo" id="logo"></img>
        </div>
       
        <div className='nav-links'>
          <Link to="./search"><img src={searchIcon} alt="search icon" id="search-icon"></img>Search</Link>
          <Link to="./home">Home</Link>
          <Link to="./top">Top Movies</Link>
          <Link to="./about">About</Link>
        </div>
      </nav>
      <div className="app-body">
        <Outlet />
      </div>
      <footer>
        <p>This website is made for TheOdinProject</p>
      </footer>
    </div>
  );
}

export default App;
