import { AddUser } from './pages/add-user';
import { MainPage } from './pages/main-page';
import { LoginPage } from './pages/login-page';
import { Route, Routes } from 'react-router-dom';
import { UserDetails } from './pages/user-details';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/main' element={<MainPage />} />
      <Route path='/addUser' element={<AddUser />} />
      <Route path='/userDetails' element={<UserDetails />} />
    </Routes>
  );
}
