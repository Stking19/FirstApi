import './App.css'
import Header from './Components/Header/Header'
import Landingpage from './Components/Landingpage/Landingpage'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='body'>
    <Header />
    <Router>
       <Routes>
         <Route path="/" element={<Login />}/>
          <Route path='/Landingpage' element={<Landingpage />}/>
          <Route path='/Register' element={<Register />}/>
        </Routes>
    </Router>
    </div>
    </>
  )
}

export default App
