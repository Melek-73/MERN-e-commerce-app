import './App.css';
import Header from './components/Header';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import AllBooks from './components/admin/AllBooks';
import AddBook from './components/AddBook';
import AdminLayout from './components/admin/AdminLayout';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ProtectedAdminRoute from './components/admin/ProtectedAdminRoute';

function App() {
  const location = useLocation();

  // Check if the current path starts with /admin
  const isAdminRoute = location.pathname.startsWith("/admin");
  //const hideHeader = /^\/admin(\/|$)/.test(location.pathname);

  return (
    <div className="App">
      {/* Show Header only if NOT on an admin route */}
      {!isAdminRoute && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route element={<ProtectedAdminRoute />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AllBooks />} />
            <Route path="books" element={<AllBooks />} />
            <Route path="add-book" element={<AddBook />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}

export default App; 
