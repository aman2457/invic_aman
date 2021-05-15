
import './App.css';

import React from 'react';


function App() {
  
  return (
    <div className="App">
      <h1> Invictus Assignment
      </h1>
      <p> It will find top N most frequently occurring words in the <a href='https://raw.githubusercontent.com/invictustech/test/main/README.md'> file </a> hosted here</p>
      <p> Entering the value and press submit</p>
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
