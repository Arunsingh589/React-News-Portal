import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { FaBookmark } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const NewsComponent = () => {
  const [category, setCategory] = useState('general'); // Default category
  const [articles, setArticles] = useState([]);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const pageSize = 10; // Number of articles per page
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://newsapi.org/v2/top-headlines', {
          params: {
            country: 'in',
            category: category,
            page: page,
            pageSize: pageSize,
            apiKey: '714ef9b8a6ef47d19b4bda6f4f0d100f',
          },
        });
        setArticles(response.data.articles);
        setTotalResults(response.data.totalResults);
      } catch (error) {
        console.error('Error fetching the news articles:', error);
      }
    };

    fetchNews();
  }, [category, page]);

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    setPage(1); // Reset to first page when category changes
  };

  const handleSaveNews = (article) => {
    const savedArticles = JSON.parse(localStorage.getItem('savedArticles')) || [];
    if (savedArticles.some(saved => saved.title === article.title)) {
      toast.error('News already saved!');
      return;
    }
    savedArticles.push(article);
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
    toast.success('News saved!');
    window.dispatchEvent(new Event('storage')); // To update the count in Navbar
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  const handleArticleClick = (index) => {
    navigate(`/news/${index}`, { state: { article: articles[index] } });
  };

  const totalPages = Math.ceil(totalResults / pageSize);

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-8">
      <ToastContainer 
      className={"w-[240px] md:w-[300px]  "}
      position="top-right"
      autoClose={1500}
      />
      <h1 className="text-2xl md:text-4xl mb-6 text-center">Top Headlines</h1>

      {/* Category Selection Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        <CategoryButton category="general" selectedCategory={category} onChange={handleCategoryChange}>
          General
        </CategoryButton>
        <CategoryButton category="business" selectedCategory={category} onChange={handleCategoryChange}>
          Business
        </CategoryButton>
        <CategoryButton category="technology" selectedCategory={category} onChange={handleCategoryChange}>
          Technology
        </CategoryButton>
        <CategoryButton category="entertainment" selectedCategory={category} onChange={handleCategoryChange}>
          Entertainment
        </CategoryButton>
      </div>

      {/* News Grid */}
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

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6">
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-l-md hover:bg-gray-400 focus:outline-none"
          onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}
          title="Previous page"
        >
          Previous
        </button>
        <span className="px-4 py-2 bg-white border-t border-b border-gray-300">{page} of {totalPages}</span>
        <button
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-r-md hover:bg-gray-400 focus:outline-none"
          onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}
          title="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
};

// Button component for category selection
const CategoryButton = ({ category, selectedCategory, onChange, children }) => {
  const handleClick = () => {
    onChange(category);
  };

  return (
    <button
      className={`py-2 px-4 rounded-md focus:outline-none ${selectedCategory === category ? 'bg-[#1aa1f5] text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
      onClick={handleClick}
      title={`Select ${children} category`} // Accessible label
    >
      {children}
    </button>
  );
};

export default NewsComponent;
