import './App.css'
import { Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import CatMovement from './pages/CatMovement'
import EnvirmentMap from './pages/EnvirmentMap'
import RealsticRender from './pages/RealsticRender'

function App() {

  return (
    <>
     <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cat" element={<CatMovement />} />
        <Route path='/environment' element={<EnvirmentMap/>}/>
        <Route path='/' element={<RealsticRender/>}/>
      </Routes>
    </>
  )
}

export default App
