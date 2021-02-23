import './App.css';
import {useState} from "react";


function App() {

  const [name, setName] = useState('');
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState('');
  const [position, setPosition] = useState('');
  const [wage, setWage] = useState(0);


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

        <button>Add Employee</button>
      </div>
    </div>
  );
}

export default App;
