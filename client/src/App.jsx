import React from 'react'
import Navbar from './components/Navbar'
import { Routes } from 'react-router-dom'

const App = () => {

  const isAdminRoute = useLocation().pathname.startsWith('/admin'); 
  return (
    <>
    {!isAdminRoute && <Navbar />}
    <Routes>
      <Route path = '/' element = {<Home/>} />
      <Route path = '/movies' element = {<Movies/>} />
      <Route path = '/movies/:id' element = {<MovieDetails/>} />
      <Route path = '/movies/:id/:date' element = {<SeatLayout/>} />
      <Route path = '/my-bookings' element = {<MyBookings/>} />
      <Route path = '/favourite' element = {<Favourite/>} />
    </Routes>
    </>
  )
}

export default App