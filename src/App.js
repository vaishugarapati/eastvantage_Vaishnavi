import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {

  const URL = "https://randomuser.me/api"

  const [name, setName] = useState()
  const [email, setEmail] = useState()
  const [errorMessage, setErrorMessage] = useState()
  const [refreshClick, setRefresh] = useState(true)

  useEffect(() => {
    (async () => {
      let result = await axios.get(URL)
      if (result.data) {
        localStorage.setItem("userDetails", JSON.stringify(result.data))
        if (result.data.results[0]) {
          setName(result.data.results[0].name)
          setEmail(result.data.results[0].email)
        }
      } else {
        setErrorMessage("Some Error Occured. Please try later")
      }
    })();
  }, [refreshClick])

  return (
    <div className="App">
      {name ?
        <div className='userDetails' >
          <p id="name"><b>Name : </b> {`${name.title}. ${name.first} ${name.last}`} </p>
          <p id="email"><b>Email : </b> {`${email}`} </p>
        </div>
        : null}
      {errorMessage ?
        <p id="errorMsg" >{errorMessage}</p>
        : null}
      <button id="refresh" type="button" onClick={() => setRefresh(!refreshClick)} >Refresh</button>
    </div>
  );
}

export default App;
