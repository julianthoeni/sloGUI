import React, { useEffect, useState } from "react";

import Table from "react-bootstrap/Table";
import "bootstrap/dist/css/bootstrap.min.css";
import { confirm } from "../Confirmation";

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [slos, setSLOS] = useState([]);
  useEffect(() => {
    fetch("/getSLO")
      .then((response) => response.json())
      .then((data) => {
        setIsLoaded(true);
        setSLOS(data);
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
                <th>name</th>
                <th>unit</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {slos.map((name) => (
                <tr>
                  <td>{name.sloid}</td>
                  <td>{name.name}</td>
                  <td>{name.unit}</td>
                  <td>
                    <button
                      type="button"
                      class="btn btn-danger"
                      onClick={() => DeleteSLO(name.sloid)}
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
          <h2>Add new SLO:</h2>
          <form>
            <div class="form-row align-items-center">
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  SLOid
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
                  name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputName"
                  placeholder=""
                ></input>
              </div>
              <div class="col-sm-3 my-1">
                <label class="sr-only" for="inlineFormInputName">
                  unit
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inlineFormInputUnit"
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
              AddSLO(
                document.getElementById("inlineFormInputSLOid").value,
                document.getElementById("inlineFormInputName").value,
                document.getElementById("inlineFormInputUnit").value
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

async function DeleteSLO(sloid) {
  const yn = await confirm(`Are you sure you want to delete sloid ${sloid}`);
  if (yn) {
    await fetch("/deleteSLO", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "deleteSLO",
        sloid: sloid,

      }),
    });
    window.location.reload();
  }
}

async function AddSLO(sloid, name, unit) {
  if (sloid === "" || name === "" || unit === "") return;
  
    await fetch("/addSLO", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        action: "addSLO",
        sloid: sloid,
        name: name,
        unit: unit,
      }),
    });
    window.location.reload();
  
}

export default App;
