import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import Nav from './components/Nav';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Dashboard />} />
          <Route path='/users' element={<Users />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
