import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import NewsComponent from './components/NewsComponent';
import './index.css';
import NewsDetail from './components/NewsDetails';
import BookmarkPage from './components/BookmarkPage';
import SearchResults from './components/SearchResults';

function App() {
  const [bookmark, setBookmark] = useState([]);
  // className={"w-[240px] md:w-[300px]  "}
  // position="top-right"
  // autoClose={1500}

  
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<NewsComponent bookmark={bookmark} setBookmark={setBookmark} />} />
          <Route path="/news/:articleIndex" element={<NewsDetail />} />
          <Route path="/bookmarks" element={<BookmarkPage />} />
          <Route path="/search" element={<SearchResults />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
