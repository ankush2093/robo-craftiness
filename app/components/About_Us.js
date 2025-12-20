'use client'

import React from 'react'
import { config } from '../../lib/config'
import '../../styles/about-us.css'

const About_Us = () => {
  const aboutImage = 'https://letsgrowmore.in/wp-content/uploads/2021/05/undraw_voice_interface_eckp.png'

 

  const stats = [
    { number: '15K+', label: 'Students Enrolled' },
    { number: '12+', label: 'Expert Instructors' },
    { number: '50+', label: 'Projects Completed' },
    { number: '98%', label: 'Success Rate' }
  ]

  return (
    <section id="about-us" className="about-us-section">
      <div className="container">
        <div className="about-us-content">
          {/* Left Side - Content */}
          <div className="about-us-text">
            <div className="about-us-header">
              <span className="about-us-badge">About {config.brandName}</span>
              <h2 className="about-us-title text-white">
                Empowering the Next Generation of <span className="about-us-title-highlight">Innovators</span>
              </h2>
              <p className="about-us-description">
                At {config.brandName}, we are passionate about making cutting-edge robotics and AI education 
                accessible to everyone. Our mission is to empower students, professionals, and enthusiasts 
                with the knowledge and skills needed to excel in the rapidly evolving world of technology.
              </p>
            </div>

        

            {/* Stats */}
            <div className="about-us-stats">
              {stats.map((stat, index) => (
                <div key={index} className="about-us-stat-item">
                  <div className="about-us-stat-number">{stat.number}</div>
                  <div className="about-us-stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="about-us-image-wrapper">
            <div className="about-us-image-container">
              <img 
                src={aboutImage}
                alt="About Robo Craftiness"
                className="about-us-image"
                loading="lazy"
              />
              <div className="about-us-image-overlay"></div>
              <div className="about-us-image-badge">
                <i className="fas fa-award"></i>
                <span>Trusted by 15K+ Students</span>
              </div>
            </div>
            <div className="about-us-image-decoration"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default About_Us