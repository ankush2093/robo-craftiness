'use client'

import { useState, useEffect, useRef } from 'react'
import { config } from '../lib/config'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import Faq from './components/faq'
import TestiMonial from './components/TestiMonial'


export default function Home() {

  const [showSyllabus, setShowSyllabus] = useState(null)
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    preferredLanguage: '',
    appliedFor: ''
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const swiperRef = useRef(null)
  const [typedText, setTypedText] = useState('')
  const typingIndexRef = useRef(0)
  const currentTextIndexRef = useRef(0)
  const isDeletingRef = useRef(false)

  
    const [timeLeft, setTimeLeft] = useState({});
    const [isExpired, setIsExpired] = useState(false);
  
    // Default enrollment deadline
    const defaultDeadline = "2025-12-20T18:00:00"; // YYYY-MM-DDTHH:MM:SS format
  
    useEffect(() => {
      const calculateTimeLeft = () => {
        const deadline = new Date(defaultDeadline).getTime(); // default date
        const now = new Date().getTime();
        const difference = deadline - now;
  
        if (difference <= 0) {
          setIsExpired(true);
          return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }
  
        return {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        };
      };
  
      setTimeLeft(calculateTimeLeft());
  
      const timer = setInterval(() => {
        const time = calculateTimeLeft();
        setTimeLeft(time);
  
        if (
          time.days === 0 &&
          time.hours === 0 &&
          time.minutes === 0 &&
          time.seconds === 0
        ) {
          setIsExpired(true);
          clearInterval(timer);
        }
      }, 1000);
  
      return () => clearInterval(timer);
    }, []);

  // Typing effect with multiple texts
  useEffect(() => {
    const texts = ['Productivity', 'Innovation', 'Technology', 'Excellence', 'Success']
    let timeout
    
    const typeText = () => {
      const currentText = texts[currentTextIndexRef.current]
      
      if (!isDeletingRef.current) {
        // Typing
        if (typingIndexRef.current < currentText.length) {
          setTypedText(currentText.slice(0, typingIndexRef.current + 1))
          typingIndexRef.current++
          timeout = setTimeout(typeText, 100) // Typing speed
        } else {
          // Finished typing, wait then start deleting
          timeout = setTimeout(() => {
            isDeletingRef.current = true
            typingIndexRef.current = currentText.length
            typeText()
          }, 2000) // Pause after typing complete
        }
      } else {
        // Deleting
        if (typingIndexRef.current > 0) {
          setTypedText(currentText.slice(0, typingIndexRef.current - 1))
          typingIndexRef.current--
          timeout = setTimeout(typeText, 50) // Deleting speed (faster)
        } else {
          // Finished deleting, move to next text
          isDeletingRef.current = false
          currentTextIndexRef.current = (currentTextIndexRef.current + 1) % texts.length
          typingIndexRef.current = 0
          timeout = setTimeout(typeText, 500) // Pause before next text
        }
      }
    }
    
    typeText()
    
    return () => clearTimeout(timeout)
  }, [])

  // WhatsApp redirect
  const handleEnroll = (courseName) => {
    if (isExpired) return
    const message = encodeURIComponent(`Hi, I want to know pricing and enroll for ${courseName}`)
    window.open(`https://wa.me/${config.whatsappNumber}?text=${message}`, '_blank')
  }

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ type: '', message: '' })

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Registration successful! We will contact you soon.' })
        setFormData({
          fullName: '',
          mobileNumber: '',
          email: '',
          preferredLanguage: '',
          appliedFor: ''
        })
      } else {
        setFormStatus({ type: 'error', message: data.error || 'Registration failed. Please try again.' })
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Network error. Please try again.' })
    }
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <main>
      {/* Navigation */}
      <nav className="navbar-dark">
        <div className="nav-container">
          <div className="nav-brand">
          <img src="/images/logo_craftiness.png" alt="RoboCraftiness" />
          </div>
          <ul className="nav-links-white">
            <li><a href="#courses" className="nav-link-white">Courses</a></li>
            <li><a href="#why-us" className="nav-link-white">About</a></li>
            <li><a href="#register" className="nav-link-white">Students</a></li>
          </ul>
          <div className="nav-right">
       
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-section-dark">
        <div className="hero-pattern"></div>
        <div className="container">
          <div className="hero-content-dark">
            
            <h1>Explore <span>{typedText}<span className="typing-cursor">|</span></span></h1>
            <p className='text-white'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
            </p>
            <button onClick={() => window.location.href = '#courses'} className="btn-explore-courses">
              Explore {config.brandName} Courses
            </button>
            <div className="hero-video-container">
              <div className="video-player">
                {!isVideoPlaying ? (
                  <div className="video-thumbnail" onClick={() => setIsVideoPlaying(true)}>
                    <div className="play-button-overlay">
                      <div className="play-icon"></div>
                    </div>
                  </div>
                ) : (
                  <iframe
                    src="https://www.youtube.com/embed/htjRUL3neMg?si=3Gey0rov7pavcOhy"
                    className="video-iframe"
                    allow="autoplay; fullscreen"
                    allowFullScreen
                    title="Sewing Machine in Action - Close Up View"
                  ></iframe>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="hero-curve"></div>
      </section>

      {/* Countdown Timer Section */}
      <section className="section countdown-section">
        <div className="countdown-background"></div>
        <div className="container">
          <div className={`countdown-container ${isExpired ? 'timer-expired' : ''}`}>
            <div className="countdown-header">
              <div className="countdown-icon-wrapper">
                <i className="fas fa-clock countdown-icon"></i>
              </div>
              <div className="countdown-title-wrapper">
                <h2 className="countdown-title">
                  {isExpired ? '⏰ Enrollment Closed' : '⏳ Enrollment Ends In'}
                </h2>
                {!isExpired && (
                  <p className="countdown-subtitle">Don't miss out on this exclusive opportunity!</p>
                )}
              </div>
            </div>
            {!isExpired ? (
              <div className="countdown-grid">
                <div className="countdown-item">
                  <div className="countdown-item-inner">
                    <div className="countdown-icon-item">
                      <i className="fas fa-calendar-day"></i>
                    </div>
                    <span className="countdown-number">{String(timeLeft.days).padStart(2, '0')}</span>
                    <span className="countdown-label">Days</span>
                  </div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-item-inner">
                    <div className="countdown-icon-item">
                      <i className="fas fa-clock"></i>
                    </div>
                    <span className="countdown-number">{String(timeLeft.hours).padStart(2, '0')}</span>
                    <span className="countdown-label">Hours</span>
                  </div>
                </div>
                <div className="countdown-item">
                  <div className="countdown-item-inner">
                    <div className="countdown-icon-item">
                      <i className="fas fa-hourglass-half"></i>
                    </div>
                    <span className="countdown-number">{String(timeLeft.minutes).padStart(2, '0')}</span>
                    <span className="countdown-label">Minutes</span>
                  </div>
                </div>
                <div className="countdown-item countdown-item-seconds">
                  <div className="countdown-item-inner">
                    <div className="countdown-icon-item">
                      <i className="fas fa-stopwatch"></i>
                    </div>
                    <span className="countdown-number">{String(timeLeft.seconds).padStart(2, '0')}</span>
                    <span className="countdown-label">Seconds</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="countdown-expired-message">
                <i className="fas fa-times-circle expired-icon"></i>
                <p>Thank you for your interest. Enrollment has closed.</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="section">
        <div className="container">
          <h2 className="section-title">Courses</h2>
          <p className="section-subtitle">Choose the course that fits your career goals</p>
          <div className="courses-swiper-wrapper">
            <Swiper
              modules={[Autoplay]}
              spaceBetween={30}
              slidesPerView={1}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
              loop={true}
              loopAdditionalSlides={2}
              loopedSlides={3}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true
              }}
              breakpoints={{
                640: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30
                }
              }}
              className="courses-swiper"
            >
            {config.courses.map((course) => (
              <SwiperSlide key={course.id}>
                <div className="course-card fade-in">
                  <img className="course-image" src="https://media.istockphoto.com/id/1414699113/photo/small-robot-assistant-work-with-graphic-display.jpg?s=612x612&w=0&k=20&c=gGfba4h97L1tFjVWkPTiZUlfNHtkrf0fHhsmkY4S5Ng=" alt="Courses" />

                  <div className="course-header">
                    <div>
                      <h3 className="course-title">{course.name}</h3>
                      <div className="course-meta">
                        <span>{course.language}</span>
                        <span>•</span>
                        <span>{course.students} Students</span>
                      </div>
                    </div>
                  </div>
                  {/* <p className="course-description">{course.description}</p> */}
                  <div className="course-actions">
                    <button
                      className="btn-syllabus"
                      onClick={() => setShowSyllabus(course)}
                    >
                      View Syllabus
                    </button>
                    <button
                      className="btn-enroll"
                      onClick={() => handleEnroll(course.name)}
                      disabled={isExpired}
                    >
                      {isExpired ? 'Enrollment Closed' : 'Enroll Now'}
                    </button>
                  </div>

                  <a href='' className='btn-course-price mt-2'>Staring form Rs 4999</a>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          <button 
            className="courses-swiper-button courses-swiper-button-prev"
            onClick={() => swiperRef.current?.slidePrev()}
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="courses-swiper-button courses-swiper-button-next"
            onClick={() => swiperRef.current?.slideNext()}
          >
            <i className="fas fa-chevron-right"></i>
          </button>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section id="why-us" className="section why-section">
        <div className="container">
          <h2 className="section-title">Why {config.brandName}?</h2>
          <p className="section-subtitle">Everything you need to succeed in your career</p>
          <div className="why-grid">
            {config.whyChooseUs.map((item, index) => (
              <div key={index} className="why-card fade-in">
                <div className="why-icon">
                  <i className={`bi bi-${item.icon}`}></i>
                </div>
                <h4 className="why-title">{item.title}</h4>
                <p className="why-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <Faq></Faq>

      {/* Testimonial Section */}
      <TestiMonial></TestiMonial>
 

      {/* Registration Form */}
      <section id="register" className="section registration-section">
        <div className="container">
          <h2 className="section-title">Student Registration</h2>
          <p className="section-subtitle">Fill out the form below to get started</p>
          <div className="form-container">
            {formStatus.message && (
              <div className={`alert alert-${formStatus.type === 'success' ? 'success' : 'error'}`}>
                {formStatus.message}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Full Name *</label>
                <input
                  type="text"
                  name="fullName"
                  className="form-control"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Mobile Number *</label>
                <input
                  type="tel"
                  name="mobileNumber"
                  className="form-control"
                  value={formData.mobileNumber}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your mobile number"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email *</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your email address"
                />
              </div>
              <div className="form-group">
                <label className="form-label">Preferred Language *</label>
                <select
                  name="preferredLanguage"
                  className="form-control"
                  value={formData.preferredLanguage}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Applied For *</label>
                <select
                  name="appliedFor"
                  className="form-control"
                  value={formData.appliedFor}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Course</option>
                  <option value="IoT Technology">IoT Technology</option>
                  <option value="Robotics Technology">Robotics Technology</option>
                </select>
              </div>
              <button type="submit" className="btn-submit">
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Syllabus Modal */}
      {showSyllabus && (
        <div className="syllabus-modal active" onClick={() => setShowSyllabus(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3 className="modal-title">{showSyllabus.name} - Complete Syllabus</h3>
              <button className="close-btn" onClick={() => setShowSyllabus(null)}>&times;</button>
            </div>
            <ul className="syllabus-list">
              {showSyllabus.syllabus.map((item, idx) => (
                <li key={idx} className="syllabus-item">
                  <span className="syllabus-number">{idx + 1}.</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </main>
  )
}
