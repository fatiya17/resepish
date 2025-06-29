import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { recipeService } from '../../services/recipeService'
import styles from './RecipeDetail.module.css'

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        setLoading(true)
        setError(null)
        const foundRecipe = await recipeService.getRecipeById(id)
        setRecipe(foundRecipe)
      } catch (err) {
        setError(err.message)
        console.error('Error fetching recipe:', err)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchRecipe()
    }
  }, [id])

  if (loading) {
    return (
      <div className={styles.recipeDetail}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.loadingText}>Loading recipe...</div>
          </div>
        </div>
      </div>
    )
  }

  if (error || !recipe) {
    return (
      <div className={styles.recipeDetail}>
        <div className={styles.container}>
          <div className={styles.loading}>
            <div className={styles.notFound}>
              <div className={styles.notFoundIcon}>🔍</div>
              <h2>Recipe not found</h2>
              <p>{error || "The recipe you're looking for doesn't exist."}</p>
              <Link to="/" className={styles.backButton}>
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Format ingredients dan steps untuk display
  const formatIngredients = (ingredients) => {
    if (!ingredients) return [];
    if (Array.isArray(ingredients)) return ingredients;
    // Jika ingredients adalah string, split by newline atau bullet points
    return ingredients.split('\n').map(item => item.replace(/^[•\-*]\s*/, '').trim()).filter(item => item);
  };

  const formatSteps = (steps) => {
    if (!steps) return [];
    if (Array.isArray(steps)) return steps;
    // Split steps by numbers or newlines
    return steps.split(/\n|\d+\./).map(step => step.trim()).filter(step => step);
  };

  const ingredientsList = formatIngredients(recipe.ingredients);
  const stepsList = formatSteps(recipe.instructions || recipe.steps);

  return (
    <div className={styles.recipeDetail}>
      <div className={styles.container}>
        {/* Back Button */}
        <div className={styles.backButtonContainer}>
          <Link to="/" className={styles.backButton}>
            ← Back to Recipes
          </Link>
        </div>

        <div className={styles.recipeContent}>
          {/* Image Section */}
          <div className={styles.imageSection}>
            <img 
              src={recipe.image_url || recipe.image} 
              alt={recipe.title} 
              className={styles.image}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x300?text=Recipe+Image';
              }}
            />
          </div>

          {/* Content Section */}
          <div className={styles.content}>
            <h1 className={styles.title}>{recipe.title}</h1>
            
            {/* Meta Information */}
            <div className={styles.metaInfo}>
              <span className={styles.category}>
                📂 {recipe.category}
              </span>
              <span className={styles.time}>
                ⏱️ {recipe.cookingTime || recipe.time} menit
              </span>
              {recipe.created_at && (
                <span className={styles.date}>
                  📅 {new Date(recipe.created_at).toLocaleDateString('id-ID')}
                </span>
              )}
            </div>

            {/* Description */}
            {recipe.description && (
              <div className={`${styles.section} ${styles.description}`}>
                <h3 className={styles.sectionTitle}>Deskripsi</h3>
                <p>{recipe.description}</p>
              </div>
            )}

            {/* Ingredients */}
            {ingredientsList.length > 0 && (
              <div className={`${styles.section} ${styles.ingredients}`}>
                <h3 className={styles.sectionTitle}>Bahan-bahan</h3>
                <ul className={styles.ingredientsList}>
                  {ingredientsList.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Steps */}
            {stepsList.length > 0 && (
              <div className={`${styles.section} ${styles.instructions}`}>
                <h3 className={styles.sectionTitle}>Langkah-langkah</h3>
                <ol className={styles.stepsList}>
                  {stepsList.map((step, index) => (
                    <li key={index} className={styles.step}>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {/* Additional Info */}
            <div className={styles.additionalInfo}>
              <div className={styles.tags}>
                <span className={styles.tag}>#{recipe.category.replace(/ /g, '')}</span>
                {recipe.cookingTime && (
                  <span className={styles.tag}>#{recipe.cookingTime}menit</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RecipeDetail