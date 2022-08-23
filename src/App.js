import "./../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Adduser from "./page/Adduser";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/">
          Home
        </Route>
        <Route path="/add-employee">
          <Adduser />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
