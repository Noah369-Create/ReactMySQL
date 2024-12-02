import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);  // Initialize with an empty array 
  useEffect(() => {
    axios
      .get('http://localhost:3030')  // Your API endpoint
      .then((res) => setBooks(res.data))   
      .catch((err) => console.log(err))     
  }, []);  // Empty dependency array means this runs once when the component mounts
  const handleDelete = (id) => {
    axios
      .delete('http://localhost:3030/delete/'+id)
      .then(res => window.location.reload())
      .catch(err => console.log(err))
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.publisher}</td>
                <td>{book.name}</td>
                <td>{book.date}</td>
                <td>
                  <Link to={'/update/${book.id}'} className='btn btn-info btn-sm me-3'>Update</Link>
                  <button type="button" onClick={() => handleDelete(book.id)} className='btn btn-danger btn-sm'>Delete</button>
                </td>
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
