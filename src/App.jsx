import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router'
import CreateForm from './components/create.jsx'
import PreviewForm from './components/preview.jsx'
import MyForms from './components/myform.jsx'
import Navbar from './components/navbar.jsx'



function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<CreateForm />} />
        <Route path="/create" element={<CreateForm />} />
        <Route path="/preview" element={<PreviewForm />} />
        <Route path="/myforms" element={<MyForms />} />
      </Routes>
    </Router>
  )
}

export default App
