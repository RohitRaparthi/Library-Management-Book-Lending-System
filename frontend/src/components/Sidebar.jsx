import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

function Sidebar() {
  const { user } = useContext(AuthContext);

  return (
    <div
      className='bg-dark text-white p-3 vh-100'
      style={{ width: '250px' }}
    >
      <h4 className='mb-4'>Dashboard</h4>

      <ul className='nav flex-column'>
        <li className='nav-item mb-2'>
          <Link className='nav-link text-white' to='/dashboard'>
            Dashboard
          </Link>
        </li>
        <li className='nav-item mb-2'>
          <Link className='nav-link text-white' to='/books'>
            Books
          </Link>
        </li>

        <li className='nav-item mb-2'>
          <Link className='nav-link text-white' to='/history'>
            Borrow History
          </Link>
        </li>

        {(user?.role === 'admin' ||
          user?.role === 'librarian') && (
          <li className='nav-item mb-2'>
            <Link className='nav-link text-white' to='/manage-books'>
              Manage Books
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
export default Sidebar;