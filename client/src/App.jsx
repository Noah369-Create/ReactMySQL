import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Books from './Books'
import CreateBook from './CreateBook'
import UpdateBook from './UpdateBook'
import Nav from './Nav'

function App() {

  return (
    <BrowserRouter>
    <Nav />
    <Routes>
      <Route path='/' element={<Books/>}></Route>
      <Route path='/create' element={<CreateBook/>}></Route>
      <Route path='/update/:id' element={<UpdateBook/>}></Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
