import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Menu from './components/Menu';
import Nav from './components/Nav';
import Users from './pages/users/Users';
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import UserCreate from './pages/users/UserCreate';
import UserEdit from './pages/users/UserEdit';
import Roles from './pages/roles/Roles';
import RolesCreate from './pages/roles/RolesCreate';
import RoleEdit from './pages/roles/RoleEdit';
import Products from './pages/products/Products';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' index element={<Dashboard />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/users' element={<Users />} />
          <Route path='/users/create' element={<UserCreate />} />
          <Route path='/users/:id/edit' element={<UserEdit />} />
          <Route path='/roles' element={<Roles />} />
          <Route path='/roles/create' element={<RolesCreate />} />
          <Route path='/roles/:id/edit' element={<RoleEdit />} />
          <Route path='/products' element={<Products />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
