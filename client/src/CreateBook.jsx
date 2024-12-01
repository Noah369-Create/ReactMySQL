import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateBook = () => {
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
  return (
    <div className="d-flex align-items-center flex-column mt-3">
        <h1>Add a Book</h1>
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

export default CreateBook