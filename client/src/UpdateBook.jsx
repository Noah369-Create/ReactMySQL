import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';


const UpdateBook = () => {
  const {id} = useParams()
  const [values, setValues] = useState({
    publisher: " ",
    name: " ",
    date: " "
  })
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    axios.post('http://localhost:3030/create', values)
    .then(res => navigate('/'))
    .catch(err => console.log(err))
  }
  useEffect(() => {
    axios
      .get('http://localhost:3030/getrecord/'+id)  // Your API endpoint
      .then((res) => 
        setValues({
          ...values,
           publisher: res.data.publisher,
           name: res.data.name,
           date: res.data.date 
          })
        
        // Ensure res.data is an array before setting it
        if (Array.isArray(res.data)) {
          setBooks(res.data);
        } else {
          console.error('Expected an array of books but received:', res.data);
          setBooks([]);  // If not an array, set empty array
        }
      })
    )
      .catch(err => {
        console.error('Error fetching books:', err);
        setError(err);  // Set error state if there is an issue
      })
      .finally(() => {
        setLoading(false);  // Set loading to false after the request completes
      });
  }, []); 
  if (loading) {
    return <div className="container mt-5">Loading...</div>;
  }

  if (error) {
    return <div className="container mt-5">Error fetching books: {error.message}</div>;
  }

  return (
    <div className="d-flex align-items-center flex-column mt-3">
    <h1>Update Book</h1>
  <form className="w-50" onSubmit={handleSubmit}>
    <div class="mb-3 mt-3">
      <label for="publisher" class="form-label">
        Publisher:
      </label>
      <input 
      type="text" 
      class="form-control" 
      id="publisher"
      placeholder="Enter Publisher Name"
      name="publisher"
      onChange={(e) => setValues({...values, publisher: e.target.value})}
      />
    </div>
    <div class="mb-3">
      <label for="name" class="form-label">
        Book Name:
      </label>
      <input 
      type="text" 
      class="form-control" 
      placeholder="Enter Book Name" 
      name="name"
      onChange={(e) => setValues({...values, name: e.target.value})}
      />
    </div>
    <div class="mb-3">
      <label for="publish date" class="form-label">
        Publish Date:
      </label>
      <input 
      type="date" 
      class="form-control" 
      name="date"
      onChange={(e) => setValues({...values, date: e.target.value})}
      />
    </div>
    <button type="submit" class="btn btn-primary">
      Submit
    </button>
  </form>
</div>
  )
}

export default UpdateBook