# sloGUI

## Start server
1) Define a config.json inside the server-folder
    Template:
    ```
    {
      "host": "",
      "user": "",
      "password": "",
      "database": "",
      "connectionLimit": 5,
      "client_port": 5000
    }

    ```
2) Start the server:
    ```
    npm run dev
    ```
## Start client 
1) (optinal) The client uses `http://localhost:5000` as default for the backend. This can be adjusted inside the `package.json`-file under `"proxy": "http://localhost:5000",`
The client will be accessible under `http://localhost:3000`
2) Start the client:
```
npm start
```