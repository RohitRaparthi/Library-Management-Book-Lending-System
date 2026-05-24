import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import BookCatalog from './pages/BookCatalog';
import ManageBooks from './pages/ManageBooks';
import BorrowHistory from './pages/BorrowHistory';
import ProtectedRoute from './routes/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />

          <Route
            path='/register'
            element={<Register />}
            />

          <Route
            path='/dashboard'
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path='/books'
            element={
              <ProtectedRoute>
                <BookCatalog />
              </ProtectedRoute>
            }
          />

          <Route
            path='/manage-books'
            element={
              <ProtectedRoute>
                <ManageBooks />
              </ProtectedRoute>
            }
          />

          <Route
            path='/history'
            element={
              <ProtectedRoute>
                <BorrowHistory />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;