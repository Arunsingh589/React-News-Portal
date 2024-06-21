// Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [bookmarkCount, setBookmarkCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const updateBookmarkCount = () => {
      const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
      setBookmarkCount(savedArticles.length);
    };

    updateBookmarkCount();

    window.addEventListener('storage', updateBookmarkCount);
    return () => {
      window.removeEventListener('storage', updateBookmarkCount);
    };
  }, []);

  // const handleSearchChange = (e) => {
  //   setSearchTerm(e.target.value);
  // };

  // const handleSearchSubmit = (e) => {
  //   e.preventDefault();
  //   if (searchTerm.trim()) {
  //     navigate(`/search?query=${searchTerm}`);
  //     setSearchTerm('');
  //   }
  // };

  return (
    <nav className="bg-white shadow p-4 flex items-center justify-between">
      <div className="text-xl font-bold">News Portal</div>
      <div className="flex-1 mx-4">
        <form >
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 border rounded"
            // value={searchTerm}
            // onChange={handleSearchChange}
          />
        </form>
      </div>
      <Link to="/bookmarks" className="relative text-xl">
        <FaBookmark />
        {bookmarkCount > 0 && (
          <span className="absolute top-3 left-3 right-0 bg-red-500 text-white rounded-full h-4 w-4 flex items-center justify-center text-xs">
            {bookmarkCount}
          </span>
        )}
      </Link>
    </nav>
  );
};

export default Navbar;
