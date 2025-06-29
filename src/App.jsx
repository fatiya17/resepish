import { Routes, Route } from 'react-router-dom'
import { RecipeProvider } from './context/RecipeProvider'
import Layout from './layout'
import Home from './pages/Home/Home'
import AddRecipe from './pages/AddRecipe/AddRecipe'
import RecipeDetail from './pages/RecipeDetail/RecipeDetail'
import Category from './pages/Category/Category'
import './App.css';

function App() {
  return (
    <RecipeProvider>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/category/:categoryName" element={<Category />} />
        </Routes>
      </Layout>
    </RecipeProvider>
  )
}

export default App;