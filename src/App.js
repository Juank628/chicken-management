import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LoadData from "./components/LoadData/LoadData";
import NavBar from "./components/NavBar/NavBar";
import VariableCostTable from "./components/pages/VariableCostsTable/VariableCostsTable";

function App() {
  return (
    <div className="App">
      <LoadData />
      <BrowserRouter>
        <NavBar />
        <Route path="/cost" exact component={VariableCostTable} />
      </BrowserRouter>
    </div>
  );
}

export default App;
