'use client'

import React, { useRef } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Autoplay, EffectCoverflow } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/effect-coverflow'

const Founder = () => {
  const swiperRef = useRef(null)

  const founders = [
    {
      id: 1,
      name: 'Dr. Anjali Sharma',
      role: 'CEO & Co-Founder',
      qualification: 'Ph.D. in Robotics Engineering, MIT | 15+ Years Experience',
      bio: 'Visionary leader with expertise in autonomous systems and AI-driven robotics solutions.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=faces',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        email: 'mailto:anjali@robocraftiness.com'
      }
    },
    {
      id: 2,
      name: 'Deepak Kumar',
      role: 'CTO & Co-Founder',
      qualification: 'M.S. in Computer Science, Stanford | IoT Expert',
      bio: 'Tech innovator specializing in IoT architecture and embedded systems development.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        email: 'mailto:rajesh@robocraftiness.com'
      }
    },
    {
      id: 3,
      name: 'Priya Patel',
      role: 'Head of Education',
      qualification: 'M.Tech in Electronics, IIT Delhi | 12+ Years Teaching',
      bio: 'Passionate educator dedicated to making robotics and AI accessible to everyone.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        email: 'mailto:priya@robocraftiness.com'
      }
    },
    {
      id: 4,
      name: 'Ankush Kumar',
      role: 'Software Engineer - IOT Role',
      qualification: 'B.TECH in Computer Science Engineering, Techno Partner | Robotics Specialist',
      bio: 'Expert in robotic design, automation, and industrial robotics applications.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces',
      social: {
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com',
        github: 'https://github.com',
        email: 'mailto:amit@robocraftiness.com'
      }
    }
  ]

  return (
    <section className="founder-section section">
      <div className="container">
          <div className='common-title col-md-7 mx-auto text-center'>
            <h2> Meet Our <span>Founders</span> </h2>
            <p>The brilliant minds behind Robo Craftiness</p>
          </div>

        <div className="founder-swiper-wrapper">
          <Swiper
            modules={[Navigation, Autoplay, EffectCoverflow]}
            spaceBetween={40}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 20,
              stretch: 0,
              depth: 200,
              modifier: 1,
              slideShadows: true
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 30
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 30
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40
              }
            }}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
            className="founder-swiper"
          >
            {founders.map((founder) => (
              <SwiperSlide key={founder.id}>
                <div className="founder-card">
                  <div className="founder-image-wrapper">
                    <div className="founder-image-bg"></div>
                    <img 
                      src={founder.image} 
                      alt={founder.name}
                      className="founder-image"
                    />
                    <div className="founder-overlay"></div>
                  </div>
                  
                  <div className="founder-content">
                    <div className="founder-info">
                      <h3 className="founder-name">{founder.name}</h3>
                      <p className="founder-role">{founder.role}</p>
                      <div className="founder-qualification">
                        <i className="fas fa-graduation-cap"></i>
                        <span>{founder.qualification}</span>
                      </div>
                      <p className="founder-bio">{founder.bio}</p>
                    </div>

                    <div className="founder-social">
                      <a 
                        href={founder.social.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon linkedin"
                        aria-label="LinkedIn"
                      >
                        <i className="fab fa-linkedin-in"></i>
                      </a>
                      <a 
                        href={founder.social.twitter} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon twitter"
                        aria-label="Twitter"
                      >
                        <i className="fab fa-twitter"></i>
                      </a>
                      <a 
                        href={founder.social.github} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="social-icon github"
                        aria-label="GitHub"
                      >
                        <i className="fab fa-github"></i>
                      </a>
                      <a 
                        href={founder.social.email} 
                        className="social-icon email"
                        aria-label="Email"
                      >
                        <i className="fas fa-envelope"></i>
                      </a>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <button 
            className="founder-swiper-button founder-swiper-button-prev"
            onClick={() => swiperRef.current?.slidePrev()}
            aria-label="Previous founder"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="founder-swiper-button founder-swiper-button-next"
            onClick={() => swiperRef.current?.slideNext()}
            aria-label="Next founder"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  )
}

export default Founder