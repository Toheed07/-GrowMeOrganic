import SignIn from "./components/sign-in-form/sign-in-form"
import SignUp from "./components/sign-up-form/sign-up-form"
import Navigation from "./routes/navigation/navigation"
import Home from "./routes/home/home"

import { Routes, Route } from 'react-router-dom';



function App() {

  return (
    <>
      <Navigation />
      <Routes>
        <Route index element={<Home />} />
        <Route path='/sign-in' element={< SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </>
  )
}

export default App
