import { MainPage } from './pages/main-page';
import { LoginPage } from './pages/login-page';
import { Route, Routes } from 'react-router-dom';

export function App() {
  return (
    <Routes>
      <Route path='/' element={<LoginPage />} />
      <Route path='/main' element={<MainPage />} />
    </Routes>
  );
}
