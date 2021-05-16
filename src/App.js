
import './App.css';
import React, {useEffect, useState} from "react";
import axios from "axios";

function App() {

  //initializing the  required variables
  const [num, setNum] = useState("");
  const [frequencyArr, setFrequencyArr] = useState([]);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState([]);


  // storing url for fetching the target file
  const API_BASE_URL = "https://raw.githubusercontent.com/invictustech/test/main/README.md"


  //default function which excute on the loading of page
    useEffect(()=>{

      //calling the frequency compuattion functions
        fetchFrequency();
    }, []);


    //main function for frequency computation
    const fetchFrequency = ()=>{

      // it will fetch the data from the url
        axios.get(API_BASE_URL)
            .then(async  (res) =>  {
                
              
                //stroing the contents of file into a variable(string)
                const data = await res.data


                //split the content on basis of space
                const strArr = data.split(' ');

                //object which store the data as key value pair
                const map = {};

                for (const word of strArr) {
                    if (map.hasOwnProperty(word)) {
                        map[word]++;
                    } else {
                        map[word] = 1;
                    }
                }

                // converting into a 2D array
                let frequencyArr= Object.keys(map).map(key => [key, map[key]]);

                // sorting into descending order
                frequencyArr.sort((a, b) => b[1] - a[1]);

                
                
                 // setting the final output 
                setFrequencyArr(frequencyArr);

                setCalculated(true);
            })

            .catch(err => {
                console.log(err)

            });

    }

    // fetching the input value from input field
    function handleChange(e) {
        setNum(e.target.value)
    }


// submit function which fetches the required information
      async function handleSubmit(e) {
        
        //it prevents the refreshing
        e.preventDefault();
        
        if (!calculated){
          await fetchFrequency();
          
        }

        await
        setResult(frequencyArr.slice(0, parseInt(num)).map(el => [el[0], el[1]]));
       //console.log(frequencyArr.slice(0, parseInt(num)).map(el => [el[0], el[1]]))


    }

    
  return (
    <div className="App">
      
        <div className="card">
            <div className="card-header">
                <label htmlFor="num" className="form-label">Enter the value of N to find most frequent terms</label>
               <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <input id="num" type="text" className="form-control rounded-start" placeholder="number" onChange={handleChange} value={num} />
                    <button className="input-group-text" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg"
                             width="16" height="16" fill="currentColor"
                             className="bi bi-search"
                             viewBox="0 0 16 16">
                            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                        </svg>
                    </button>
                </div>
               </form>
            </div>
            <div className="card-body text-center">
                {
                    (result && result.length > 0) ?

                        (
                            <table className="table">
                                <thead>
                                <tr>
                                    {/*<th scope="col">#Top</th>*/}
                                    <th scope="col">Word</th>
                                    <th scope="col">Frequency</th>

                                </tr>
                                </thead>
                                <tbody>

                                {
                                    result.map(item => {
                                        return (
                                            <tr>
                                                <th scope="row"><span className="badge bg-info rounded-pill">{item[0]}</span></th>
                                                <td>{item[1]}</td>
                                            </tr>
                                        );

                                    })
                                }
                                </tbody>
                            </table>

                        )  :

                        <p>Output will be shown here</p>

                }

            </div>
            <div className="card-footer text-muted">
                {
                    (result && result.length > 0) ?
                        <p> Displaying result for {num} most frequent words </p>
                     :
                        <p>*Result will be displayed here </p>

                }

            </div>
        </div>

    </div>
  );
}

export default App;
