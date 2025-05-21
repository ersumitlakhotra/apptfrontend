import './css/App.css';
import './css/styles.css'
import Login from './pages/Login/login.js';
import ResetPassword from './pages/ResetPassword/resetpassword.js' 
import MasterPage from './pages/main/master';
import Signup from './pages/Signup/signup.js';
import {
 BrowserRouter as Router,
 Routes,
 Route
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="main" element={<MasterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
