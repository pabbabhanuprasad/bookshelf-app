import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import SearchPage from "./Components/SearchPage";
import BookShelfPage from "./Components/BookShelfPage";

const App = () => {
  return (
    <Router>
      <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container d-flex justify-content-between align-items-center">
            <h2>Book Search App</h2>
            <div id="navbarNav">
              <ul className="navbar-nav d-flex flex-row">
                <li className="nav-item mr-2">
                  <Link className="nav-link" to="/">
                    Search
                  </Link>
                </li>
                <li className="nav-item ml-auto">
                  <Link
                    className="btn btn-success rounded-pill"
                    to="/bookshelf"
                  >
                    My Bookshelf
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="container mt-4">
          <Routes>
            <Route path="/" exact element={<SearchPage />} />
            <Route path="/bookshelf" element={<BookShelfPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;

