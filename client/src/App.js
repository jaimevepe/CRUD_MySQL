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
        setEmployeeList(response.data)
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

        {employeeList.map((val, key) => {
          return <div className="employee"> 
                  <h3>Name: <p>{val.name}</p></h3>
                  <h3>Age: <p>{val.age}</p></h3>     
                  <h3>Country: <p>{val.country}</p></h3>     
                  <h3>Position: <p>{val.position}</p></h3>     
                  <h3>Wage: <p>{val.wage}</p></h3>             
                </div>
        })}
      </div>
    </div>
  );
}

export default App;
