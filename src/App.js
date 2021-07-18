import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import LoadData from "./components/LoadData/LoadData";
import NavBar from "./components/NavBar/NavBar";
import Home from "./components/pages/Home/Home";
import VariableCostTable from "./components/pages/VariableCostsTable/VariableCostsTable";
import RecipesTable from "./components/pages/RecipesTable/RecipesTable";
import Recipe from "./components/pages/Recipe/Recipe";

function App() {
  return (
    <div className="App">
      <LoadData />
      <BrowserRouter>
        <NavBar />
        <Route path="/" exact component={Home} />
        <Route path="/variable-costs" exact component={VariableCostTable} />
        <Route path="/recipes-table" exact component={RecipesTable} />
        <Route path="/recipe/:id?" exact component={Recipe} />
      </BrowserRouter>
    </div>
  );
}

export default App;
