import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import './index.css';

import PageNotFound from './components/PageNotFound';
import Password from './components/Password';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Register from './components/Register';
import Reset from './components/Reset';
import UserName from './components/UserName';
import {AuthorizedUser, ProtectedRoute} from './middleware/auth'; // Keep this import if you plan to use it

function App() {
  return (
    <main>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserName />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<AuthorizedUser><Profile /></AuthorizedUser>} />
          <Route path="/password" element={<ProtectedRoute><Password /></ProtectedRoute>} />
          <Route path="/recovery" element={<Recovery />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;