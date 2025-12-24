'use client'

import { useState } from 'react'
import { config } from '../../lib/config'

const Faq = () => {
  const [openIndex, setOpenIndex] = useState(null)

  const faqs = [
    {
      question: 'What courses do you offer?',
      answer: 'We offer comprehensive courses in IoT Technology and Robotics Technology. Both courses are designed for beginners and advanced learners, covering everything from fundamentals to real-world project implementation.',
      icon: 'bi-book'
    },
    {
      question: 'Do I need prior experience to enroll?',
      answer: 'No prior experience is required! Our courses are designed to take you from beginner to advanced level. We start with fundamentals and gradually build up to complex projects. However, basic computer knowledge is helpful.',
      icon: 'bi-question-circle'
    },
    {
      question: 'What is the course duration?',
      answer: 'The course duration varies, but typically our courses are self-paced. You can complete them at your own speed. On average, students complete the course in 3-6 months depending on their schedule and dedication.',
      icon: 'bi-clock'
    },
    {
      question: 'Will I get a certificate after completion?',
      answer: 'Yes! Upon successful completion of the course and all projects, you will receive a certificate of completion that you can add to your resume and LinkedIn profile.',
      icon: 'bi-award'
    },
    {
      question: 'What languages are the courses available in?',
      answer: 'Our courses are available in both English and Hindi, making them accessible to a wider audience. You can choose your preferred language during enrollment.',
      icon: 'bi-translate'
    },
    {
      question: 'Is there lifetime access to the course materials?',
      answer: 'Yes! Once you enroll, you get lifetime access to all course materials, including future updates and new content. You can revisit the course anytime, anywhere.',
      icon: 'bi-infinity'
    },
    {
      question: 'Do you provide job placement assistance?',
      answer: 'While we don\'t guarantee job placement, we provide career guidance, resume building tips, and interview preparation. We also have a community where job opportunities are shared regularly.',
      icon: 'bi-briefcase'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept various payment methods including credit/debit cards, UPI, net banking, and digital wallets. We also offer flexible payment plans for your convenience.',
      icon: 'bi-credit-card'
    },
    {
      question: 'Can I get a refund if I\'m not satisfied?',
      answer: 'Yes, we offer a 7-day money-back guarantee. If you\'re not satisfied with the course content within the first 7 days, you can request a full refund, no questions asked.',
      icon: 'bi-arrow-counterclockwise'
    },
    {
      question: 'How do I access the course after enrollment?',
      answer: 'After enrollment, you\'ll receive login credentials via email. You can access the course materials through our learning platform on any device - desktop, tablet, or mobile.',
      icon: 'bi-laptop'
    }
  ]

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="section faq-section">
      <div className="container">
        

          <div className='common-title col-md-7 mx-auto text-center'>
            <h4>Our Foundation</h4>
            <h2> Frequently  <span>Asked Questions</span> </h2>
            <p className='text-white'>Driving innovation through education and empowering the next generation of technology leaders</p>
          </div>
   

        <div className="row justify-content-center">
          <div className="col-lg-10">
            <div className="faq-accordion">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="faq-item mb-3"
                >
                  <div
                    className={`faq-question ${openIndex === index ? 'active' : ''}`}
                    onClick={() => toggleFaq(index)}
                  >
                    <div className="faq-question-content">
                      <i className={`bi ${faq.icon} faq-question-icon`}></i>
                      <span>{faq.question}</span>
                    </div>
                    <i
                      className={`bi ${openIndex === index ? 'bi-chevron-up' : 'bi-chevron-down'} faq-chevron`}
                    ></i>
                  </div>
                  {openIndex === index && (
                    <div className="faq-answer">
                      <div className="faq-answer-content">
                        <i className="bi bi-check-circle-fill faq-answer-icon"></i>
                        <p className="mb-0">{faq.answer}</p>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="row mt-5">
          <div className="col-12 text-center">
            <div className="faq-cta p-4">
              <h4 className="mb-3">
                <i className="bi bi-chat-dots-fill me-2"></i>
                Still have questions?
              </h4>
              <p className="mb-3 text-white">
                Can't find the answer you're looking for? Please reach out to our friendly support team.
              </p>
              <a
                href={`https://wa.me/${config.whatsappNumber}?text=${encodeURIComponent('Hi, I have a question about your courses')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="faq-whatsapp-btn"
              >
                <i className="bi bi-whatsapp"></i>
                Contact Us on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Faq;