import axios from 'axios';

function App() {
  
  const getdetails = async()=>{
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
  };
  return (
    <div className="App">
      <button onClick={getdetails}>
        Show Switch Version
      </button>
    </div>
  );
}

export default App;
