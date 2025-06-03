import  GlobalContextProvider from './context/GlobalContext';
import AddTask from './assets/components/AddTask';
import Navbar from './assets/components/Navbar';
import TaskList from './assets/components/TaskList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskDetail from './assets/components/TaskDetail';
function App() {


  return (
    <GlobalContextProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<AddTask />} />
          <Route path='/tasks/:id' element={<TaskDetail />} />
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
  )
}

export default App
