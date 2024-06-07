import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { message } from 'antd';

const TopStarRatingTop = ({ articleId }) => {
  const [averageRatingTop, setAverageRatingTop] = useState(null);

  useEffect(() => {
    fetchAverageRatingTop(articleId);
  }, [articleId]);

  const fetchAverageRatingTop = async (articleId) => {
    try {
      const response = await axios.get(`/api/getAverageStar?articleId=${articleId}`);
      if (response.status === 200) {
        setAverageRatingTop(response.data);
      } else {
        message.error('Failed to fetch average rating.');
      }
    } catch (error) {
      console.error('Error fetching average rating:', error);
      message.error('Failed to fetch average rating.');
    }
  };

  if (averageRatingTop === null) {
    return <div>Loading...</div>;
  }

  return (
    <div className="star-rating">
      <div className="average-rating">
        <p  style={{
        color: 'white',
        fontSize:'2rem'
      }}>{averageRatingTop.averageStar.toFixed(1)} </p>
      </div>
      <div className="rating-stars">
        <i className="fa-star fas" />
      </div>
    </div>
  );
};

export default TopStarRatingTop;
