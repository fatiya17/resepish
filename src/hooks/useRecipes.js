import { useState, useEffect, useCallback, useContext } from 'react';
import { recipeService } from '../services/recipeService';
import { RecipeContext } from '../context/RecipeContext';

// Hook untuk state management resep
export const useRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [allRecipes, setAllRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);

  const fetchRecipes = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await recipeService.getAllRecipes();
      setRecipes(data || []);
      setAllRecipes(data || []);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching recipes:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const getRecipeById = useCallback(async (id) => {
    try {
      const recipe = await recipeService.getRecipeById(id);
      return recipe;
    } catch (err) {
      console.error('Error fetching recipe by id:', err);
      return null;
    }
  }, []);

  const addRecipe = useCallback(async (recipeData) => {
    try {
      const newRecipe = await recipeService.addRecipe(recipeData);
      setRecipes(prev => [...prev, newRecipe]);
      setAllRecipes(prev => [...prev, newRecipe]);
      return newRecipe;
    } catch (err) {
      console.error('Error adding recipe:', err);
      throw err;
    }
  }, []);

  // Search recipes function
  const searchRecipes = useCallback(async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      setRecipes(allRecipes);
      return allRecipes;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Debug: log untuk melihat data
      console.log('Search query:', query);
      console.log('All recipes:', allRecipes);
      
      // Filter recipes based on query dengan pencarian yang lebih fleksibel
      const filteredRecipes = allRecipes.filter(recipe => {
        const searchTerm = query.toLowerCase().trim();
        
        // Debug: log setiap recipe yang dicek
        console.log('Checking recipe:', recipe.title, recipe);
        
        // Cek berbagai field dengan lebih teliti
        const titleMatch = recipe.title?.toLowerCase().includes(searchTerm);
        const categoryMatch = recipe.category?.toLowerCase().includes(searchTerm);
        const descriptionMatch = recipe.description?.toLowerCase().includes(searchTerm);
        
        // Cek ingredients dengan berbagai format
        let ingredientsMatch = false;
        if (recipe.ingredients) {
          if (Array.isArray(recipe.ingredients)) {
            ingredientsMatch = recipe.ingredients.some(ingredient => 
              ingredient?.toString().toLowerCase().includes(searchTerm)
            );
          } else if (typeof recipe.ingredients === 'string') {
            ingredientsMatch = recipe.ingredients.toLowerCase().includes(searchTerm);
          }
        }
        
        // Cek instructions/steps juga
        let instructionsMatch = false;
        if (recipe.instructions) {
          if (Array.isArray(recipe.instructions)) {
            instructionsMatch = recipe.instructions.some(instruction => 
              instruction?.toString().toLowerCase().includes(searchTerm)
            );
          } else if (typeof recipe.instructions === 'string') {
            instructionsMatch = recipe.instructions.toLowerCase().includes(searchTerm);
          }
        }
        
        // Cek steps juga (alternatif nama untuk instructions)
        let stepsMatch = false;
        if (recipe.steps) {
          if (Array.isArray(recipe.steps)) {
            stepsMatch = recipe.steps.some(step => 
              step?.toString().toLowerCase().includes(searchTerm)
            );
          } else if (typeof recipe.steps === 'string') {
            stepsMatch = recipe.steps.toLowerCase().includes(searchTerm);
          }
        }
        
        // Debug: log hasil match untuk setiap field
        console.log(`Match results for "${recipe.title}":`, {
          titleMatch,
          categoryMatch, 
          descriptionMatch,
          ingredientsMatch,
          instructionsMatch,
          stepsMatch
        });
        
        const isMatch = titleMatch || categoryMatch || descriptionMatch || ingredientsMatch || instructionsMatch || stepsMatch;
        
        // Debug: log hasil akhir
        console.log(`Final match result for "${recipe.title}":`, isMatch);
        
        // Log jika ada match
        if (isMatch) {
          console.log('MATCH FOUND:', recipe.title);
        }
        
        return isMatch;
      });

      console.log('Filtered results:', filteredRecipes);
      console.log('Number of results:', filteredRecipes.length);
      
      setSearchResults(filteredRecipes);
      setRecipes(filteredRecipes);
      return filteredRecipes;
    } catch (err) {
      setError(err.message);
      console.error('Search error:', err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [allRecipes]);

  // Clear search function
  const clearSearch = useCallback(() => {
    setSearchResults([]);
    setRecipes(allRecipes);
    setError(null);
  }, [allRecipes]);

  // Filter by category
  const filterByCategory = useCallback((category) => {
    if (!category || category === 'all') {
      setRecipes(allRecipes);
      return allRecipes;
    }

    const filteredRecipes = allRecipes.filter(recipe => 
      recipe.category?.toLowerCase() === category.toLowerCase()
    );
    setRecipes(filteredRecipes);
    return filteredRecipes;
  }, [allRecipes]);

  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  return {
    recipes,
    allRecipes,
    searchResults,
    loading,
    error,
    fetchRecipes,
    getRecipeById,
    addRecipe,
    searchRecipes,
    clearSearch,
    filterByCategory
  };
};

// Hook untuk menggunakan RecipeContext
export const useRecipeContext = () => {
  const context = useContext(RecipeContext);
  if (!context) {
    throw new Error('useRecipeContext must be used within a RecipeProvider');
  }
  return context;
};