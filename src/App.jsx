import { Route, Routes } from "react-router-dom"
import Search from "./Pages/Search"
import Nav from "./Pages/Nav"
import Details from "./Pages/Details"


function App() {
 

  return (
    <>
     <Nav/>
          <Routes>
            <Route exact path="/" element={<Search/>} />
            <Route path="/movie/:id" element={<Details/>} />
          </Routes>
    </>
  )
}

export default App
