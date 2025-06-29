import React from 'react';
import { RecipeContext } from './RecipeContext';
import { useRecipes as useRecipesHook } from '../hooks/useRecipes';

export const RecipeProvider = ({ children }) => {
  const recipeState = useRecipesHook();

  return (
    <RecipeContext.Provider value={recipeState}>
      {children}
    </RecipeContext.Provider>
  );
};