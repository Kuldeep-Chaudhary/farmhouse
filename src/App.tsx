import './App.css'
import { Route,  Routes } from 'react-router-dom'
import Home from './pages/Home'
import CatMovement from './pages/CatMovement'
import EnvirmentMap from './pages/EnvirmentMap'
import RealsticRender from './pages/RealsticRender'
import CustomFiber from './pages/CustomFiber'

function App() {

  return (
    <>
     <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cat" element={<CatMovement />} />
        <Route path='/environment' element={<EnvirmentMap/>}/>
        <Route path='/' element={<RealsticRender/>}/>
        <Route path='/fiber' element={<CustomFiber/>}/>
      </Routes>
    </>
  )
}

export default App
