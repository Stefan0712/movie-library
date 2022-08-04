import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import App from './App';
import Home from './components/Home';
import Top from './components/Top';
import About from './components/About';
import Search from './components/Search';
import MoviePage from './components/MoviePage';
import Login from './components/Login';
import Signup from './components/Signup';
import Account from './components/Account';
import UpdateProfile from './components/UpdateProfile'
import ResetPassword from './components/ResetPassword';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>

<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/search" element={<Search />} />
    <Route path="/home" element={<Home />} />
    <Route path="/top" element={<Top />} />
    <Route path="/about" element={<About />} />
    <Route path=":movieId" element={<MoviePage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/account" element={<Account />} />
    <Route path="/update-profile" element={<UpdateProfile />} />
    <Route path="/reset-password" element={<ResetPassword />} />




  </Route>
</Routes>
  </BrowserRouter>
)

