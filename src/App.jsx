import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import ProductsPage from './pages/productsPage'
import TestPage from './pages/test'
import LoginPage from './pages/loginPage'
import { Toaster } from 'react-hot-toast'

function App() {
  
  return (
      <div className='w-full h-screen flex justify-center items-center bg-primary text-secondary'>
        <Toaster position='top-right'/>
        <Routes>
          <Route path='/' element={<HomePage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/admin/*' element={<AdminPage/>}/>
          <Route path='/products/*' element={<ProductsPage/>}/>
          <Route path='/test' element={<TestPage/>}/>
        </Routes>
      </div>
  )
}

export default App
