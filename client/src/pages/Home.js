import React, { useEffect, useState } from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [api, setAPI] = useState([]);
  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setIsLoaded(true);
        setAPI(data);
      });
  }, []);

  return (
    <div class="container">
      <div class="container">
      <h2>Graphical User Interface for adapting SLOs, Rules and periods</h2>
      <br></br><br></br><br></br>
      <h5>Connection to backend:  {!isLoaded ? (
        <h2 style={{ color: 'red' }}>Connection failed</h2>
      ) : (
        <h2 style={{ color: 'green' }}>Connected</h2>
      )}</h5>
    </div>
     
    </div>
  );
}



export default App;

