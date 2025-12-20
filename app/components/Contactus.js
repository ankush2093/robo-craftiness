'use client'

import React from 'react'
import { config } from '../../lib/config'

const Contactus = () => {
  // Contact information - you can update these
  const contactInfo = {
    email: 'info@robocraftiness.com',
    phone: '+91 9060215620',
    whatsapp: config.whatsappNumber,
    address: '123 Innovation Street, Tech City, India',
    workingHours: 'Mon - Sat: 9:00 AM - 6:00 PM'
  }

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I would like to get in touch with Robo Craftiness.')
    window.open(`https://wa.me/${contactInfo.whatsapp.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
  }

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="contact-header">
          <h2 className="contact-title">Get In <span className="contact-title-highlight">Touch</span></h2>
          <p className="contact-subtitle">We'd love to hear from you. Reach out to us through any of these channels.</p>
        </div>

        <div className="contact-grid">
          {/* Email Card */}
          <div className="contact-card email-card">
            <div className="contact-card-icon email-icon">
              <i className="fas fa-envelope"></i>
            </div>
            <div className="contact-card-content">
              <h3 className="contact-card-title">Email Us</h3>
              <p className="contact-card-description">Send us an email anytime</p>
              <a 
                href={`mailto:${contactInfo.email}`}
                className="contact-link email-link"
              >
                {contactInfo.email}
              </a>
            </div>
            <div className="contact-card-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>

          {/* Phone Card */}
          <div className="contact-card phone-card">
            <div className="contact-card-icon phone-icon">
              <i className="fas fa-phone-alt"></i>
            </div>
            <div className="contact-card-content">
              <h3 className="contact-card-title">Call Us</h3>
              <p className="contact-card-description">Speak with our team</p>
              <a 
                href={`tel:${contactInfo.phone.replace(/[^0-9+]/g, '')}`}
                className="contact-link phone-link"
              >
                {contactInfo.phone}
              </a>
            </div>
            <div className="contact-card-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>

          {/* WhatsApp Card */}
          <div className="contact-card whatsapp-card" onClick={handleWhatsAppClick}>
            <div className="contact-card-icon whatsapp-icon">
              <i className="fab fa-whatsapp"></i>
            </div>
            <div className="contact-card-content">
              <h3 className="contact-card-title">WhatsApp</h3>
              <p className="contact-card-description">Chat with us instantly</p>
              <span className="contact-link whatsapp-link">
                {contactInfo.whatsapp}
              </span>
            </div>
            <div className="contact-card-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>

          {/* Address Card */}
          <div className="contact-card address-card">
            <div className="contact-card-icon address-icon">
              <i className="fas fa-map-marker-alt"></i>
            </div>
            <div className="contact-card-content">
              <h3 className="contact-card-title">Visit Us</h3>
              <p className="contact-card-description">Our office location</p>
              <p className="contact-link address-link">
                {contactInfo.address}
              </p>
            </div>
            <div className="contact-card-arrow">
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="contact-footer">
          <div className="contact-footer-item">
            <i className="fas fa-clock"></i>
            <span>{contactInfo.workingHours}</span>
          </div>
          <div className="contact-footer-item">
            <i className="fas fa-headset"></i>
            <span>24/7 Support Available</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contactus