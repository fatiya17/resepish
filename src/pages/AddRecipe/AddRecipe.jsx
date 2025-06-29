import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm';
import { useNavigate } from 'react-router-dom';
import styles from './AddRecipe.module.css';

function AddRecipe() {
  const navigate = useNavigate();

  const handleRecipeAdded = (newRecipe) => {
    try {
      // Mapping kategori ke URL yang tepat
      const categoryUrlMappings = {
        'Makanan Berat': 'main-course',
        'Dessert': 'dessert',
        'Minuman': 'minuman', 
        'Cemilan': 'cemilan',
        'Sarapan': 'sarapan'
      };
      
      const categoryPath = categoryUrlMappings[newRecipe.category] || 
                          newRecipe.category.toLowerCase().replace(/ /g, '-');
      
      // navigasi ke sesuai kategorinya
      navigate(`/category/${categoryPath}`);
      
    } catch (error) {
      console.error('Error handling added recipe:', error);
    }
  };

  return (
    <div className={styles.addRecipe}>
      <div className={styles.container}>
        <AddRecipeForm onAddRecipe={handleRecipeAdded} />
      </div>
    </div>
  );
}

export default AddRecipe;