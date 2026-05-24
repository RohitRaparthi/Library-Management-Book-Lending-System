import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function BookCatalog() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  const fetchBooks = async () => {
    try {
      const res = await API.get(
        `/books?search=${search}`
      );

      setBooks(res.data);
    } catch (error) {
      console.log(error);
    }
  };
  const borrowBook = async (id) => {
    try {
      const res = await API.post('/issues', {
        bookId: id
      });

      alert(res.data.message);
      fetchBooks();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, [search]);

  return (
    <>
      <Navbar />

      <div className='d-flex'>
        <Sidebar />

        <div className='container-fluid p-4'>
          <h2 className='mb-4'>Books</h2>

          <input
            type='text'
            className='form-control mb-4'
            placeholder='Search books'
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

          <table className='table table-hover shadow'>
            <thead className='table-dark'>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
              </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>

                  <td>
                    <span
                      className={`badge ${
                        book.available_quantity > 0
                          ? 'bg-success'
                          : 'bg-danger'
                      }`}
                    >
                      {book.available_quantity > 0
                        ? 'Available'
                        : 'Unavailable'}
                    </span>
                  </td>
                  <td>
                    <button
                      className='btn btn-primary btn-sm'
                      onClick={() => borrowBook(book.id)}
                    >
                      Borrow
                    </button>
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

export default BookCatalog;