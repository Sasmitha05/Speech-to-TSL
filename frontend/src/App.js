import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SpeechRecognitionComponent from "./SpeechRecognition";
import Login from "./Login";
import Signup from "./Signup";

function App() {
  return (
    <Router>
      <div className="container mt-5">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/main" element={<SpeechRecognitionComponent />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
