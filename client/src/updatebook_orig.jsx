import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const UpdateBook = () => {
  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: ""
  });
  const navigate = useNavigate();
  const { id } = useParams(); // Get book ID from the route parameters

  // Fetch existing book details when the component loads
  useEffect(() => {
    axios
      .get(`http://localhost:3030/getrecord/${id}`)
      .then((res) => {
        setValues({
          publisher: res.data[0].publisher,
          name: res.data[0].name,
          date: res.data[0].date,
        });
      })
      .catch((err) => console.log('Error fetching book details:', err));
  }, [id]);
  
  return (
    <div className="d-flex align-items-center flex-column mt-3">
      <h1>Update Book</h1>
      <form className="w-50" onSubmit={handleSubmit}>
        <div className="mb-3 mt-3">
          <label htmlFor="publisher" className="form-label">
            Publisher:
          </label>
          <input
            type="text"
            className="form-control"
            id="publisher"
            placeholder="Enter Publisher Name"
            name="publisher"
            value={values.publisher} // Bind the input value
            onChange={(e) => setValues({ ...values, publisher: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Book Name:
          </label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Book Name"
            name="name"
            value={values.name} // Bind the input value
            onChange={(e) => setValues({ ...values, name: e.target.value })}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="publish date" className="form-label">
            Publish Date:
          </label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={values.date} // Bind the input value
            onChange={(e) => setValues({ ...values, date: e.target.value })}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateBook;

