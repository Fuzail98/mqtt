import './App.css';
import axios from 'axios';
// import react, {useState} from 'react'

function App() {

  // const [select, setselect] = useState('') 
  
  const getdetails = async()=>{
    // var axios = require('axios');
    var data = JSON.stringify({
      "jk": "sklk"
    });
    var config = {
      method: 'post',
      url: 'http://localhost:8080/off',
      data : data
    };  
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
    // const{data}=await axios.post("http://localhost:8080/off",{
    //   select
    // })
    // console.log(data)
  };
  return (
    <div className="App">
      <button onClick={getdetails}>
        Show Switch Version
      </button>
      {/* <form>
      <label for="Topic">Topic</label>
        <select name="Topic" id="Topic" onChange={e => setselect(e.target.value)}>
        <option value="select">select</option>
          <option value="Coffeemaker">Coffeemaker</option>
          <option value="saab">Saab</option>
          <option value="opel">Opel</option>
        </select>
      </form> */}
    </div>
  );
}

export default App;
