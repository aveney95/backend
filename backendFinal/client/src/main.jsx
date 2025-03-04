import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ProtectedRoute from './Components/ProtectedRoutes.jsx'
import ToDo from "./Components/ToDo.jsx"

//importing all paths and components
createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <BrowserRouter>

<Routes>

  <Route path="/" element={<App />} />

  <Route path="/admin/" element={<ProtectedRoute />}>
  
    {/* <Route path="loggedin" element={<LoggedIn />} /> */}

    <Route path="ToDo" element={<ToDo />} />



  </Route>


</Routes>





</BrowserRouter>
  </StrictMode>,
)