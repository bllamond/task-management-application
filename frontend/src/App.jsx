import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import TaskManager from './components/TaskManager';
import Navbar from './components/Header';
import SignUp from './components/Signup';

function App() {
  return (
    <div>
    <BrowserRouter>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='/login' element = { <Login /> } />
        <Route path='/register' element = { <SignUp /> } />
        <Route path='/tasks' element = { <TaskManager /> } />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App