// ini sudah tida digunakan karena sudah menggunakan API dari supabase

// // Data terpisah per kategori (tetap ada untuk kemudahan)
// export const recipesNasi = [
//   { 
//     id: 1,
//     title: 'Nasi Goreng Sapi', 
//     category: 'main-course', 
//     cookingTime: 30, 
//     image: '/images/nasi goreng sapi.webp',
//     description: 'Nasi goreng dengan daging sapi yang gurih dan lezat',
//     ingredients: ['Nasi putih', 'Daging sapi', 'Bawang merah', 'Bawang putih', 'Kecap manis'],
//     instructions: 'Tumis bumbu hingga harum, masukkan daging sapi, lalu tambahkan nasi dan kecap manis.'
//   },
//   { 
//     id: 2,
//     title: 'Nasi Uduk', 
//     category: 'main-course', 
//     cookingTime: 30, 
//     image: '/images/nasi uduk.jpg',
//     description: 'Nasi yang dimasak dengan santan dan rempah-rempah',
//     ingredients: ['Beras', 'Santan', 'Daun pandan', 'Garam', 'Serai'],
//     instructions: 'Masak beras dengan santan, daun pandan, dan rempah hingga matang dan harum.'
//   },
//   { 
//     id: 3,
//     title: 'Nasi Kebuli', 
//     category: 'main-course', 
//     cookingTime: 30, 
//     image: '/images/nasi kebuli.png',
//     description: 'Nasi berbumbu khas Timur Tengah dengan daging kambing',
//     ingredients: ['Beras', 'Daging kambing', 'Susu', 'Rempah kebuli'],
//     instructions: 'Masak nasi dengan kaldu daging dan rempah kebuli hingga harum.'
//   },
//   { 
//     id: 4,
//     title: 'Nasi Kuning', 
//     category: 'main-course', 
//     cookingTime: 30, 
//     image: '/images/nasi kunang.jpg',
//     description: 'Nasi kuning dengan kunyit dan santan',
//     ingredients: ['Beras', 'Kunyit', 'Santan', 'Daun jeruk', 'Lengkuas'],
//     instructions: 'Masak beras dengan kunyit, santan, dan rempah hingga berwarna kuning dan harum.'
//   },
// ];

// export const recipesDessert = [
//   { 
//     id: 5,
//     title: 'Pancake', 
//     category: 'dessert', 
//     cookingTime: 30, 
//     image: '/images/pancake.jpeg',
//     description: 'Pancake lembut dan manis dengan sirup maple',
//     ingredients: ['Tepung terigu', 'Telur', 'Susu', 'Gula', 'Baking powder'],
//     instructions: 'Campur semua bahan, aduk rata, lalu panggang di teflon hingga kecokelatan.'
//   },
//   { 
//     id: 6,
//     title: 'Cheesecake', 
//     category: 'dessert', 
//     cookingTime: 33, 
//     image: '/images/cheescake.jpg',
//     description: 'Cheesecake creamy dengan base biskuit',
//     ingredients: ['Cream cheese', 'Gula', 'Telur', 'Biskuit marie', 'Mentega'],
//     instructions: 'Buat base dari biskuit, buat filling cheese, lalu panggang dalam oven.'
//   },
//   { 
//     id: 7,
//     title: 'Puding Caramel', 
//     category: 'dessert', 
//     cookingTime: 20, 
//     image: '/images/puding karamel.jpg',
//     description: 'Puding dengan saus karamel yang manis',
//     ingredients: ['Susu', 'Telur', 'Gula', 'Agar-agar', 'Vanilla'],
//     instructions: 'Buat karamel, lalu buat puding dan kukus hingga set.'
//   },
//   { 
//     id: 8,
//     title: 'Panna Cotta', 
//     category: 'dessert', 
//     cookingTime: 30, 
//     image: '/images/panna cotta.jpg',
//     description: 'Dessert Italia yang lembut dan creamy',
//     ingredients: ['Heavy cream', 'Gula', 'Gelatin', 'Vanilla', 'Buah berry'],
//     instructions: 'Panaskan cream dengan gula, tambahkan gelatin, dinginkan hingga set.'
//   },
// ];

// export const recipesMinuman = [
//   { 
//     id: 9,
//     title: 'Strawberry Milk Shake', 
//     category: 'drink', 
//     cookingTime: 10, 
//     image: '/images/Strawberry Milkshake.webp',
//     description: 'Milkshake strawberry yang segar dan creamy',
//     ingredients: ['Strawberry', 'Susu', 'Es krim vanilla', 'Gula', 'Es batu'],
//     instructions: 'Blender semua bahan hingga halus dan creamy.'
//   },
//   { 
//     id: 10,
//     title: 'Hazelnut Latte', 
//     category: 'drink', 
//     cookingTime: 13, 
//     image: '/images/hazelnut latte.jpg',
//     description: 'Kopi latte dengan aroma hazelnut yang harum',
//     ingredients: ['Espresso', 'Susu', 'Sirup hazelnut', 'Whipped cream'],
//     instructions: 'Seduh espresso, panaskan susu, campur dengan sirup hazelnut.'
//   },
//   { 
//     id: 11,
//     title: 'Banana Coffee Smoothie', 
//     category: 'drink', 
//     cookingTime: 12, 
//     image: '/images/banana coffe smothie.jpg',
//     description: 'Smoothie pisang dengan kopi yang energizing',
//     ingredients: ['Pisang', 'Kopi dingin', 'Susu', 'Madu', 'Es batu'],
//     instructions: 'Blender pisang dengan kopi dingin dan susu hingga halus.'
//   },
//   { 
//     id: 12,
//     title: 'Avocado Coffee', 
//     category: 'drink', 
//     cookingTime: 10, 
//     image: '/images/avocado coffe.jpg',
//     description: 'Minuman unik kombinasi alpukat dan kopi',
//     ingredients: ['Alpukat', 'Kopi hitam', 'Susu kental manis', 'Es batu'],
//     instructions: 'Blender alpukat dengan kopi dan susu kental manis.'
//   },
// ];

// export const recipesCemilan = [
//   { 
//     id: 13,
//     title: 'Dimsum Mentai', 
//     category: 'snack', 
//     cookingTime: 10, 
//     image: '/images/dimsum mentai.jpg',
//     description: 'Dimsum dengan topping saus mentai yang gurih',
//     ingredients: ['Kulit dimsum', 'Udang', 'Saus mentai', 'Keju', 'Telur puyuh'],
//     instructions: 'Isi kulit dimsum dengan udang, kukus, lalu beri topping mentai dan panggang.'
//   },
//   { 
//     id: 14,
//     title: 'Risol Mayo', 
//     category: 'snack', 
//     cookingTime: 7, 
//     image: '/images/risol mayo.jpg',
//     description: 'Risol dengan isian sayuran dan mayonaise',
//     ingredients: ['Kulit lumpia', 'Wortel', 'Kubis', 'Mayonaise', 'Daging ayam'],
//     instructions: 'Tumis isian, bungkus dengan kulit lumpia, goreng hingga kecokelatan.'
//   },
//   { 
//     id: 15,
//     title: 'Cilok Saus Kacang', 
//     category: 'snack', 
//     cookingTime: 12, 
//     image: '/images/cilok saus kacang.jpg',
//     description: 'Cilok kenyal dengan saus kacang yang gurih',
//     ingredients: ['Tepung tapioka', 'Kacang tanah', 'Cabai', 'Gula merah', 'Garam'],
//     instructions: 'Buat adonan cilok, rebus hingga mengapung, sajikan dengan saus kacang.'
//   },
//   { 
//     id: 16,
//     title: 'Telur Gulung', 
//     category: 'snack', 
//     cookingTime: 5, 
//     image: '/images/telur gulung.jpg',
//     description: 'Telur dadar yang digulung dengan isian',
//     ingredients: ['Telur', 'Tepung terigu', 'Daun bawang', 'Garam', 'Merica'],
//     instructions: 'Kocok telur dengan bumbu, buat dadar tipis, gulung selagi hangat.'
//   },
// ];

// export const recipesSarapan = [
//   { 
//     id: 17,
//     title: 'Roti Bakar', 
//     category: 'breakfast', 
//     cookingTime: 6, 
//     image: '/images/roti bakar.jpg',
//     description: 'Roti bakar dengan berbagai topping',
//     ingredients: ['Roti tawar', 'Mentega', 'Selai', 'Keju', 'Susu kental manis'],
//     instructions: 'Panggang roti hingga kecokelatan, olesi dengan mentega dan topping.'
//   },
//   { 
//     id: 18,
//     title: 'Bubur Ayam', 
//     category: 'breakfast', 
//     cookingTime: 10, 
//     image: '/images/bubur ayam.jpeg',
//     description: 'Bubur ayam dengan kuah kaldu yang gurih',
//     ingredients: ['Beras', 'Ayam', 'Daun bawang', 'Seledri', 'Bawang goreng'],
//     instructions: 'Masak beras hingga lembek, rebus ayam, sajikan dengan pelengkap.'
//   },
//   { 
//     id: 19,
//     title: 'Omelet', 
//     category: 'breakfast', 
//     cookingTime: 7, 
//     image: '/images/omelet.webp',
//     description: 'Omelet lembut dengan isian sayuran',
//     ingredients: ['Telur', 'Susu', 'Paprika', 'Bawang bombay', 'Keju'],
//     instructions: 'Kocok telur dengan susu, masak dengan isian sayuran, lipat menjadi dua.'
//   },
//   { 
//     id: 20,
//     title: 'Lontong Sayur', 
//     category: 'breakfast', 
//     cookingTime: 10, 
//     image: '/images/lontong sayur.webp',
//     description: 'Lontong dengan sayur santan yang kaya rasa',
//     ingredients: ['Lontong', 'Santan', 'Labu siam', 'Tahu', 'Tempe'],
//     instructions: 'Masak sayuran dengan santan dan bumbu, sajikan dengan lontong.'
//   },
// ];

// // Gabungkan semua resep menjadi satu array
// const allRecipes = [
//   ...recipesNasi,
//   ...recipesDessert,
//   ...recipesMinuman,
//   ...recipesCemilan,
//   ...recipesSarapan
// ];

// // Export default untuk kemudahan import
// export default allRecipes;

// // Export juga sebagai named export
// export { allRecipes as recipes };