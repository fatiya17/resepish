import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import RecipeList from '../../components/RecipeList/RecipeList';
import { useRecipeContext } from '../../hooks/useRecipes';
import styles from './Category.module.css';

function Category() {
  const { categoryName } = useParams();
  const { recipes, loading, error } = useRecipeContext();
  const [filteredRecipes, setFilteredRecipes] = useState([]);

  // Mapping kategori URL ke display name Indonesian
  const getCategoryDisplayName = (urlCategory) => {
    const categoryDisplayMappings = {
      'main-course': 'Makanan Berat',
      'makanan-berat': 'Makanan Berat',
      'dessert': 'Dessert',
      'drink': 'Minuman',
      'minuman': 'Minuman',
      'snack': 'Cemilan',
      'cemilan': 'Cemilan',
      'breakfast': 'Sarapan',
      'sarapan': 'Sarapan'
    };
    
    const normalizedCategory = urlCategory?.toLowerCase();
    return categoryDisplayMappings[normalizedCategory] || 
           urlCategory?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  useEffect(() => {
    console.log('Category filtering for:', categoryName);
    
    if (recipes && recipes.length > 0) {
      // Filter berdasarkan kategori database (yang sebenarnya)
      const filtered = recipes.filter(recipe => {
        const recipeCategory = recipe.category;
        return recipeCategory === categoryName || recipeCategory?.toLowerCase() === categoryName?.toLowerCase();
      });
      
      console.log(`Found ${filtered.length} recipes for category: ${categoryName}`);
      setFilteredRecipes(filtered);
    } else {
      console.log('No recipes available yet');
    }
  }, [categoryName, recipes]);

  const displayCategoryName = getCategoryDisplayName(categoryName);

  if (loading) {
    return (
      <div className={styles.category}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <h1>Resep {displayCategoryName}</h1>
            <p>Loading recipes...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.category}>
        <div className={styles.container}>
          <div className={styles.error}>
            <h1>Resep {displayCategoryName}</h1>
            <p>Error loading recipes: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.category}>
      <div className={styles.container}>
        <h1>Resep {displayCategoryName}</h1>
        <p>Ditemukan {filteredRecipes.length} resep dalam kategori ini</p>
        
        <RecipeList 
          recipes={filteredRecipes}
          loading={loading}
        />
      </div>
    </div>
  );
}

export default Category;