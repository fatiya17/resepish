import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerContent}>
          
          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>company</h3>
            <ul className={styles.footerList}>
              <li>
                <Link to="/" className={styles.footerLink}>
                  home
                </Link>
              </li>
              <li>
                <Link to="/#summary" className={styles.footerLink}>
                  summary
                </Link>
              </li>
              <li>
                <Link to="/#recipes" className={styles.footerLink}>
                  recipe
                </Link>
              </li>
              <li>
                <Link to="/add-recipe" className={styles.footerLink}>
                  add recipe
                </Link>
              </li>
              <li>
                <Link to="/contact" className={styles.footerLink}>
                  contact us
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>Categori</h3>
            <ul className={styles.footerList}>
              <li>
                <Link to="/category/main-course" className={styles.footerLink}>
                  Resep Makanan Berat
                </Link>
              </li>
              <li>
                <Link to="/category/dessert" className={styles.footerLink}>
                  Resep Dessert
                </Link>
              </li>
              <li>
                <Link to="/category/drink" className={styles.footerLink}>
                  Resep Minuman
                </Link>
              </li>
              <li>
                <Link to="/category/snack" className={styles.footerLink}>
                  Resep Cemilan
                </Link>
              </li>
              <li>
                <Link to="/category/breakfast" className={styles.footerLink}>
                  Resep Sarapan
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles.footerSection}>
            <h3 className={styles.footerTitle}>follow us</h3>
            <div className={styles.socialLinks}>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaFacebookF />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaTwitter />
              </a>
              <a 
                href="https://www.instagram.com/dambelsbru_/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaInstagram />
              </a>
              <a 
                href="https://www.linkedin.com/in/fatiya-labibah-547252293/" 
                target="_blank" 
                rel="noopener noreferrer"
                className={styles.socialLink}
              >
                <FaLinkedinIn />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;