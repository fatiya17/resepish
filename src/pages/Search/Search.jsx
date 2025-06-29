import React, { useState, useEffect, useRef } from 'react'
import { useRecipes } from '../../hooks/useRecipes'
import { Link } from 'react-router-dom'
import { categoryNames } from '../../constants/recipeConstants'
import styles from './Search.module.css'

function Search({ onSearch, searchQuery, placeholder = "Cari resep..." }) {
  const [query, setQuery] = useState(searchQuery || '')
  const [isOpen, setIsOpen] = useState(false)
  const [localResults, setLocalResults] = useState([])
  const [loading, setLoading] = useState(false)
  const { searchResults, searchRecipes, clearSearch } = useRecipes()
  const searchRef = useRef(null)
  const debounceRef = useRef(null)

  // Update local results when searchResults change from hook
  useEffect(() => {
    if (searchResults) {
      setLocalResults(searchResults)
    }
  }, [searchResults])

  // Handle search with debounce
  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(async () => {
      if (query.trim()) {
        setLoading(true)
        try {
          const results = await searchRecipes(query)
          setLocalResults(results || [])
        } catch (error) {
          console.error('Search error:', error)
          setLocalResults([])
        } finally {
          setLoading(false)
        }
      } else {
        setLocalResults([])
        clearSearch()
      }
    }, 300)

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current)
      }
    }
  }, [query, searchRecipes, clearSearch])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleInputChange = (e) => {
    const value = e.target.value
    setQuery(value)
    setIsOpen(value.length > 0)
    
    // Call parent onSearch if provided
    if (onSearch) {
      onSearch(value)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (query.trim()) {
      setIsOpen(false)
      // Trigger search
      if (onSearch) {
        onSearch(query)
      }
    }
  }

  const handleClear = () => {
    setQuery('')
    setLocalResults([])
    setIsOpen(false)
    clearSearch()
    if (onSearch) {
      onSearch('')
    }
  }

  const formatCategory = (category) => {
    return categoryNames[category] || category
  }

  // Handle image error with base64 placeholder
  const handleImageError = (e) => {
    e.target.src = `data:image/svg+xml;base64,${btoa(`
      <svg width="60" height="60" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#f8f9fa"/>
        <circle cx="30" cy="25" r="15" fill="#ff6b35" opacity="0.2"/>
        <text x="50%" y="70%" text-anchor="middle" dy=".3em" fill="#ff6b35" font-family="Arial, sans-serif" font-size="10" font-weight="600">
          Resep
        </text>
      </svg>
    `)}`;
    e.target.onError = null;
  }

  return (
    <div className={styles.searchContainer} ref={searchRef}>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.searchInputContainer}>
          <div className={styles.searchIcon}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="21 21l-4.35-4.35"></path>
            </svg>
          </div>
          
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => setIsOpen(query.length > 0)}
            placeholder={placeholder}
            className={styles.searchInput}
          />
          
          {query && (
            <button
              type="button"
              onClick={handleClear}
              className={styles.clearButton}
              aria-label="Hapus pencarian"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          )}
          
          <button type="submit" className={styles.searchButton}>
            Cari
          </button>
        </div>
      </form>

      {/* Search Dropdown Results */}
      {isOpen && query && (
        <div className={styles.searchDropdown}>
          {loading ? (
            <div className={styles.searchLoading}>
              <div className={styles.loadingSpinner}></div>
              <span>Mencari resep...</span>
            </div>
          ) : localResults && localResults.length > 0 ? (
            <>
              <div className={styles.searchHeader}>
                <span>Ditemukan {localResults.length} resep</span>
              </div>
              <div className={styles.searchResults}>
                {localResults.slice(0, 5).map((recipe) => (
                  <Link
                    key={recipe.id}
                    to={`/recipe/${recipe.id}`}
                    className={styles.searchResultItem}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className={styles.resultImage}>
                      <img 
                        src={recipe.image_url || recipe.image} 
                        alt={recipe.title}
                        onError={handleImageError}
                      />
                    </div>
                    <div className={styles.resultContent}>
                      <h4 className={styles.resultTitle}>{recipe.title}</h4>
                      <div className={styles.resultMeta}>
                        <span className={styles.resultCategory}>
                          {formatCategory(recipe.category)}
                        </span>
                        {recipe.cookingTime && (
                          <span className={styles.resultTime}>
                            {recipe.cookingTime} menit
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
              {localResults.length > 5 && (
                <div className={styles.searchFooter}>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className={styles.viewAllButton}
                  >
                    Lihat semua {localResults.length} resep
                  </button>
                </div>
              )}
            </>
          ) : query.trim() ? (
            <div className={styles.noResults}>
              <div className={styles.noResultsIcon}>🔍</div>
              <p>Tidak ada resep ditemukan untuk "{query}"</p>
              <span>Coba kata kunci yang berbeda</span>
            </div>
          ) : null}
        </div>
      )}
    </div>
  )
}

export default Search