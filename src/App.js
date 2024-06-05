import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import AppRoutes from "./components/AppRoutes";

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <div style={{paddingTop: "60px"}}>
          <AppRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
