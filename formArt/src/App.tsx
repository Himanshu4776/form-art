import 'bootstrap/dist/css/bootstrap.min.css';
import { Home } from './Components/home';
import {LandingPage} from './Components/page';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/draw" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
