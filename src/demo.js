
import './App.css';
import React, {useEffect, useState} from "react";
import Axios from "axios";

import Tweet from "./components/Tweet";
function App() {


    const [number, setNumber] = useState("");
    const [ans, setAns] = useState([]);
    const [error, setError]= useState("None");
    const [render, setRender] = useState(true);



    const  search = async (e)=>{

        e.preventDefault();
        //alert("function called")
        if (number!="") {

            try {
                await Axios.post("/findResult", {query: number})
                    .then(async (res) => {
                        //alert(res.data)

                        const data = await res.data

                        //alert(JSON.stringify(data))
                        await setAns(data)
                        //alert(data)
                        //alert(`${ans[0].rollNo} ${ans[0].result}`)
                    })
                    .catch((err) => {
                        setRender(false)
                        //alert(err)
                        setError(err)

                    });
            }
            catch (errorCaught) {
                setRender(false)
                setError(errorCaught)
                //alert(error)
            }
        }else{
            alert("please provide a valid no.")
        }


    }
        //alert(`search function called, number ${number}`)
    return (

        <div className="App">
            <form onSubmit={ search}>
            <input type="text" id="search" value={number} onChange={(e)=>setNumber(e.target.value)} className="search" placeholder="Search result ..." />
            <input type="submit" onSubmit={search}/>
            </form>
            <p>result will be display below</p>
            {

                (error=="None" && render && ans.length>0 ) ? (
                    <div className="card bg-light">
                        <div className="card-body">

                            <table className="table table-striped table-light table-sm">
                                <caption>*Result found for {ans.length} student{(ans.length>1)? <span>s</span> : "" }. </caption>
                                <thead>
                                <tr>
                                    <th scope="col">Roll No.</th>
                                    <th scope="col">Result</th>
                                </tr>
                                </thead>
                                <tbody>
                                {
                                    ans.map(item =>{
                                        return(
                                            <tr>
                                                <th scope="row">{item.rollNo}</th>
                                                <td>{item.result}</td>
                                            </tr>
                                        );

                                    })
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                )
                    : (error!="None") ? <p>error occurred {error}</p> : <p>All is well</p>

            }


        </div>


    );
}

export default App;



/*

class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { number: '' };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
    alert("You are submitting " + this.state.number);
  }
function countWords() {//Edge case: an empty array
  let url = 'https://www.example.com?name=n1&name=n2';
  let str = (new URL(url)).searchParams;
  if (str.length === 0) 
  {return {};}
  var output = {};
  var strArr = str.split(" ")
  //A loop
  for (var i=0; i < strArr.length; i++) 
  {var word = strArr[i];
    if (output[word] === undefined) 
    {output[word] = 1;} 
    else {output[word] += 1;}
  }
    
  return output;
}

function printInput(){
  alert(document.getElementById('userInt').value);
}

