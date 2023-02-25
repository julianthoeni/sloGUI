import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { confirm } from "../Confirmation";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [rules, setRule] = useState([]);
  useEffect(() => {
    fetch("/getRule")
      .then((response) => response.json())
      .then((data) => {
        setIsLoaded(true);
        setRule(data);
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
                <th>functiontype</th>
                <th>constraintType</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {rules.map((name) => (
                <tr>
                  <td>{name.sloid}</td>
                  <td>{name.functiontype}</td>
                  <td>{name.constraintType}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => DeleteRule(name.sloid)}
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
          <h2>Add new Rule:</h2>
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
                  functiontype
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputfunctiontype"
                  placeholder=""
                ></input>
              </div>
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  constraintType
                </label>
                <select
                  class="form-select"
                  id="selector"
                  aria-label="Default select example"
                >
                  <option selected>Select constraintType</option>
                  <option value="constraint">Constraint</option>
                  <option value="objective">Objective</option>
                </select>
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
              AddRule(
                document.getElementById("inlineFormInputSLOid").value,
                document.getElementById("inlineFormInputfunctiontype").value,
                document.getElementById("selector").value
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

async function DeleteRule(sloid, a) {
  const yn = await confirm(`Are you sure you want to delete rule ${sloid}`);
  if (yn) {
    await fetch("/deleteRule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "deleteRule",
        sloid: sloid,
      }),
    });
    window.location.reload();
  }
}

async function AddRule(sloid, ft, ct) {
  if (sloid === "" || ft === "" || ct === "Select constraintType") return;
  
    await fetch("/addRule", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "addSLO",
        sloid: sloid,
        ft: ft,
        ct: ct,
      }),
    });
    window.location.reload();
  
}

export default App;
