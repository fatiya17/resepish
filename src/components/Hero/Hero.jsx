import React, { useState } from 'react';
import styles from './Hero.module.css';

const Hero = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchTerm);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };

  return (
    <section className={styles.heroSection}>
      <div className={styles.sectionContent}>
        <div className={styles.heroDetails}>
          <div className={styles.leftSide}>
            <h1 className={styles.title}>Temukan Resep Favoritmu!</h1>
            <p className={styles.description}>
              Jelajahi berbagai resep lezat untuk inspirasi memasakmu.
            </p>
            <form className={styles.searchBar} onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Cari resep..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button type="submit">Cari Resep</button>
            </form>
          </div>
          <div className={styles.rightSide}>
            <div className={styles.heroImageWrapper}>
              <img src="/images/mommy-cook.png" alt="Hero" className={styles.heroImage} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;