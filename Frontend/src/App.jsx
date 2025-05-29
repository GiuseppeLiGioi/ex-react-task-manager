import { GlobalContext } from './context/GlobalContext';
import AddTask from './assets/components/AddTask';
import Navbar from './assets/components/Navbar';
import TaskList from './assets/components/TaskList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
function App() {


  return (
    <GlobalContext>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<AddTask />} />
        </Routes>
      </BrowserRouter>
    </GlobalContext>
  )
}

export default App
