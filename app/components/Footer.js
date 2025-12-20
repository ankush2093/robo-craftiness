'use client'

import React from "react";
import { config } from '../../lib/config';

const Footer = () => {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent('Hello! I would like to know more about Robo Craftiness courses.')
    window.open(`https://wa.me/${config.whatsappNumber.replace(/[^0-9]/g, '')}?text=${message}`, '_blank')
  }

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          {/* Logo & About */}
          <div className="footer-column footer-about">
            <a className="footer-logo" href="#">
              <img
                src="/images/logo_craftiness.png"
                alt={config.brandName}
                className="footer-logo-img"
              />
            </a>
            <p className="footer-tagline">{config.brandTagline}</p>
            <p className="footer-description">
              Empowering the next generation of innovators with cutting-edge robotics and AI education. 
              Learn from industry experts and build real-world projects.
            </p>
            <div className="footer-social-links">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link facebook"
                aria-label="Facebook"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link twitter"
                aria-label="Twitter"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link instagram"
                aria-label="Instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link linkedin"
                aria-label="LinkedIn"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link youtube"
                aria-label="YouTube"
              >
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h5 className="footer-heading">Quick Links</h5>
            <ul className="footer-links">
              <li><a href="#courses">Courses</a></li>
              <li><a href="#why-us">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#register">Register</a></li>
              <li><a href="#faq">FAQ</a></li>
            </ul>
          </div>

          {/* Courses */}
          <div className="footer-column">
            <h5 className="footer-heading">Our Courses</h5>
            <ul className="footer-links">
              <li><a href="#courses">IoT Technology</a></li>
              <li><a href="#courses">Robotics Technology</a></li>
              <li><a href="#why-us">Why Choose Us</a></li>
              <li><a href="#register">Student Registration</a></li>
              <li><a href="#contact">Get Support</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="footer-column footer-contact">
            <h5 className="footer-heading">Contact Us</h5>
            <ul className="footer-contact-list">
              <li>
                <i className="fas fa-envelope"></i>
                <a href="mailto:info@robocraftiness.com">info@robocraftiness.com</a>
              </li>
              <li>
                <i className="fas fa-phone-alt"></i>
                <a href={`tel:${config.whatsappNumber.replace(/[^0-9+]/g, '')}`}>
                  {config.whatsappNumber}
                </a>
              </li>
              <li className="whatsapp-item" onClick={handleWhatsAppClick}>
                <i className="fab fa-whatsapp"></i>
                <span>Chat on WhatsApp</span>
              </li>
              <li>
                <i className="fas fa-clock"></i>
                <span>Mon - Sat: 9:00 AM - 6:00 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © {new Date().getFullYear()} <span className="footer-brand">{config.brandName}</span>. All rights reserved.
            </p>
            <div className="footer-stats">
              <span className="footer-stat-item">
                <i className="fas fa-users"></i>
                {config.totalStudents} Students
              </span>
              <span className="footer-stat-item">
                <i className="fas fa-graduation-cap"></i>
                {config.enrolledStudents} Enrolled
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
