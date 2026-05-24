import { useEffect, useState } from 'react';
import API from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

function ManageBooks() {
  const [books, setBooks] = useState([]);

  const [form, setForm] = useState({
    title: '',
    author: '',
    category: '',
    isbn: '',
    quantity: ''
  });

  const [editingId, setEditingId] = useState(null);
  const fetchBooks = async () => {
    const res = await API.get('/books');
    setBooks(res.data);
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await API.put(
          `/books/${editingId}`,
          form
        );

        alert('Book updated');
      } else {
        await API.post('/books', form);
        alert('Book added');
      }

      setForm({
        title: '',
        author: '',
        category: '',
        isbn: '',
        quantity: ''
      });

      setEditingId(null);
      fetchBooks();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const editBook = (book) => {
    setForm(book);
    setEditingId(book.id);
  };
  const deleteBook = async (id) => {
    if (!window.confirm('Delete book?')) return;

    await API.delete(`/books/${id}`);
    fetchBooks();
  };

  return (
    <>
      <Navbar />

      <div className='d-flex'>
        <Sidebar />

        <div className='container-fluid p-4'>
          <h2>Manage Books</h2>

          <div className='card p-4 shadow mb-4'>
            <form onSubmit={handleSubmit}>
              <div className='row'>
                <div className='col-md-4'>
                  <input
                    className='form-control mb-3'
                     placeholder='Title'
                    value={form.title}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        title: e.target.value
                      })
                    }
                  />
                </div>

                <div className='col-md-4'>
                  <input
                    className='form-control mb-3'
                    placeholder='Author'
                    value={form.author}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        author: e.target.value
                      })
                    }
                  />
                  </div>

                <div className='col-md-4'>
                  <input
                    className='form-control mb-3'
                    placeholder='Category'
                    value={form.category}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        category: e.target.value
                      })
                    }
                  />
                </div>

                <div className='col-md-4'>
                  <input
                    className='form-control mb-3'
                    placeholder='ISBN'
                    value={form.isbn}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isbn: e.target.value
                      })
                    }
                  />
                </div>

                <div className='col-md-4'>
                  <input
                    type='number'
                    className='form-control mb-3'
                    placeholder='Quantity'
                    value={form.quantity}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        quantity: e.target.value
                      })
                    }
                  />
                </div>
              </div>

              <button className='btn btn-success'>
                {editingId ? 'Update Book' : 'Add Book'}
              </button>
            </form>
          </div>

          <table className='table table-hover shadow'>
            <thead className='table-dark'>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Category</th>
                <th>Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.category}</td>
                  <td>{book.quantity}</td>

                  <td>
                    <button
                      className='btn btn-warning btn-sm me-2'
                      onClick={() => editBook(book)}
                    >
                      Edit
                    </button>

                    <button
                      className='btn btn-danger btn-sm'
                      onClick={() => deleteBook(book.id)}
                    >
                      Delete
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
export default ManageBooks;