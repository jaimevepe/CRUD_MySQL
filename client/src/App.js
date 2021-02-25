import './App.css';
import {useState} from "react";
import axios from "axios";

function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);

  const [newWage, setNewWage] = useState(0)

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
    .then(()=> {
      setEmployeeList([ // will show employee without having to press show emp again
        ...employeeList, {
            name: name,
            age: age,
            country: country,
            position: position,
            wage: wage
        }
      ])
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
      .catch(err => console.log(err))
  }

  const updateWage = (id) => {
    axios.put("http://localhost:3001/update", { wage: newWage, id: id })
    .then(() => {
        setEmployeeList(
          employeeList.map((val) => {
            return val.id === id
              ? {
                  id: val.id,
                  name: val.name,
                  country: val.country,
                  age: val.age,
                  position: val.position,
                  wage: newWage,
                }
              : val;
            })
          );
      })
      .catch(err => {
        console.log(err)
      })
  };

  const deleteEmployee = (id) => {
    axios.delete(`http://localhost:3001/delete/${id}`)
      .then(() => {
        setEmployeeList(employeeList.filter((val) => {
          return val.id !== id
        }))
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="App">
      <div className="info">
        <label>Name:</label>
        <input 
          required
          placeholder="Enter Name..."
          type="text"
          onChange={(e)=> { //storing input values into name state
            setName(e.target.value)
          }}
        />
        <label>Age:</label>
        <input 
          required
          placeholder="Enter Age..."
          type="number"
          onChange={(e)=> {
            setAge(e.target.value)
          }}
        />
        <label>Country:</label>
        <input 
          required
          placeholder="Enter Country..."
          type="text"
          onChange={(e)=> {
            setCountry(e.target.value)
          }}
        />
        <label>Position:</label>
        <input 
          required
          placeholder="Enter Position..."
          type="text"
          onChange={(e)=> {
            setPosition(e.target.value)
          }}
        />
        <label>Wage (year):</label>
        <input
          required
          placeholder="Enter Wage..." 
          type="number"
          onChange={(e)=> {
            setWage(e.target.value)
          }}
        />
       </div>
       <div className="btn">
        <button onClick={addEmployee}>Add Employee</button>
        <button onClick={getEmployess}>Show Employees</button>
       </div>
       

        {employeeList.map((val, key) => {
          return <div key={val.id}> 
                  <div className="employee">
                  <h3>Name: <p>{val.name}</p></h3>
                  <h3>Age: <p>{val.age}</p></h3>     
                  <h3>Country: <p>{val.country}</p></h3>     
                  <h3>Position: <p>{val.position}</p></h3>     
                  <h3>Wage: <p>{val.wage}</p></h3> 

                  <div className="update"> 
                    <input 
                      type="text" 
                      placeholder="Update wage"
                      onChange={(e) => {
                      setNewWage(e.target.value)
                    }}
                    /> 
                    <button onClick={() => {updateWage(val.id)}}>Update</button>
                    <br/>
                    <br/>
                    <button onClick={() => {deleteEmployee(val.id)}}>Delete</button>
                    
                   </div>    
                  </div>
                           
                </div>
        })}
      
    </div>
  );
}

export default App;
