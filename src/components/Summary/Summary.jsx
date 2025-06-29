import React, { useState, useEffect } from 'react';
import { useRecipeContext } from '../../hooks/useRecipes';
import styles from './Summary.module.css';

const Summary = () => {
  const { recipes, loading } = useRecipeContext();
  const [summaryData, setSummaryData] = useState({
    totalRecipes: 0,
    totalCategories: 0,
    popularRecipe: 'Belum ada data'
  });

  useEffect(() => {
    if (recipes && recipes.length > 0) {
      // Hitung total resep
      const totalRecipes = recipes.length;

      // Hitung total kategori unik
      const uniqueCategories = [...new Set(recipes.map(recipe => recipe.category))];
      const totalCategories = uniqueCategories.length;

      // Cari resep terpopuler (berdasarkan cookingTime tersingkat)
      const popularRecipe = recipes.reduce((prev, current) => {
        const prevTime = prev.cookingTime || prev.time || 999;
        const currentTime = current.cookingTime || current.time || 999;
        return currentTime < prevTime ? current : prev;
      });

      setSummaryData({
        totalRecipes,
        totalCategories,
        popularRecipe: popularRecipe.title || 'Belum ada data'
      });
    }
  }, [recipes]);

  // Loading state
  if (loading) {
    return (
      <div className={styles.summary}>
        <div className={styles.card}>
          <div className={styles.cardItem}>
            <h2>Total Resep</h2>
            <p>Loading...</p>
          </div>
          <div className={styles.cardItem}>
            <h2>Kategori</h2>
            <p>Loading...</p>
          </div>
          <div className={`${styles.cardItem} ${styles.small}`}>
            <h2>Resep Terpopuler</h2>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.summary}>
      <div className={styles.card}>
        <div className={styles.cardItem}>
          <h2>Total Resep</h2>
          <p>{summaryData.totalRecipes}</p>
        </div>
        <div className={styles.cardItem}>
          <h2>Kategori</h2>
          <p>{summaryData.totalCategories}</p>
        </div>
        <div className={`${styles.cardItem} ${styles.small}`}>
          <h2>Resep Terpopuler</h2>
          <p>{summaryData.popularRecipe}</p>
        </div>
      </div>
    </div>
  );
};

export default Summary;