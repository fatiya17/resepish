import React from 'react';
import RecipeCard from '../RecipeCard/RecipeCard';
import styles from './RecipeList.module.css';

const RecipeList = ({ title, recipes, loading = false }) => {
  // Debug: periksa data yang diterima

  if (loading) {
    return (
      <div className={styles.contentResep}>
        <div className={styles.titleResep}>{title || 'Recipes'}</div>
        <div className={styles.loadingState}>
          <p>Loading recipes...</p>
        </div>
      </div>
    );
  }

  // Safety check
  if (!recipes || !Array.isArray(recipes)) {
    return (
      <div className={styles.contentResep}>
        <div className={styles.titleResep}>{title || 'Recipes'}</div>
        <div className={styles.emptyState}>
          <p>Belum ada resep dalam kategori ini.</p>
        </div>
      </div>
    );
  }

  if (recipes.length === 0) {
    return (
      <div className={styles.contentResep}>
        <div className={styles.titleResep}>{title || 'Recipes'}</div>
        <div className={styles.emptyState}>
          <p>Belum ada resep dalam kategori ini.</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.contentResep}>
      {title && <div className={styles.titleResep}>{title}</div>}
      <div className={styles.recipeCardContainer}>
        {recipes.map((recipe, index) => {
          // Pastikan recipe object ada
          if (!recipe) {
            console.warn(`Recipe at index ${index} is undefined`);
            return null;
          }

          // Normalisasi data: mapping dari struktur Supabase ke struktur yang diharapkan komponen
          const normalizedRecipe = {
            id: recipe.id,
            title: recipe.title,
            category: recipe.category,
            cookingTime: recipe.cookingTime || recipe.time || 0,
            image: recipe.image_url || recipe.image,
            ingredients: recipe.ingredients,
            steps: recipe.instructions || recipe.steps,
            description: recipe.description
          };

          return (
            <RecipeCard
              key={normalizedRecipe.id}
              recipe={normalizedRecipe}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecipeList;