import { useState } from "react"
import "./App.css"
import { Route, Routes } from "react-router-dom"
import Validate from "./Pages/Portal/User/Validate/Validate"

function App() {
  const [count, setCount] = useState(0)

  return (
    <Routes>
      <Route path="/portal/user/validate/:token" element={<Validate />} />
    </Routes>
  )
}

export default App
