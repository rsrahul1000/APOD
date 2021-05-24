import "./assets/css/styles.css";
import "./App.css";
import { BottomNavbar } from "./layout/BottomNavbar";
import { Home } from "./home/Home";

function App() {
  return (
    <div className="App">
      <Home />
      <BottomNavbar />
    </div>
  );
}

export default App;
