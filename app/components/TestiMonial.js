'use client'

import React, { useState, useEffect } from 'react'

const TestiMonial = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [currentQuote, setCurrentQuote] = useState(0)
  const [currentGroupPhoto, setCurrentGroupPhoto] = useState(0)
  const [studentCount, setStudentCount] = useState(0)
  const [studentAvatars, setStudentAvatars] = useState([])

  const testimonials = [
    {
      metric: '250K',
      metricLabel: 'Views in a month',
      quote: 'The only course available in the market which covers the art, science, and philosophy of YouTube. Very detailed and practical stuff.',
      name: 'Anand Vaishampayan',
      course: 'Enrolled in How To YouTube',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces'
    },
    {
      metric: '180K',
      metricLabel: 'Students enrolled',
      quote: 'This course transformed my understanding of robotics. The practical approach and real-world projects made all the difference.',
      name: 'Priya Sharma',
      course: 'Enrolled in Robotics Technology',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=faces'
    },
    {
      metric: '95%',
      metricLabel: 'Success rate',
      quote: 'Best investment I made for my career. The instructors are knowledgeable and the community support is amazing.',
      name: 'Rajesh Kumar',
      course: 'Enrolled in IoT Technology',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces'
    }
  ]

  const quoteCards = [
    {
      quote: 'Will make you question all that you\'ve been doing till now.',
      name: 'Riya Baria'
    },
    {
      quote: 'Life-changing experience! The course structure is perfect.',
      name: 'Amit Patel'
    },
    {
      quote: 'Exceeded all my expectations. Highly recommended!',
      name: 'Sneha Desai'
    }
  ]

  // Group photos array - auto-changing images
  const groupPhotos = [
    'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop'
  ]

  // Target student count
  const targetStudentCount = 476457

  // Generate random student avatars with positions
  const generateRandomAvatars = () => {
    const positions = [
      { top: '15%', left: '10%' },
      { top: '14%', left: '88%' },
      { top: '45%', left: '15%' },
      { top: '50%', left: '80%' },
      { top: '65%', left: '25%' },
      { top: '70%', left: '70%' },
      { top: '91%', left: '5%' },
      { top: '35%', left: '64%' },
      { top: '80%', left: '60%' },
      { top: '80%', left: '40%' }
    ]
    
    return Array.from({ length: 10 }, (_, i) => ({
      url: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70) + 1}&t=${Date.now()}`,
      position: positions[i]
    }))
  }

  // Initialize student avatars
  useEffect(() => {
    setStudentAvatars(generateRandomAvatars())
  }, [])

  // Animated counting effect
  useEffect(() => {
    const duration = 2000 // 2 seconds
    const steps = 60
    const increment = targetStudentCount / steps
    const stepDuration = duration / steps

    let currentStep = 0
    const timer = setInterval(() => {
      currentStep++
      const newCount = Math.min(
        Math.floor(increment * currentStep),
        targetStudentCount
      )
      setStudentCount(newCount)

      if (currentStep >= steps) {
        setStudentCount(targetStudentCount)
        clearInterval(timer)
      }
    }, stepDuration)

    return () => clearInterval(timer)
  }, [])

  // Auto-rotate group photos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentGroupPhoto((prev) => (prev + 1) % groupPhotos.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [groupPhotos.length])

  // Auto-rotate student avatars (random images)
  useEffect(() => {
    const interval = setInterval(() => {
      setStudentAvatars(generateRandomAvatars())
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  // Auto-rotate testimonials
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  // Auto-rotate quote cards
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quoteCards.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [quoteCards.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  // Format number with commas
  const formatNumber = (num) => {
    return num.toLocaleString('en-US')
  }

  return (
    <section className="section testimonial-section">
      <div className="container">
          <div className='common-title col-md-7 mx-auto text-center'>
            {/* <h4>Our Foundation</h4> */}
            <h2> From  <span>Our Students</span> </h2>
            <p>Choose the course that fits your career goals</p>
          </div>

        <div className="testimonial-grid">
          {/* Left Panel - Main Testimonial Card (col-4) */}
          <div className="testimonial-main-card testimonial-col-4">
            <div className="testimonial-metric">
              <span className="metric-number">{testimonials[currentTestimonial].metric}</span>
              <span className="metric-label">{testimonials[currentTestimonial].metricLabel}</span>
            </div>
            
            <div className="testimonial-content">
              <p className="testimonial-quote">
                "{testimonials[currentTestimonial].quote}"
              </p>
              <div className="testimonial-author">
                <div>
                  <p className="author-name">{testimonials[currentTestimonial].name}</p>
                  <p className="author-course">{testimonials[currentTestimonial].course}</p>
                </div>
                <img 
                  src={testimonials[currentTestimonial].image} 
                  alt={testimonials[currentTestimonial].name}
                  className="author-image"
                />
              </div>
            </div>

            <div className="testimonial-nav">
              <button className="nav-btn" onClick={prevTestimonial}>
                <i className="fas fa-chevron-left"></i>
              </button>
              <button className="nav-btn" onClick={nextTestimonial}>
                <i className="fas fa-chevron-right"></i>
              </button>
            </div>
          </div>

          {/* Right Panel - col-8 container */}
          <div className="testimonial-right-panel testimonial-col-8">
            {/* Top Right - Student Count Card (col-8) */}
            <div className="testimonial-student-card">
              <div className="student-count-content">
                <div className="student-avatars">
                  {studentAvatars.map((avatar, index) => (
                    <img 
                      key={index}
                      src={avatar.url} 
                      alt={`Student ${index + 1}`}
                      className="student-avatar"
                      style={{
                        position: 'absolute',
                        top: avatar.position.top,
                        left: avatar.position.left,
                        zIndex: index + 1
                      }}
                    />
                  ))}
                </div>
                <div className="student-count-text">
                  <span className="student-number">{formatNumber(studentCount)}</span>
                  <span className="student-label">students and counting!</span>
                </div>
              </div>
            </div>

            {/* Bottom Right - Two col-4 cards side by side */}
            <div className="testimonial-bottom-row">
              {/* Quote Card (col-4) */}
              <div className="testimonial-quote-card testimonial-col-4-inner">
                <div className="quote-icon">
                  <i className="fas fa-quote-left"></i>
                </div>
                <p className="quote-text">{quoteCards[currentQuote].quote}</p>
                <p className="quote-author">{quoteCards[currentQuote].name}</p>
              </div>

              {/* Group Photo (col-4) */}
              <div className="testimonial-group-photo testimonial-col-4-inner">
                <img 
                  src={groupPhotos[currentGroupPhoto]} 
                  alt="Students celebrating"
                  className="group-image"
                  key={currentGroupPhoto}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestiMonial