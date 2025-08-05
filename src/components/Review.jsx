import React from 'react';

const Review = ({ name, comment, rating,img }) => {
  return (
    <div className="review">
      <img 
        src={img} 
        alt={`Foto de ${name}`}
        className="review-img"
        style={{width: 60, height: 60, borderRadius: "50%", objectFit:"cover", marginBottom: 8}} />
      <h4 className="review-name">{name}</h4>
      <p className="review-comment">"{comment}"</p>
      <p className="review-rating">{'⭐'.repeat(rating)}</p>
    </div>
  );
};

export default Review;
