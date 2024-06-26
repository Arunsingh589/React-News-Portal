import React, { useState, useEffect } from 'react';
import { FaChevronLeft, FaTrashAlt } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookmarkPage = () => {
  const [savedArticles, setSavedArticles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('savedArticles')) || [];
    setSavedArticles(saved);

    const handleStorageChange = () => {
      const updatedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
      setSavedArticles(updatedArticles);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const handleRemoveArticle = (indexToRemove) => {
    const updatedArticles = savedArticles.filter((_, index) => index !== indexToRemove);
    setSavedArticles(updatedArticles);
    localStorage.setItem('savedArticles', JSON.stringify(updatedArticles));
    toast.success('News removed!');
    window.dispatchEvent(new Event('storage')); // Dispatch storage event
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-8">
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center text-gray-600 mb-4 hover:text-gray-900" 
        title="Back to News"
      >
        <FaChevronLeft className="h-6 w-6 mr-1" />
        Back to News
      </button>
      <ToastContainer
        className={"w-[240px] md:w-[300px]"}
        position="top-right"
        autoClose={1500}
      />
      <h1 className="text-2xl md:text-4xl mb-6 text-center">Bookmarked Articles</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {savedArticles.length > 0 ? (
          savedArticles.map((article, index) => (
            <div key={index} className="bg-white p-4 rounded shadow h-full flex flex-col relative">
              {article.urlToImage && (
                <img className="w-full h-48 object-cover rounded mb-4" src={article.urlToImage} alt={article.title} />
              )}
              <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
              <p className="text-gray-700 flex-grow line-clamp-3">{article.description}</p>
              <button
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-md hover:bg-red-600 focus:outline-none"
                onClick={() => handleRemoveArticle(index)}
              >
                <FaTrashAlt />
              </button>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">No bookmarked articles</p>
        )}
      </div>
    </div>
  );
};

export default BookmarkPage;
