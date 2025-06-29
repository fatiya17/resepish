// Action types for Recipe Context
export const actionTypes = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_RECIPES: 'SET_RECIPES',
  ADD_RECIPES: 'ADD_RECIPES', // For pagination
  SET_CATEGORIES: 'SET_CATEGORIES',
  ADD_RECIPE: 'ADD_RECIPE',
  UPDATE_RECIPE: 'UPDATE_RECIPE',
  DELETE_RECIPE: 'DELETE_RECIPE',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  CLEAR_SEARCH: 'CLEAR_SEARCH',
  SET_PAGINATION: 'SET_PAGINATION'
}

// Initial state for Recipe Context
export const initialState = {
  recipes: [],
  categories: [],
  loading: false,
  error: null,
  searchResults: [],
  currentPage: 1,
  hasMore: false,
  total: 0
}

// Category names mapping
export const categoryNames = {
  'main-course': 'Makanan Utama',
  'dessert': 'Makanan Penutup',
  'drink': 'Minuman',
  'snack': 'Cemilan',
  'breakfast': 'Sarapan'
}

// Category descriptions
export const categoryDescriptions = {
  'main-course': 'Koleksi resep makanan utama yang lezat dan mengenyangkan untuk makan siang dan makan malam',
  'dessert': 'Berbagai resep makanan penutup yang manis dan menggugah selera untuk melengkapi hidangan Anda',
  'drink': 'Minuman segar dan hangat untuk berbagai suasana, dari minuman sehat hingga minuman spesial',
  'snack': 'Cemilan dan makanan ringan yang cocok untuk berbagai waktu, dari camilan sehat hingga kudapan istimewa',
  'breakfast': 'Menu sarapan bergizi untuk memulai hari dengan baik dan memberikan energi sepanjang hari'
}

// Category icons
export const categoryIcons = {
  'main-course': '🍽️',
  'dessert': '🍰',
  'drink': '🥤',
  'snack': '🍿',
  'breakfast': '🥞'
}

// Category colors for styling
export const categoryColors = {
  'main-course': 'bg-orange-100 text-orange-800',
  'dessert': 'bg-pink-100 text-pink-800',
  'drink': 'bg-blue-100 text-blue-800',
  'snack': 'bg-yellow-100 text-yellow-800',
  'breakfast': 'bg-green-100 text-green-800'
}

// Recipe categories for dropdowns
export const recipeCategories = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'main-course', label: 'Makanan Utama' },
  { value: 'dessert', label: 'Makanan Penutup' },
  { value: 'drink', label: 'Minuman' },
  { value: 'snack', label: 'Cemilan' },
  { value: 'breakfast', label: 'Sarapan' }
]

export const cookingTimes = [
  { value: 'all', label: 'Semua Waktu' },
  { value: '0-15', label: 'Di bawah 15 menit' },
  { value: '15-30', label: '15-30 menit' },
  { value: '30-60', label: '30-60 menit' },
  { value: '60+', label: 'Lebih dari 1 jam' }
]

export const defaultRecipeImage = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICA8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+CiAgPHRleHQgeD0iNTAlIiB5PSI1MCUiIHRleHQtYW5jaG9yPSJtaWRkbGUiIGR5PSIuM2VtIiBmaWxsPSIjOTk5IiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYiIGZvbnQtc2l6ZT0iMTYiPgogICAgTm8gSW1hZ2UKICA8L3RleHQ+Cjwvc3ZnPg=='

export default {
  actionTypes,
  initialState,
  categoryNames,
  categoryDescriptions,
  categoryIcons,
  categoryColors,
  recipeCategories,
  cookingTimes,
  defaultRecipeImage
}