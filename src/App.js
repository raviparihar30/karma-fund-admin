import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AllRoutes from "./all-routes";
import UserContextProvider from "./context/user";

function App() {
  return (
    <Router>
      <UserContextProvider>
        <AllRoutes />
      </UserContextProvider>
    </Router>
  );
}

export default App;
