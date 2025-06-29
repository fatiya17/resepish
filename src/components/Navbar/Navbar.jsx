import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './Navbar.module.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Menu items dengan routing paths
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Add Recipe', path: '/add-recipe' },
    { name: 'Makanan Berat', path: '/category/main-course' },
    { name: 'Dessert', path: '/category/dessert' },
    { name: 'Minuman', path: '/category/drink' },
    { name: 'Cemilan', path: '/category/snack' },
    { name: 'Sarapan', path: '/category/breakfast' }
  ];

  return (
    <nav className={styles.navbar}>
      {/* Logo dengan gambar */}
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        <img 
          src="/images/resepish_logo.png" 
          alt="Resepish Logo" 
          className={styles.logoImage}
        />
        <span className={styles.logoText}>Resepish</span>
      </Link>

      {/* Mobile Menu Toggle - Hamburger */}
      <div 
        className={`${styles.toggleMenu} ${isMenuOpen ? styles.active : ''}`} 
        onClick={toggleMenu}
      >
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Navigation Menu */}
      <ul className={`${styles.navbarNav} ${isMenuOpen ? styles.show : ''}`}>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={`${styles.navLink} ${
                location.pathname === item.path ? styles.active : ''
              }`}
              onClick={closeMenu}
            >
              {item.name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Overlay untuk mobile */}
      {isMenuOpen && (
        <div className={styles.overlay} onClick={closeMenu}></div>
      )}
    </nav>
  );
}

export default Navbar;