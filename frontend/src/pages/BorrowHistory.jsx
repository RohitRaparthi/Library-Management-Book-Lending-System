import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function BorrowHistory() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await API.get('/issues/history');
    setHistory(res.data);
  };

  const returnBook = async (id) => {
    const res = await API.put(
      `/issues/${id}/return`
    );

    alert(`Fine: ₹${res.data.fine}`);
    fetchHistory();
  };
   useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <>
      <Navbar />

      <div className='d-flex'>
        <Sidebar />

        <div className='container-fluid p-4'>
          <h2>Borrow History</h2>

          <table className='table table-hover shadow'>
            <thead className='table-dark'>
              <tr>
                <th>Book</th>
                <th>Author</th>
                <th>Issue Date</th>
                <th>Due Date</th>
                <th>Status</th>
                 <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {history.map((item) => (
                <tr key={item.id}>
                  <td>{item.title}</td>
                  <td>{item.author}</td>
                  <td>
                    {new Date(
                      item.issue_date
                    ).toLocaleDateString()}
                  </td>
                  <td>
                    {new Date(
                      item.due_date
                    ).toLocaleDateString()}
                  </td>
                  <td>{item.status}</td>

                  <td>
                     {item.status === 'issued' && (
                      <button
                        className='btn btn-success btn-sm'
                        onClick={() =>
                          returnBook(item.id)
                        }
                      >
                        Return
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default BorrowHistory;