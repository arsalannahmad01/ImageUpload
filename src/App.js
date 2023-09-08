import "./App.css";
import React from "react";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Home from './components/Home'
import Image from "./components/Image";
import ImageList from "./components/ImageList";

const App = () => {

  return (
    <div className="App">
     <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/home" element={<Home />} />
        <Route exact path="/image/:id" element={<Image />} />
        <Route exact path="/image-list" element={<ImageList />} />
      </Routes>
     </BrowserRouter>
    </div>
  );
}

export default App;
