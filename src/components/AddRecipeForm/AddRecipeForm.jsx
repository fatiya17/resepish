import React, { useState } from 'react';
import { recipeService } from '../../services/recipeService';
import { useRecipeContext } from '../../hooks/useRecipes';
import styles from './AddRecipeForm.module.css';

const AddRecipeForm = ({ onAddRecipe }) => {
  const { fetchRecipes } = useRecipeContext();

  const [formData, setFormData] = useState({
    name: '',
    ingredients: '',
    steps: '',
    category: '',
    time: '',
    image: '',
    description: '',
  });

  const [imagePreview, setImagePreview] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validasi ukuran file (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, image: 'Ukuran file maksimal 5MB' });
        return;
      }

      // Validasi tipe file
      if (!file.type.startsWith('image/')) {
        setErrors({ ...errors, image: 'File harus berupa gambar' });
        return;
      }

      // Clear error jika ada
      if (errors.image) {
        setErrors({ ...errors, image: '' });
      }

      // Simpan file untuk upload nanti
      setSelectedFile(file);

      // Buat preview
      const imageURL = URL.createObjectURL(file);
      setImagePreview(imageURL);
      setFormData({ ...formData, image: '' }); // Clear URL input
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Nama resep wajib diisi';
    if (!formData.ingredients.trim()) newErrors.ingredients = 'Bahan-bahan wajib diisi';
    if (!formData.steps.trim()) newErrors.steps = 'Langkah-langkah wajib diisi';
    if (!formData.category) newErrors.category = 'Kategori wajib dipilih';
    if (!formData.time.trim()) newErrors.time = 'Waktu memasak wajib diisi';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Convert time to number
      const timeInMinutes = parseInt(formData.time) || 0;

      // Mapping kategori Indonesian ke format database (English)
      const categoryMapping = {
        'Makanan Berat': 'main-course',
        'Dessert': 'dessert',
        'Minuman': 'drink',
        'Cemilan': 'snack',
        'Sarapan': 'breakfast'
      };

      let imageUrl = `data:image/svg+xml;base64,${btoa(`
        <svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
          <rect width="100%" height="100%" fill="#f8f8f8"/>
          <text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#666" font-family="Arial, sans-serif" font-size="14">
            Recipe Image
          </text>
        </svg>
      `)}`;

      // Handle image upload
      if (selectedFile) {
        try {
          // Generate unique filename
          const timestamp = Date.now();
          const fileName = `recipe-${timestamp}-${selectedFile.name.replace(/[^a-zA-Z0-9.-]/g, '')}`;

          // Upload to Supabase Storage
          imageUrl = await recipeService.uploadImage(selectedFile, fileName);
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          setErrors({ submit: 'Gagal mengupload gambar. Silakan coba lagi.' });
          return;
        }
      } else if (formData.image && formData.image.startsWith('http')) {
        // Gunakan URL yang diinput manual
        imageUrl = formData.image;
      }

      // Mapping dari form ke struktur tabel Supabase
      const newRecipe = {
        title: formData.name.trim(),
        category: categoryMapping[formData.category] || formData.category.toLowerCase(),
        cookingTime: timeInMinutes,
        image_url: imageUrl,
        ingredients: formData.ingredients.trim(),
        instructions: formData.steps.trim(),
        description: formData.description.trim() || null
      };

      // Save to Supabase
      const savedRecipe = await recipeService.addRecipe(newRecipe);

      // Refresh recipes data in context
      await fetchRecipes();

      // Call parent callback if provided
      if (onAddRecipe) {
        onAddRecipe(savedRecipe);
      }

      // Reset form
      setFormData({
        name: '',
        ingredients: '',
        steps: '',
        category: '',
        time: '',
        image: '',
        description: '',
      });
      setImagePreview('');
      setSelectedFile(null);
      setErrors({});

      // Show success message
      alert('Resep berhasil ditambahkan!');

    } catch (error) {
      console.error('❌ Error adding recipe:', error);
      console.error('Error details:', error.message);

      // More specific error messages
      let errorMessage = 'Gagal menambahkan resep. ';
      if (error.message.includes('duplicate')) {
        errorMessage += 'Resep dengan nama ini sudah ada.';
      } else if (error.message.includes('foreign key')) {
        errorMessage += 'Kategori tidak valid.';
      } else if (error.message.includes('not null')) {
        errorMessage += 'Ada field wajib yang kosong.';
      } else if (error.message.includes('id')) {
        errorMessage += 'Masalah dengan ID field.';
      } else {
        errorMessage += `Detail error: ${error.message}`;
      }

      setErrors({ submit: errorMessage });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.resepContainer}>
      <h1 className={styles.resepTitle}>Tambah Resep</h1>
      <form onSubmit={handleSubmit} className={styles.resepFormWrapper}>
        <div className={styles.resepFormLeft}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Nama Resep *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`${styles.formInput} ${errors.name ? styles.error : ''}`}
              placeholder="Masukkan nama resep"
              disabled={isSubmitting}
            />
            {errors.name && <span className={styles.errorText}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Deskripsi</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className={styles.formTextarea}
              placeholder="Deskripsi singkat tentang resep ini (opsional)"
              rows="2"
              disabled={isSubmitting}
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Bahan-bahan *</label>
            <textarea
              name="ingredients"
              value={formData.ingredients}
              onChange={handleInputChange}
              className={`${styles.formTextarea} ${errors.ingredients ? styles.error : ''}`}
              placeholder="Contoh: 
- 2 cup nasi putih
- 3 butir telur
- 2 siung bawang putih
- 1 sdm kecap manis
- garam dan merica secukupnya"
              rows="5"
              disabled={isSubmitting}
            />
            {errors.ingredients && <span className={styles.errorText}>{errors.ingredients}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Langkah-langkah *</label>
            <textarea
              name="steps"
              value={formData.steps}
              onChange={handleInputChange}
              className={`${styles.formTextarea} ${errors.steps ? styles.error : ''}`}
              placeholder="Contoh:
1. Panaskan minyak dalam wajan
2. Tumis bawang putih hingga harum
3. Masukkan telur, orak-arik
4. Tambahkan nasi dan kecap manis
5. Aduk rata dan sajikan"
              rows="6"
              disabled={isSubmitting}
            />
            {errors.steps && <span className={styles.errorText}>{errors.steps}</span>}
          </div>
        </div>

        <div className={styles.resepFormRight}>
          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Kategori *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className={`${styles.formInput} ${errors.category ? styles.error : ''}`}
              disabled={isSubmitting}
            >
              <option value="" disabled>Pilih Kategori</option>
              <option value="Makanan Berat">Makanan Berat</option>
              <option value="Minuman">Minuman</option>
              <option value="Cemilan">Cemilan</option>
              <option value="Dessert">Dessert</option>
              <option value="Sarapan">Sarapan</option>
            </select>
            {errors.category && <span className={styles.errorText}>{errors.category}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Waktu Memasak (menit) *</label>
            <input
              type="number"
              name="time"
              value={formData.time}
              onChange={handleInputChange}
              className={`${styles.formInput} ${errors.time ? styles.error : ''}`}
              placeholder="Contoh: 30"
              min="1"
              disabled={isSubmitting}
            />
            {errors.time && <span className={styles.errorText}>{errors.time}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.formLabel}>Upload Gambar atau URL Gambar</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className={styles.formInput}
              disabled={isSubmitting}
            />
            {errors.image && <span className={styles.errorText}>{errors.image}</span>}

            <div style={{ margin: '10px 0', textAlign: 'center', color: '#666' }}>atau</div>

            <input
              type="url"
              name="imageUrl"
              placeholder="Masukkan URL gambar (contoh: https://example.com/image.jpg)"
              className={styles.formInput}
              value={formData.image}
              onChange={(e) => {
                setFormData({ ...formData, image: e.target.value });
                setImagePreview(e.target.value);
                setSelectedFile(null); // Clear file jika ada URL
              }}
              disabled={isSubmitting}
            />
          </div>

          {imagePreview && (
            <div className={styles.imagePreviewWrapper}>
              <p className={styles.formLabel}>Preview Gambar:</p>
              <img
                src={imagePreview}
                alt="Preview"
                className={styles.imagePreview}
                style={{ maxWidth: '100%', borderRadius: '8px', marginTop: '8px' }}
              />
            </div>
          )}

          {errors.submit && (
            <div className={styles.errorText} style={{ marginBottom: '16px', backgroundColor: '#fee', padding: '10px', borderRadius: '4px' }}>
              {errors.submit}
            </div>
          )}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Menambahkan...' : 'Tambah Resep'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRecipeForm;