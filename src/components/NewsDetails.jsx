import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import { FaChevronLeft } from 'react-icons/fa';

const NewsDetail = () => {
  const { articleIndex } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: '227f37615b79402ab24295c41047ace2',
          },
        });
        const selectedArticle = response.data.articles[articleIndex];
        setArticle(selectedArticle);
      } catch (error) {
        console.error('Error fetching the news article:', error);
      }
    };

    fetchArticle();
  }, [articleIndex]);

  if (!article) {
    return <div>Loading...</div>;
  }

  return (
    <div className="p-4 bg-gray-100 min-h-screen mt-8">
      <Link to="/" className="flex items-center text-gray-600 mb-4 hover:text-gray-900">
        <FaChevronLeft className="h-6 w-6 mr-1" />
        Back to News
      </Link>
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
