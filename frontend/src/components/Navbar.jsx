import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className='navbar navbar-dark bg-primary px-4'>
      <h4 className='text-white m-0'>
        Library Management
      </h4>
      <div>
        <span className='text-white me-3'>
          {user?.name}
        </span>

        <button
          className='btn btn-light btn-sm'
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;