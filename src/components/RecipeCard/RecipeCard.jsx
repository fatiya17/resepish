import React from 'react';
import { FaClock } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './RecipeCard.module.css';

function RecipeCard({ recipe }) {
  if (!recipe) {
    return (
      <div className={styles.recipeCard}>
        <div className={styles.placeholder}>
          <p>Recipe data not available</p>
        </div>
      </div>
    );
  }

  const {
    id = 0,
    title = 'Untitled Recipe',
    category = 'Unknown Category',
    cookingTime = 0,
    image_url,
    image
  } = recipe;

  const imageSource = image_url || image || `data:image/svg+xml;base64,${btoa(`
    <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#f0f0f0"/>
      <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial, sans-serif" font-size="16">
        No Image
      </text>
    </svg>
  `)}`;

  const handleImageError = (e) => {
    e.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f0f0f0"/>
        <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#999" font-family="Arial, sans-serif" font-size="14">
          Recipe Image
        </text>
      </svg>
    `)}`;
    e.target.onError = null;
  };

  return (
    <div className={styles.recipeCard}>
      <img 
        className={styles.recipeImage} 
        src={imageSource} 
        alt={title}
        onError={handleImageError}
      />
      
      <div className={styles.recipeTitle}>{title}</div>
      <div className={styles.recipeCategory}>{category}</div>
      
      <div className={styles.recipeTime}>
        <FaClock className={styles.recipeTimeIcon} />
        <div className={styles.recipeTimeText}>{cookingTime} minutes</div>
      </div>
      
      <Link to={`/recipe/${id}`} className={styles.viewDetailsLink}>
        View Details
      </Link>
    </div>
  );
}

export default RecipeCard;