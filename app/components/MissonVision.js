'use client'

import React from 'react'
import { config } from '../../lib/config'
import '../../styles/mission-vision.css'

const MissonVision = () => {
  const missionVision = [
    {
      type: 'mission',
      icon: 'fas fa-bullseye',
      title: 'Our Mission',
      description: 'To democratize robotics and AI education by providing accessible, practical, and industry-relevant courses that empower individuals to excel in the technology-driven world.',
      highlights: [
        'Make cutting-edge education accessible to everyone',
        'Bridge the gap between theory and practical application',
        'Foster innovation and creativity in technology',
        'Build a community of skilled professionals'
      ],
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      type: 'vision',
      icon: 'fas fa-eye',
      title: 'Our Vision',
      description: 'To become the leading platform for robotics and AI education, inspiring millions of learners worldwide to transform their careers and contribute to technological advancement.',
      highlights: [
        'Lead the future of tech education',
        'Inspire the next generation of innovators',
        'Create a global community of tech leaders',
        'Shape the future of automation and AI'
      ],
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    }
  ]

  return (
    <section id="mission-vision" className="mission-vision-section section">
      <div className="container">
         <div className='common-title col-md-7 mx-auto text-center'>
            <h4>Our Foundation</h4>
            <h2> Mission & <span>Vision</span> </h2>
            <p>Driving innovation through education and empowering the next generation of technology leaders</p>
          </div>

        <div className="mission-vision-grid">
          {missionVision.map((item, index) => (
            <div key={index} className={`mission-vision-card mission-vision-card-${item.type}`}>
              <div className="mission-vision-card-header">
                <div className="mission-vision-icon-wrapper" style={{ background: item.gradient }}>
                  <i className={item.icon}></i>
                </div>
                <h3 className="mission-vision-card-title">{item.title}</h3>
              </div>
              
              <div className="mission-vision-card-body">
                <p className="mission-vision-card-description">{item.description}</p>
                
                <div className="mission-vision-highlights">
                  {item.highlights.map((highlight, idx) => (
                    <div key={idx} className="mission-vision-highlight-item">
                      <i className="fas fa-check-circle"></i>
                      <span>{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mission-vision-card-footer">
                <div className="mission-vision-card-pattern"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default MissonVision
