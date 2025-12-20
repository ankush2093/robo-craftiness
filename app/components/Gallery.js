'use client'

import React, { useState, useEffect } from 'react'
import '../../styles/gallery.css'

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(null)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)

  const galleryImages = [
    {
      id: 1,
      src: 'https://images-cdn.ubuy.com.ar/6575992a72363342d61cbb9d-eilik-a-desktop-companion-robot-with.jpg',
      alt: 'Robotics Workshop',
      title: 'Robotics Workshop'
    },
    {
      id: 2,
      src: 'https://kitbash3d.com/cdn/shop/products/SL_WEB_SET_GALLERY_5.jpg?v=1742318613&width=1900',
      alt: 'IoT Technology',
      title: 'IoT Technology'
    },
    {
      id: 3,
      src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSER3jqKZEjUuwp6ZWVmjiTXVSvRndtKHV8tg&s',
      alt: 'Students Learning',
      title: 'Students Learning'
    },
    {
      id: 4,
      src: 'https://substackcdn.com/image/fetch/$s_!8lqM!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2Fc709a39d-f7ed-489f-ac83-18d39d71f9cf_1280x854.jpeg',
      alt: 'Hands-on Training',
      title: 'Hands-on Training'
    },
    {
      id: 5,
      src: 'https://img.freepik.com/premium-photo/young-man-woman-vr-glasses-doing-experiments-robotics-laboratory-robot_1268-23367.jpg?semt=ais_hybrid&w=740&q=80',
      alt: 'Project Showcase',
      title: 'Project Showcase'
    },
    {
      id: 6,
      src: 'https://assets.rebelmouse.io/eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpbWFnZSI6Imh0dHBzOi8vYXNzZXRzLnJibC5tcy8yMzU2MDkzNi9vcmlnaW4uanBnIiwiZXhwaXJlc19hdCI6MTgwNzA5MTEzOX0.R4R-UcqO-5uoeOykZLN8TNNfKUy3qUYVoH9mEH12DTQ/img.jpg?width=980',
      alt: 'Expert Sessions',
      title: 'Expert Sessions'
    }
  ]

  const openLightbox = (index) => {
    setCurrentIndex(index)
    setIsLightboxOpen(true)
  }

  const closeLightbox = () => {
    setIsLightboxOpen(false)
    setCurrentIndex(null)
  }

  const nextImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length)
  }

  const prevImage = (e) => {
    e.stopPropagation()
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length)
  }

  // Keyboard navigation
  useEffect(() => {
    if (!isLightboxOpen) return

    const handleKeyPress = (e) => {
      if (e.key === 'Escape') {
        setIsLightboxOpen(false)
        setCurrentIndex(null)
      } else if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => {
          if (prev === null) return 0
          return (prev + 1) % galleryImages.length
        })
      } else if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => {
          if (prev === null) return 0
          return (prev - 1 + galleryImages.length) % galleryImages.length
        })
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isLightboxOpen, galleryImages.length])

  return (
    <>
      <section id="gallery" className="gallery-section">
        <div className="container">
          <div className="gallery-header">
            <h2 className="gallery-title">Photo &nbsp;<span className="gallery-title-highlight">Gallery</span></h2>
          </div>

          <div className="home_gallery-wrapper">
            <div className="home_gallery-grid">
              {galleryImages.map((image, index) => (
                <div 
                  key={image.id} 
                  className="home_gallery-item"
                  data-index={index}
                  onClick={() => openLightbox(index)}
                >
                  <img 
                    src={image.src} 
                    alt={image.alt}
                    loading="lazy"
                  />
                  <div className="home_gallery-overlay">
                    <div className="home_gallery-title">{image.title}</div>
                  </div>
                  <i className="fas fa-search-plus home_gallery-icon"></i>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <div 
        className={`home_gallery-lightbox ${isLightboxOpen ? 'active' : ''}`}
        onClick={closeLightbox}
      >
        {isLightboxOpen && currentIndex !== null && (
          <div className="home_gallery-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <button className="home_gallery-lightbox-close" onClick={closeLightbox}>
              <i className="fas fa-times"></i>
            </button>
            <button className="home_gallery-lightbox-nav home_gallery-lightbox-prev" onClick={prevImage}>
              <i className="fas fa-chevron-left"></i>
            </button>
            <button className="home_gallery-lightbox-nav home_gallery-lightbox-next" onClick={nextImage}>
              <i className="fas fa-chevron-right"></i>
            </button>
            <div className="home_gallery-lightbox-counter">
              {currentIndex + 1} / {galleryImages.length}
            </div>
            <img 
              src={galleryImages[currentIndex].src} 
              alt={galleryImages[currentIndex].alt}
              className="home_gallery-lightbox-image"
            />
          </div>
        )}
      </div>
    </>
  )
}

export default Gallery