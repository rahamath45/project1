import { Route, Routes } from "react-router-dom"

import Nav from "./Pages/Nav"
import Details from "./Pages/Details"
import './App.css';
import Research from "./Pages/Research";

function App() {
 

  return (
   <>
           <Nav/>
           <Routes>
              
             <Route exact path="/" element={<Research/>} />
            <Route path="/movie/:id" element={<Details/>} />
          </Routes>
    </>
  
  )
}

export default App;
