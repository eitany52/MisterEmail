import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { HomePage } from './pages/HomePage.jsx'
import { AboutUs } from './pages/AboutUs.jsx'
import { EmailIndex } from './pages/EmailIndex.jsx'
import { AppHeader } from './cmps/AppHeader.jsx'
import './assets/css/index.css'
import { EmailDetails } from './cmps/EmailDetails.jsx'

function App() {
  return (
    <Router>
      <section className='main-app'>
        <AppHeader />
        <main className='main-app-container'>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/email' element={<EmailIndex />}>
              <Route path='/email/:emailId' element={<EmailDetails />} />
            </Route>
            <Route path='/about' element={<AboutUs />} />
          </Routes>
        </main>
      </section>
    </Router>
  )
}

export default App
