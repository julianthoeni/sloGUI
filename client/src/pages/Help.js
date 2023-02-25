import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div class="container">
      <h1>SLO</h1>
      
      <ul>
        <li><h5>sloid: unique number</h5></li>
        <li><h5>name: name of the slo</h5></li>
        <li><h5>unit: Unit of the SLO</h5></li>
      </ul>

      <h1>Rule</h1>
      <ul>
        <li><h5>Rule: Create or delete rule</h5></li>
        <li><h5>sloid: sloid</h5></li>
        <li><h5>functiontype: name of the function - which must be contained inside the name of the lambda-function (!important)</h5></li>
        <li><h5>e.g.: functiontype=myTestFunction, --- arn could be: arn:aws:lambda:us-east-1:166718235811:function:xwf01_myTestFunction</h5></li>
        <li><h5>constraintType: Select constraint or objective</h5></li>
        <li><h5>Important to note: sloid and functiontype are composite primary key. So one sloid can be used more than once. Rule must always contain a constraint and can have additional objectives</h5></li>
      </ul>

      <h1>Period</h1>
      <ul>
        <li><h5>Period: Create or delete period</h5></li>
        <li><h5>sloid: sloid: sloid</h5></li>
        <li><h5>period: define the period (week: [w], days: [d], hours: [h], minutes: [m]). e.g. "24h" or "1d" for 1day period</h5></li>
        <li><h5>value: The value which defines the SLO</h5></li>
        <li><h5>operator: How the value will be used (More than, Less than, Equal)</h5></li>
        <li><h5>budget: which budget should the slo have</h5></li>
      </ul>
      <br></br>
      <h1>For more information:</h1>
      <h5><a href='https://github.com/julianthoeni/sloGUI'>Github: SLO_GUI</a></h5>
      <h5><a href='https://github.com/julianthoeni/enactmentengine'>Github: enactmentengine</a></h5>
    </div>
  );
}

export default App;
