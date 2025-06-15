import './App.css'
import { Dashboard } from './components/Dashboard'
import { Layout } from './components/Layout/Layout'
import { Navbar } from './components/Layout/Navbar'

function App() {

  return (
    <>
      <Navbar />
      <Layout>
        <Dashboard />
      </Layout>
    </>
  )
}

export default App
