
import './App.css';

import React from 'react';


function App() {
  
  return (
    <div className="App">
      <h1> Invictus Assignment
      </h1>
      <form name='userInput' id="userForm">
  <label>
    Enter a Number:
    <input type="number" name="number" id="userInt" />
  </label>
  <input type="submit" />
</form>
      
    </div>
  );
}

export default App;
