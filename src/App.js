import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import VariableCostTable from "./components/pages/VariableCostsTable/VariableCostsTable";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Route path="/cost" exact component={VariableCostTable} />
      </BrowserRouter>
    </div>
  );
}

export default App;
