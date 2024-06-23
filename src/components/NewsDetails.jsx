import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const NewsDetail = () => {
  const { articleIndex } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [article, setArticle] = useState(location.state?.article || null);

  useEffect(() => {
    if (!article) {
      const fetchArticle = async () => {
        try {
          const response = await axios.get('http://newsapi.org/v2/top-headlines', {
            params: {
              country: 'in',
              apiKey: '714ef9b8a6ef47d19b4bda6f4f0d100f',
            },
          });
          const selectedArticle = response.data.articles[articleIndex];
          setArticle(selectedArticle);
        } catch (error) {
          console.error('Error fetching the news article:', error);
        }
      };

      fetchArticle();
    }
  }, [article, articleIndex]);

  if (!article) {
    return <div>Loading...</div>;
  }

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
      <div className="bg-white p-4 rounded shadow">
        {article.urlToImage && (
          <img
            className="w-full h-auto rounded-lg mb-4 object-contain max-h-96"
            src={article.urlToImage}
            alt={article.title}
          />
        )}
        <h1 className="text-3xl font-semibold mb-2">{article.title}</h1>
        <p className="text-gray-600 mb-2">{new Date(article.publishedAt).toLocaleString()}</p>
        <p className="text-lg text-gray-700 leading-relaxed">{article.content}</p>
      </div>
    </div>
  );
};

export default NewsDetail;
