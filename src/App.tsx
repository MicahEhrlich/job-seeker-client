import './App.css'
import { Dashboard } from './components/Dashboard'
import { JobBoard } from './components/JobBoard'
import { Layout } from './components/Layout/Layout'
import { Navbar } from './components/Layout/Navbar'
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
        </Routes>
      </Layout >
    </>
  )
}

export default App
