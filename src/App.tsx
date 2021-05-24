import "./assets/css/styles.css";
import "./App.css";
import { BottomNavbar } from "./layout/BottomNavbar";
import { TopNavBar } from "./layout/TopNavBar";
import { Home } from "./home/Home";

function App() {
  return (
    <div className="App">
      <TopNavBar />
      <Home />
      <BottomNavbar />
    </div>
  );
}

export default App;
