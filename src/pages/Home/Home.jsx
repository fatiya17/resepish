import React, { useState, useEffect } from 'react';
import Hero from '../../components/Hero/Hero';
import Summary from '../../components/Summary/Summary';
import RecipeList from '../../components/RecipeList/RecipeList';
import AddRecipe from '../../pages/AddRecipe/AddRecipe';
import { useRecipeContext } from '../../hooks/useRecipes';
import styles from './Home.module.css';

function Home() {
  const { recipes, loading, error } = useRecipeContext();
  const [currentSearchQuery, setCurrentSearchQuery] = useState('');
  const [displayedRecipes, setDisplayedRecipes] = useState([]);

  // Update displayed recipes when recipes change
  useEffect(() => {
    setDisplayedRecipes(recipes);
  }, [recipes]);

  // Simple search function using recipes from context
  const searchRecipes = (query) => {
    if (!query.trim()) {
      setDisplayedRecipes(recipes);
      return;
    }

    console.log('=== HOME SEARCH DEBUG ===');
    console.log('Search query:', query);
    console.log('Available recipes:', recipes);
    console.log('Recipes count:', recipes.length);

    const searchTerm = query.toLowerCase().trim();
    
    const filteredRecipes = recipes.filter(recipe => {
      const titleMatch = recipe.title?.toLowerCase().includes(searchTerm);
      const categoryMatch = recipe.category?.toLowerCase().includes(searchTerm);
      const descriptionMatch = recipe.description?.toLowerCase().includes(searchTerm);
      
      console.log(`Checking: ${recipe.title} - Title match: ${titleMatch}`);
      
      return titleMatch || categoryMatch || descriptionMatch;
    });

    console.log('Filtered results:', filteredRecipes);
    console.log('Results count:', filteredRecipes.length);
    
    setDisplayedRecipes(filteredRecipes);
  };

  const handleSearch = (query) => {
    setCurrentSearchQuery(query);
    
    if (!query.trim()) {
      setDisplayedRecipes(recipes);
    } else {
      searchRecipes(query);
    }
  };

  if (loading) {
    return (
      <div className={styles.home}>
        <Hero onSearch={handleSearch} />
        <div className={styles.loadingContainer}>
          <div className={styles.loading}>Loading recipes...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.home}>
        <Hero onSearch={handleSearch} />
        <div className={styles.errorContainer}>
          <div className={styles.error}>Error loading recipes: {error}</div>
        </div>
      </div>
    );
  }

  const listTitle = currentSearchQuery 
    ? `Hasil pencarian untuk "${currentSearchQuery}" (${displayedRecipes.length} resep)`
    : "Our Delicious Recipes";

  return (
    <div className={styles.home}>
      <Hero onSearch={handleSearch} />
      
      {currentSearchQuery && (
        <div className={styles.searchResultsHeader}>
          <div className={styles.container}>
            <div className={styles.searchInfo}>
              <h2>Hasil Pencarian</h2>
              <p>Ditemukan <strong>{displayedRecipes.length}</strong> resep untuk "<em>{currentSearchQuery}</em>"</p>
              
              {/* Search Stats */}
              <div className={styles.searchStats}>
                <span className={styles.searchStat}>
                  📊 {displayedRecipes.length} resep
                </span>
                <span className={styles.searchStat}>
                  🔍 "{currentSearchQuery}"
                </span>
                {displayedRecipes.length > 0 && (
                  <span className={styles.searchStat}>
                    ✅ Berhasil ditemukan
                  </span>
                )}
              </div>
              
              <button 
                onClick={() => handleSearch('')}
                className={styles.clearSearchButton}
              >
                🏠 Tampilkan Semua Resep
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!currentSearchQuery && <Summary recipes={recipes} />}
      
      <RecipeList 
        title={listTitle}
        recipes={displayedRecipes} 
      />
      
      {currentSearchQuery && displayedRecipes.length === 0 && (
        <div className={styles.noSearchResults}>
          <div className={styles.container}>
            <div className={styles.noResultsContent}>
              <div className={styles.noResultsIcon}>🔍</div>
              <h3>Tidak ada resep ditemukan</h3>
              <p>Tidak ada resep yang cocok dengan pencarian "<strong>{currentSearchQuery}</strong>"</p>
              
              <div className={styles.searchStats}>
                <span className={styles.searchStat}>
                  🔍 "{currentSearchQuery}"
                </span>
                <span className={styles.searchStat}>
                  📊 0 hasil
                </span>
                <span className={styles.searchStat}>
                  ❌ Tidak ditemukan
                </span>
              </div>
              
              <button 
                onClick={() => handleSearch('')}
                className={styles.showAllButton}
              >
                🏠 Tampilkan Semua Resep
              </button>
            </div>
          </div>
        </div>
      )}
      
      {!currentSearchQuery && <AddRecipe />}
    </div>
  );
}

export default Home;