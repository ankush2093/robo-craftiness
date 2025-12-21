import Footer from './components/Footer'
import ConditionalFooter from './components/ConditionalFooter'
import './globals.css'

export const metadata = {
  title: 'RoboMines - Practical Courses For Work & Life',
  description: 'Master IoT Technology and Robotics Technology with industry experts. Enroll before time runs out!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.0/font/bootstrap-icons.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js" async></script>
      </head>
      <body>
        {children}
        <ConditionalFooter />
      </body>
    </html>
  )
}
