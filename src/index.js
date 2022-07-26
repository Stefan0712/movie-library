import React from 'react';
import ReactDOM from 'react-dom/client';
import {Routes, Route, BrowserRouter} from "react-router-dom"
import App from './App';
import Home from './components/Home';
import Top from './components/Top';
import About from './components/About';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>

<Routes>
  <Route path="/" element={<App />}>
    <Route index element={<Home />} />
    <Route path="/home" element={<Home />} />
    <Route path="/top" element={<Top />} />
    <Route path="/about" element={<About />} />

  </Route>
</Routes>
  </BrowserRouter>
)
