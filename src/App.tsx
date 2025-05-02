import './App.css'
import { Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import CatMovement from './pages/CatMovement'
import EnvirmentMap from './pages/EnvirmentMap'

function App() {

  return (
    <>
     <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cat" element={<CatMovement />} />
        <Route path='/' element={<EnvirmentMap/>}/>
      </Routes>
    </>
  )
}

export default App
