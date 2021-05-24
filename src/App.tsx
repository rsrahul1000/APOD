import "./assets/css/styles.css";
import "./App.css";
import { BottomNavbar } from "./layout/BottomNavbar";
import { Home } from "./home/Home";
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Favorate } from "./favorite/favorite";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={Home}/>
          <Route path='/favorite' component={Favorate}/>
        </Switch>
      </div>
      <BottomNavbar />
    </BrowserRouter>
  );
}

export default App;
