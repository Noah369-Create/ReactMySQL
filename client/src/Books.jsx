import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);  // Initialize with an empty array
  const [loading, setLoading] = useState(true);  // Track loading state
  const [error, setError] = useState(null);  // Track error state

  useEffect(() => {
    axios
      .get('http://localhost:3030')  // Your API endpoint
      .then(res => {
        // Ensure res.data is an array before setting it
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          console.error('Expected an array of books but received:', res.data);
          setBooks([]);  // If not an array, set empty array
        }
      })
      .catch(err => {
        console.error('Error fetching books:', err);
        setError(err);  // Set error state if there is an issue
      })
      .finally(() => {
        setLoading(false);  // Set loading to false after the request completes
      });
  }, []);  // Empty dependency array means this runs once when the component mounts

  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error fetching books: {error.message}</div>;
  }

  return (
    <div className="container mt-5">
      <Link to="/create" className="btn btn-success">Create Book</Link>

      {books.length !== 0 ? (
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Publisher</th>
              <th scope="col">Book Name</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.publisher}</td>
                <td>{book.name}</td>
                <td>{book.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Records Available</h2>
      )}
    </div>
  );
};

export default Books;
