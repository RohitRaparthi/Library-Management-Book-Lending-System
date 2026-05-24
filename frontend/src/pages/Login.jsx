import { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import API from '../services/api';
import { AuthContext } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        '/auth/login',
        form
      );

      login(res.data);

      toast.success('Login successful');

      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (error) {
      toast.error(
        error.response?.data?.message ||
        'Login failed'
      );
    }
  };

  return (
    <div className='container vh-100 d-flex justify-content-center align-items-center'>
      <div
        className='card p-4 shadow'
        style={{ width: '400px' }}
      >
        <h2 className='text-center mb-4'>
          Login
        </h2>

        <form onSubmit={handleSubmit}>
          <input
            type='email'
            className='form-control mb-3'
            placeholder='Email'
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <input
            type='password'
            className='form-control mb-3'
            placeholder='Password'
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <button className='btn btn-primary w-100'>
            Login
          </button>
        </form>

        <p className='mt-3 text-center'>
          New User?{' '}
          <Link to='/register'>
            Register
          </Link>
        </p>
      </div>

      {/* Toast Container Here */}
      <ToastContainer
        position='top-right'
        autoClose={3000}
      />
    </div>
  );
}

export default Login;