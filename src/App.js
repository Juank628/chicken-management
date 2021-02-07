import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import CostTable from "./components/pages/CostsTable/CostsTable"

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <NavBar />
        <Route path="/cost" exact component={CostTable} />
      </BrowserRouter>
    </div>
  );
}

export default App;
