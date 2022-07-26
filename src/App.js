import {Link, Outlet} from "react-router-dom"
import './App.css';
import logo from "./logo.png"

function App() {
  return (
    <div>
      <nav>
        <div className='logo-container'>
          <img src={logo} alt="logo" id="logo"></img>
        </div>
        <div className='nav-links'>
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
