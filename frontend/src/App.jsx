
import { Signup } from './pages/Signup'
import './App.css'
import { BrowserRouter, Route, Routes, createBrowserRouter } from 'react-router-dom'
import { Dashoboard } from './pages/Dashboard'
// import { ErrorPage } from './pages/ErrorPage'
import { Signin } from './pages/Signin'
import { SendMoney } from './pages/SendMoney'
import { Home } from './pages/Home'

function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/dashboard' element={<Dashoboard/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/sendmoney' element={<SendMoney/>}/>
    </Routes>
    </BrowserRouter>
    </>
  )
}


// const appouter = createBrowserRouter([
//   {
//     path:"/dashboard",
//     element:<Dashoboard/>,
//     errorElement:<ErrorPage/>
//   },
//   {
//     path:"/signup",
//     element:<Signup/>,
//     errorElement:<ErrorPage/>
//   },
//   {
//     path:"/signin",
//     element:<Signin/>,
//     errorElement:<ErrorPage/>
//   },
//   {
//     path:"/sendmoney",
//     element:<SendMoney/>,
//     errorElement:<ErrorPage/>
//   }
// ])
export default App
