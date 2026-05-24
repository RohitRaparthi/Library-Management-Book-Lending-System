import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';
import { toast, ToastContainer } from 'react-toastify';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post('/auth/register', form);
      toast.success('Registration successful');
      navigate('/');
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className='container mt-5'>
      <div className='card p-4 shadow mx-auto' style={{ maxWidth: '400px' }}>
        <h2 className='text-center mb-4'>Register</h2>

        <form onSubmit={handleSubmit}>
          <input className='form-control mb-3' placeholder='Name'
          onChange={(e)=>setForm({...form,name:e.target.value})}/>

          <input className='form-control mb-3' placeholder='Email'
          onChange={(e)=>setForm({...form,email:e.target.value})}/>

          <input type='password' className='form-control mb-3' placeholder='Password'
          onChange={(e)=>setForm({...form,password:e.target.value})}/>

          <select className='form-select mb-3'
          onChange={(e)=>setForm({...form,role:e.target.value})}>
            <option value='student'>Student</option>
            <option value='librarian'>Librarian</option>
          </select>

          <button className='btn btn-success w-100'>
            Register
          </button>
        </form>
        <ToastContainer
          position='top-right'
          autoClose={3000}
        />
      </div>
    </div>
  );
}

export default Register;