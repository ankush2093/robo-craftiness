'use client'

import React, { useState, useEffect } from 'react'

const MobileBottomNav = () => {
  const [activeTab, setActiveTab] = useState('home')

  useEffect(() => {
    // Detect current section and set active tab
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 100

      // Check if at top (home)
      if (window.scrollY < 200) {
        setActiveTab('home')
        return
      }

      // Check other sections
      const sections = [
        { id: 'courses', selector: '#courses' },
        { id: 'about', selector: '#why-us, #about-us' },
        { id: 'contact', selector: '#contact' }
      ]

      for (const section of sections) {
        const elements = document.querySelectorAll(section.selector)
        for (const element of elements) {
          if (element) {
            const { offsetTop, offsetHeight } = element
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveTab(section.id)
              return
            }
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check on mount
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    {
      id: 'home',
      icon: 'fas fa-home',
      label: 'Home',
      href: '#'
    },
    {
      id: 'courses',
      icon: 'fas fa-search',
      label: 'Explore',
      href: '#courses'
    },
    {
      id: 'about',
      icon: 'fas fa-user',
      label: 'Profile',
      href: '#why-us'
    },
    {
      id: 'contact',
      icon: 'fas fa-shopping-cart',
      label: 'Cart',
      href: '#contact'
    }
  ]

  const handleNavClick = (e, item) => {
    e.preventDefault()
    setActiveTab(item.id)
    if (item.href && item.href !== '#') {
      const element = document.querySelector(item.href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map((item) => (
        <a
          key={item.id}
          href={item.href}
          className={`mobile-bottom-nav-item ${activeTab === item.id ? 'active' : ''}`}
          onClick={(e) => handleNavClick(e, item)}
        >
          <i className={item.icon}></i>
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  )
}

export default MobileBottomNav

