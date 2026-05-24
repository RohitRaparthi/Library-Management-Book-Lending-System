import { useEffect, useState, useContext } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { AuthContext } from '../context/AuthContext';

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [summary, setSummary] = useState({
    totalBooks: 0,
    issuedBooks: 0,
    totalUsers: 0,
    totalFine: 0
  });
  const fetchSummary = async () => {
    try {
      const res = await API.get(
        '/dashboard/summary'
      );

      setSummary(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (
      user?.role === 'admin' ||
      user?.role === 'librarian'
    ) {
      fetchSummary();
    }
  }, []);

  return (
    <>
      <Navbar />

      <div className='d-flex'>
        <Sidebar />

        <div className='container-fluid p-4'>
          <h2>Welcome, {user?.name}</h2>
          <p>Role: {user?.role}</p>

          {(user?.role === 'admin' ||
            user?.role === 'librarian') && (
            <div className='row mt-4 g-3'>
              <div className='col-md-3'>
                <div className='card shadow p-4'>
                  <h5>Total Books</h5>
                  <h2>{summary.totalBooks}</h2>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='card shadow p-4'>
                    <h5>Issued Books</h5>
                  <h2>{summary.issuedBooks}</h2>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='card shadow p-4'>
                  <h5>Total Users</h5>
                  <h2>{summary.totalUsers}</h2>
                </div>
              </div>

              <div className='col-md-3'>
                <div className='card shadow p-4'>
                  <h5>Total Fine</h5>
                  <h2>₹{summary.totalFine}</h2>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      </>
  );
}

export default Dashboard;