import React from "react";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./component/About";
import NoteState from "./context/notes/noteState";
import Login from "./component/Login";
import Signup from "./component/Signup";


function App() {

  return (
    <NoteState>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="/login" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
        </Routes>
      </Router>
      </NoteState>

  );
}

export default App;
