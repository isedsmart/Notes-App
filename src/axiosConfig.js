import axios from 'axios';

// Alter this URL if you want to be able to access other data
// Need to create a json-server on your local device and have it structured similar to db.json
export default axios.create({
  	baseURL: 'http://localhost:8000/notes'
});