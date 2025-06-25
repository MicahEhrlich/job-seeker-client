import './App.css'
import { Dashboard } from './components/pages/Dashboard'
import { JobBoard } from './components/pages/JobBoard'
import { Layout } from './components/Layout/Layout'
import { Navbar } from './components/Layout/Navbar'
import { Questions } from './components/pages/Questions'
import { Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
      <Navbar />
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/jobboard" element={<JobBoard />} />
          <Route path="/questions" element={<Questions />} />
        </Routes>
      </Layout >
    </>
  )
}

export default App
