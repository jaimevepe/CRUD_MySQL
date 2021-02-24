import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [employeeList, setEmployeeList] = useState([])

  const addEmployee = () => {
    axios.post('http://localhost:3001/create', { //sending this obj to the back end
      name: name,                          //which have to match the back end variables
      age: age,
      country: country,
      position: position,
      wage: wage
    })
    .then(response => {
      if(!response.ok){ // TODO: if not ok, stop and throw an error
        console.log(response.data)
       }
      console.log(response)
    })
    .catch(err => {
      console.error("Error from Axios.Post")
    })
  }

  const getEmployess = () => {
    axios.get("http://localhost:3001/employees")
      .then(response => {
        console.log(response.data)
      })
  }

  return (
    <div className="App">
      <div className="info">
        <label>Name:</label>
        <input 
        type="text"
        onChange={(e)=> { //storing input values into name state
          setName(e.target.value)
        }}
        />
        <label>Age:</label>
        <input 
          type="number"
          onChange={(e)=> {
            setAge(e.target.value)
          }}
        />
        <label>Country:</label>
        <input 
          type="text"
          onChange={(e)=> {
            setCountry(e.target.value)
          }}
        />
        <label>Position:</label>
        <input 
          type="text"
          onChange={(e)=> {
            setPosition(e.target.value)
          }}
        />
        <label>Wage (year):</label>
        <input 
          type="number"
          onChange={(e)=> {
            setWage(e.target.value)
          }}
        />

        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={getEmployess}>Show Employees</button>
      </div>
    </div>
  );
}

export default App;
