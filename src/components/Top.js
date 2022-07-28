import { useState, useEffect, useRef } from "react";
import Movie from "./Movie";
import "./top.css";



const Top = () => {
    const [currentPage, setCurrentPage] = useState(1)
    const [popularMovies, setPopularMovies] = useState([])
    const [pages, setPages] = useState([1,2,3,4,5,6,7,8,9,10])
    const bodyRef = useRef()
    const POPULAR_API = `https://api.themoviedb.org/3/movie/popular?api_key=1d23eb17c73e05952dad0294acb0007d&language=en-US&page=${currentPage}`

   
    useEffect(()=>{
        setPopularMovies([])
            fetch(POPULAR_API).then(res=>res.json()
            ).then(data =>{
              setPopularMovies(data.results)
              document.getElementById("pgBtn"+currentPage).classList.toggle("active-btn")

            })

      },[currentPage])
      const setPage = (page) =>{
          setCurrentPage(page)
          toggleActiveButton();
          
        
          

    }
    const toggleActiveButton = () =>{
        for(let i=1;i<=pages.length;i++){
            document.getElementById("pgBtn"+i).classList.remove("active-btn")
        }
        }
        const prevPage = () =>{
            setCurrentPage((currentPage)=>currentPage-1)
            toggleActiveButton()
        }
        const nextPage = () =>{
            setCurrentPage((currentPage)=>currentPage+1)
            toggleActiveButton()
        }

        const scrollToTheTop = () =>{
            window.scrollTo(0,0)
        }
    return (
        <div> <div ref={bodyRef} className="top-movies-body">
            <button id="scroll-to-top-btn" onClick={scrollToTheTop}>^</button>
            {popularMovies.map(item=><Movie data={item} top={"top"}/>)  }
        </div>
        <div className="top-movies-navigation-body">
            <div className="navigation-container">
                <div className="left-arrow" onClick={prevPage}>&#171;</div>
                {pages.map(page=><div id={"pgBtn"+page} className="pgBox" onClick={()=>setPage(page)}>{page}</div>)}
                <div className="right-arrow" onClick={nextPage}>&#187;</div>
            </div>
        </div>
        
    </div> );
}
 
export default Top;