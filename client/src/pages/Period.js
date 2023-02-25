import React, { useEffect, useState }from "react";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { confirm } from "../Confirmation";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [periods, setPeriod] = useState([]);
  useEffect(() => {
    fetch("/getPeriod")
      .then((response) => response.json())
      .then((data) => {
        setIsLoaded(true);
        setPeriod(data);
      });
  }, []);

  return (
    <div class="container">
      {!isLoaded ? (
        <p>Loading...</p>
      ) : (
        <div>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>sloid</th>
                <th>period</th>
                <th>value</th>
                <th>operator</th>
                <th>budget</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {periods.map((name) => (
                <tr>
                  <td>{name.sloid}</td>
                  <td>{name.period}</td>
                  <td>{name.value}</td>
                  <td>{name.operator}</td>
                  <td>{name.budget}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => DeletePeriod(name.sloid,name.period)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <br></br>
          <br></br>
          <h2>Add new Period:</h2>
          <form>
            <div class="form-row align-items-center">
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  sloid
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputSLOid"
                  placeholder=""
                ></input>
              </div>
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  period
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputperiod"
                  placeholder=""
                ></input>
              </div>
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  value
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputvalue"
                  placeholder=""
                ></input>
              </div>
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  operator
                </label>
                <select
                  class="form-select"
                  id="selector"
                  aria-label="Default select example"
                >
                  <option selected>Select operator</option>
                  <option value="<">LT</option>
                  <option value="=">EQ</option>
                  <option value=">">GT</option>
                </select>
              </div>
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  budget
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputbudget"
                  placeholder=""
                ></input>
              </div>

              <div class="col-auto my-1">
                <br></br>
              </div>
            </div>
          </form>
          <button
            type="submit"
            class="btn btn-primary"
            onClick={() =>
              AddPeriod(
                document.getElementById("inlineFormInputSLOid").value,
                document.getElementById("inlineFormInputperiod").value,
                document.getElementById("inlineFormInputvalue").value,
                document.getElementById("selector").value,
                document.getElementById("inlineFormInputbudget").value
              )
            }
          >
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

async function DeletePeriod(sloid, period) {
  const yn = await confirm(`Are you sure you want to delete period ${sloid} ${period}`);
  if (yn) {
    await fetch("/deletePeriod", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "deleteRule",
        sloid: sloid,
        period: period
      }),
    });
    window.location.reload();
  }
}

async function AddPeriod(sloid, period, value, operator, budget) {
  if (
    sloid === "" ||
    period === "" ||
    value === "" ||
    period === "" ||
    operator === "Select constraintType"
  )
    return;
  
    await fetch("/addPeriod", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "addSLO",
        sloid: sloid,
        period: period,
        value: value,
        operator: operator,
        budget: budget
      }),
    });
    window.location.reload();
  
}

export default App;
