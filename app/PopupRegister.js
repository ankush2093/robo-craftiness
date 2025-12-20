'use client'

import React, { useState, useEffect } from 'react'

const PopupRegister = ({ isOpen, onClose, courseName }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    mobileNumber: '',
    email: '',
    preferredLanguage: '',
    appliedFor: ''
  })
  const [formStatus, setFormStatus] = useState({ type: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Reset form when popup opens
  useEffect(() => {
    if (isOpen) {
      setFormData({
        fullName: '',
        mobileNumber: '',
        email: '',
        preferredLanguage: '',
        appliedFor: courseName || '' // Pre-fill with course name
      })
      setFormStatus({ type: '', message: '' })
    }
  }, [isOpen, courseName])

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ type: '', message: '' })
    setIsSubmitting(true)

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
        // Auto close after 2 seconds on success
        setTimeout(() => {
          onClose()
        }, 2000)
      } else {
        setFormStatus({ type: 'error', message: data.error || 'Registration failed. Please try again.' })
      }
    } catch (error) {
      setFormStatus({ type: 'error', message: 'Network error. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="register_popup_overlay" onClick={handleBackdropClick}>
      <div className="register_popup_container">
        <div className="register_popup_header">
          <div className="register_popup_header_content">
            <h2 className="register_popup_title">Student Registration</h2>
            <p className="register_popup_subtitle">Fill out the form below to get started</p>
          </div>
          <button 
            className="register_popup_close" 
            onClick={onClose}
            aria-label="Close"
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="register_popup_body">
          {formStatus.message && (
            <div className={`register_popup_alert register_popup_alert_${formStatus.type}`}>
              <i className={`fas ${formStatus.type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}`}></i>
              <span>{formStatus.message}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register_popup_form">
            <div className="register_popup_form_group">
              <label className="register_popup_form_label">
                <i className="fas fa-user"></i>
                Full Name *
              </label>
              <input
                type="text"
                name="fullName"
                className="register_popup_form_control"
                value={formData.fullName}
                onChange={handleInputChange}
                required
                placeholder="Enter your full name"
              />
            </div>

            <div className="register_popup_form_group">
              <label className="register_popup_form_label">
                <i className="fas fa-phone"></i>
                Mobile Number *
              </label>
              <input
                type="tel"
                name="mobileNumber"
                className="register_popup_form_control"
                value={formData.mobileNumber}
                onChange={handleInputChange}
                required
                placeholder="Enter your mobile number"
              />
            </div>

            <div className="register_popup_form_group">
              <label className="register_popup_form_label">
                <i className="fas fa-envelope"></i>
                Email *
              </label>
              <input
                type="email"
                name="email"
                className="register_popup_form_control"
                value={formData.email}
                onChange={handleInputChange}
                required
                placeholder="Enter your email address"
              />
            </div>

            <div className="register_popup_form_group">
              <label className="register_popup_form_label">
                <i className="fas fa-language"></i>
                Preferred Language *
              </label>
              <select
                name="preferredLanguage"
                className="register_popup_form_control"
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

            <div className="register_popup_form_group">
              <label className="register_popup_form_label">
                <i className="fas fa-graduation-cap"></i>
                Applied For *
              </label>
              <select
                name="appliedFor"
                className="register_popup_form_control"
                value={formData.appliedFor}
                onChange={handleInputChange}
                required
              >
                <option value="">Select Course</option>
                <option value="IoT Technology">IoT Technology</option>
                <option value="Robotics Technology">Robotics Technology</option>
              </select>
            </div>

            <button 
              type="submit" 
              className="register_popup_submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fas fa-spinner fa-spin"></i>
                  Submitting...
                </>
              ) : (
                <>
                  <i className="fas fa-paper-plane"></i>
                  Submit Registration
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default PopupRegister