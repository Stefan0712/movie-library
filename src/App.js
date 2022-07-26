import {Link, Outlet} from "react-router-dom"
import {useState, useRef, useEffect} from "react"
import './App.css';
import logo from "./logo.png"
import Movie from "./components/Movie";

function App() {
  //api key = 1d23eb17c73e05952dad0294acb0007d
  const searchBoxRef = useRef()
  const POPULAR_API = "https://api.themoviedb.org/3/movie/popular?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=1"


  const [testData, setTestData]= useState("test")
  const [popularMovies, setPopularMovies] = useState([])

  useEffect(()=>{
  //   fetch("https://api.themoviedb.org/3/search/movie?api_key=1d23eb17c73e05952dad0294acb0007d&query=Jack+Reacher")
  // .then((res) => res.json()).then((json)=>console.log(json))
      fetch(POPULAR_API).then(res=>res.json()
      ).then(data =>{
        setPopularMovies(data.results)
        console.log(popularMovies)
      })
     






},[])

  const handleSearch = () =>{
    console.log(searchBoxRef.current.value)
  }







  return (
    <div>
      <nav>
        <div className='logo-container'>
          <img src={logo} alt="logo" id="logo"></img>
        </div>
        <div className="search-container">
          <input ref={searchBoxRef} type="text" id="search-box" placeholder="Search a movie by name..."></input>
          <button id="search-button" onClick={handleSearch}>Search</button>
        </div>
        <div className='nav-links'>
          <Link to="./home">Home</Link>
          <Link to="./top">Top Movies</Link>
          <Link to="./about">About</Link>
        </div>
      </nav>
      <div className="app-body">
        <Outlet context={[popularMovies, setPopularMovies]}/>
      </div>
      <footer>
        <p>This website is made for TheOdinProject</p>
      </footer>
    </div>
  );
}

export default App;
