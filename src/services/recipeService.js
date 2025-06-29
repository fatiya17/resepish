import { supabase } from '../lib/supabase';

export const recipeService = {
  async getAllRecipes() {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .order('id', { ascending: true });

    if (error) {
      console.error('Error fetching recipes:', error);
      throw error;
    }
    return data;
  },

  async getRecipeById(id) {
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error(`Error fetching recipe with id ${id}:`, error);
      return null;
    }
    return data;
  },

  async uploadImage(file, fileName) {
    try {
      const cleanFileName = fileName.replace(/[^a-zA-Z0-9.-]/g, '_');
      
      const { data, error } = await supabase.storage
        .from('gambar-resep')
        .upload(cleanFileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type
        });

      if (error) {
        throw error;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('gambar-resep')
        .getPublicUrl(data.path);

      return publicUrl;
      
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error(`Upload failed: ${error.message}`);
    }
  },

  async addRecipe(recipeData) {
    const cleanData = { ...recipeData };
    if ('id' in cleanData) {
      delete cleanData.id;
    }
    
    const { data, error } = await supabase
      .from('recipes')
      .insert([cleanData])
      .select()
      .single();

    if (error) {
      console.error('Error adding recipe:', error);
      throw error;
    }

    return data;
  }
};