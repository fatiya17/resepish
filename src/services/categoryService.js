import { supabase } from '../lib/supabase'

export const categoryService = {
  // Get all categories dengan count resep
  async getAllCategories() {
    try {
      // Get unique categories from recipes table
      const { data, error } = await supabase
        .from('recipes')
        .select('category')
        .not('category', 'is', null)

      if (error) throw error
      
      // Count recipes per category
      const categoryCount = {}
      data.forEach(item => {
        if (item.category) {
          categoryCount[item.category] = (categoryCount[item.category] || 0) + 1
        }
      })

      // Convert to array dengan nama yang user-friendly
      const categoryNames = {
        'main-course': 'Makanan Utama',
        'dessert': 'Makanan Penutup', 
        'drink': 'Minuman',
        'snack': 'Cemilan',
        'breakfast': 'Sarapan'
      }

      const categoryImages = {
        'main-course': '/images/main-course.jpg',
        'dessert': '/images/dessert.jpg',
        'drink': '/images/drink.jpg',
        'snack': '/images/snack.jpg',
        'breakfast': '/images/breakfast.jpg'
      }

      return Object.keys(categoryCount).map(key => ({
        slug: key,
        name: categoryNames[key] || key,
        count: categoryCount[key],
        image_url: categoryImages[key]
      })).sort((a, b) => a.name.localeCompare(b.name))
      
    } catch (error) {
      console.error('Error fetching categories:', error)
      throw error
    }
  },

  // Get category info by slug
  async getCategoryBySlug(slug) {
    const categoryNames = {
      'main-course': 'Makanan Utama',
      'dessert': 'Makanan Penutup',
      'drink': 'Minuman', 
      'snack': 'Cemilan',
      'breakfast': 'Sarapan'
    }

    const categoryDescriptions = {
      'main-course': 'Koleksi resep makanan utama yang lezat dan mengenyangkan',
      'dessert': 'Berbagai resep makanan penutup yang manis dan menggugah selera',
      'drink': 'Minuman segar dan hangat untuk berbagai suasana',
      'snack': 'Cemilan dan makanan ringan yang cocok untuk berbagai waktu',
      'breakfast': 'Menu sarapan bergizi untuk memulai hari dengan baik'
    }

    if (!categoryNames[slug]) {
      throw new Error('Category not found')
    }

    return {
      slug,
      name: categoryNames[slug],
      description: categoryDescriptions[slug]
    }
  }
}