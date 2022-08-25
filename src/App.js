import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Adduser from "./page/Adduser";
import Editemployee from "./page/Editemployee";
import Home from "./page/Home";
import Viewemployee from "./page/Viewemployee";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/add-employee">
          <Adduser />
        </Route>
        <Route path="/edit-employee/:id">
          <Editemployee />
        </Route>
        <Route path="/view-employee/:id">
          <Viewemployee />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
