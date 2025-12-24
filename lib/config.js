// Global configuration
export const config = {
  // Brand name
  brandName: 'Robo Craftiness',
  brandTagline: 'by Robotics Experts',

  // WhatsApp number (format: country code + number, no + or spaces)
  whatsappNumber: '+919060215620', // Change this to your WhatsApp number

  // Enrollment deadline (ISO format)
  enrollmentDeadline: '2024-12-31T23:59:59', // Change this to your deadline

  // Social proof
  totalStudents: '15K+',
  enrolledStudents: '12K+',

  // Courses data
  courses: [
    {
      id: 'iot',
      name: 'IoT Technology',
      description: 'Master Internet of Things from sensors to cloud integration. Build real-world IoT projects and understand the complete ecosystem.',
      students: '8.5K+',
      language: 'English & Hindi',
      price: '₹1500',
      banner:"/images/iotbanner.jpg",
      syllabus: [
        'Introduction to IoT and its Applications',
        'Embedded Systems and Microcontrollers',
        'Sensors and Actuators',
        'Communication Protocols (WiFi, Bluetooth, LoRa)',
        'IoT Cloud Platforms (AWS IoT, Google Cloud IoT)',
        'Data Analytics and Visualization',
        'Security in IoT Systems',
        'Project: Smart Home Automation System',
        'Project: Industrial IoT Monitoring',
        'Capstone Project: Complete IoT Solution'
      ]
    },
    {
      id: 'robotics',
      name: 'Robotics Technology',
      description: 'Learn robotics from fundamentals to advanced applications. Design, build, and program robots for various industries.',
      students: '6.5K+',
      price: '₹1500',
      banner:"/images/rototicbanner.jpg",
      language: 'English & Hindi',
      syllabus: [
        'Introduction to Robotics',
        'Mechanical Design and Kinematics',
        'Electronics and Circuit Design',
        'Motor Control and Actuators',
        'Sensors and Perception',
        'Robot Programming (ROS, Arduino, Raspberry Pi)',
        'Computer Vision for Robotics',
        'Path Planning and Navigation',
        'Project: Autonomous Mobile Robot',
        'Project: Robotic Arm Control',
        'Capstone Project: Complete Robotic System'
      ]
    },
    {
      id: 'webdev',
      name: 'Web Development (Class 5–10)',
      description: 'Learn website development from basics to real-world projects. One common course designed for students from Class 5 to 10 with level-based learning.',
      students: '1K+',
      language: 'English & Hindi',
      price: '₹1500',
      banner:"/images/coursewebdev.jpg",
      syllabus: [
        'Introduction to Internet & Websites',
        'How Websites Work (Basic Flow)',
        'HTML Basics (Headings, Paragraphs, Images, Links)',
        'HTML Lists & Tables',
        'CSS Basics (Colors, Fonts, Backgrounds)',
        'CSS Box Model & Styling',
        'Page Layout (Header, Footer, Sections)',
        'Responsive Design (Mobile vs Desktop)',
        'Introduction to JavaScript',
        'JavaScript Events (Button Click, Alert)',
        'Basic Logic & Calculations',
        'DOM Basics (For Senior Students)',
        'Mini Project: Personal Profile Website',
        'Mini Project: Interactive Web Page',
        'Final Project: Student Portfolio / School Website'
      ]
    },
     {
      id: '3dmodeling',
      name: '3D Modeling(Class 5–10)',
      description: 'Learn 3D modeling from basics to real-world projects. One common course designed for students from Class 5 to 10 with level-based learning.',
      students: '1.5K+',
      language: 'English & Hindi',
      price: '₹1500',
      banner:"/images/3dmodeling.jpg",
      syllabus: [
        'Introduction to Internet & Websites',
        'How Websites Work (Basic Flow)',
        'HTML Basics (Headings, Paragraphs, Images, Links)',
        'HTML Lists & Tables',
        'CSS Basics (Colors, Fonts, Backgrounds)',
        'CSS Box Model & Styling',
        'Page Layout (Header, Footer, Sections)',
        'Responsive Design (Mobile vs Desktop)',
        'Introduction to JavaScript',
        'JavaScript Events (Button Click, Alert)',
        'Basic Logic & Calculations',
        'DOM Basics (For Senior Students)',
        'Mini Project: Personal Profile Website',
        'Mini Project: Interactive Web Page',
        'Final Project: Student Portfolio / School Website'
      ]
    }


  ],

  // Why Choose Us points
  whyChooseUs: [
    {
      title: 'On-Demand Courses',
      description: 'Watch courses, anytime, anywhere and learn at your own pace.',
      icon: 'play-circle-fill'
    },
    {
      title: 'Lifetime Access',
      description: 'Accessible as long as you need on a one-time payment.',
      icon: 'infinity'
    },
    {
      title: 'Free Upgrades',
      description: 'Get free unlimited upgrades whenever we update any of our courses.',
      icon: 'shield-check'
    },
    {
      title: 'Live Group Sessions',
      description: 'Attend live group Q&A sessions with experts every month.',
      icon: 'people-fill'
    },
    {
      title: 'Community Learning',
      description: 'Connect and engage with fellow students in a chat-based community.',
      icon: 'chat-dots-fill'
    },
    {
      title: 'Practical & Affordable',
      description: 'We only make courses that give you actionable steps at an affordable price.',
      icon: 'currency-rupee'
    }
  ]
};
