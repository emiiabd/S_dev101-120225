import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { Home, NotFound, Contact, AboutUs, Login, Pending, BatteryAlert, PaymentPending, ServicesEdit, ClientEdit, Clients, Services, ProductsClients } from './Pages'
import { ParallaxProvider } from 'react-scroll-parallax';
import { ProtectedRoute } from './Components';

function App() {

  return (
    <>
    <ParallaxProvider scrollAxis='vertical'> 
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/aboutUs" element={<AboutUs/>} />
      <Route path="/login" element={<Login/>} />
      <Route element={<ProtectedRoute />}>
        <Route path='/log/s101/battery' element={<BatteryAlert/>} />
        <Route path='/log/s101/paymentPending' element={<PaymentPending/>} />
        <Route path="/log/s101/pending" element={<Pending/>} />
        <Route path="/log/s101/clients" element={<Clients/>} />
        <Route path='/log/s101/products/:clientID' element={<ProductsClients/>} />
        <Route path='/log/s101/services/:clientID' element={<Services/>} />
        <Route path='/log/s101/services/:serviceID/:type' element={<ServicesEdit/>} />
        <Route path='/log/s101/clients/:clientID/:type' element={<ClientEdit/>} />
      </Route>
      <Route path="/*" element={<NotFound/>} />
    </Routes>
    </ParallaxProvider>
    </>
  )
}

export default App
