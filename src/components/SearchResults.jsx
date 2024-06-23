import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { FaBookmark, FaChevronLeft } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SearchResults = () => {
  const [articles, setArticles] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://newsapi.org/v2/everything', {
          params: {
            q: query,
            apiKey: '714ef9b8a6ef47d19b4bda6f4f0d100f',
          },
        });
        setArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching the news articles:', error);
      }
    };

    if (query) {
      fetchNews();
    }
  }, [query]);

  const handleSaveNews = (article) => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    if (savedArticles.some(saved => saved.title === article.title)) {
      toast.error('News already saved!');
      return;
    }
    savedArticles.push(article);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    toast.success('News saved!');
  };

  const handleArticleClick = (index) => {
    navigate(`/news/${index}`, { state: { article: articles[index] } });
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-8">
      <Link to="/" className="flex items-center text-gray-600 mb-4 hover:text-gray-900">
        <FaChevronLeft className="h-6 w-6 mr-1" />
        Back to News
      </Link>
      <ToastContainer
        className={"w-[240px] md:w-[300px]"}
        position="top-right"
        autoClose={1500}
      />
      <h1 className="text-2xl md:text-4xl mb-6 text-center">Search Results for "{query}"</h1>
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article, index) => (
          <div key={index} className="relative">
            <div className="bg-white p-4 rounded shadow h-full flex flex-col">
              <div
                onClick={() => handleArticleClick(index)}
                className="mt-2 text-blue-500 hover:text-blue-700 cursor-pointer"
                title={`Read more about ${article.title}`}
              >
                {article.urlToImage && (
                  <img className="w-full h-48 object-cover rounded mb-4" src={article.urlToImage} alt={article.title} />
                )}
                <h2 className="text-xl font-semibold mb-2 line-clamp-2">{article.title}</h2>
                <p className="text-gray-700 flex-grow line-clamp-3">{article.description}</p>
                Read more
              </div>
            </div>
            <button
              className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none"
              onClick={() => handleSaveNews(article)}
              title={`Save ${article.title}`}
            >
              <FaBookmark />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
