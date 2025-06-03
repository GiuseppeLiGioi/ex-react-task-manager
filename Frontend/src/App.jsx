import GlobalContextProvider from './context/GlobalContext';
import AddTask from './assets/components/AddTask';
import Navbar from './assets/components/Navbar';
import TaskList from './assets/components/TaskList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskDetail from './assets/components/TaskDetail';
function App() {


  return (
    <BrowserRouter> {/* ho spostato il BrowserRouter più esternamente per consentire l'utilizzo di useNavigate in useTasks.jsx*/ }
      <GlobalContextProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<TaskList />} />
          <Route path='/tasks/new' element={<AddTask />} />
          <Route path='/tasks/:id' element={<TaskDetail />} />
        </Routes>
      </GlobalContextProvider>
    </BrowserRouter>
  )
}

export default App
