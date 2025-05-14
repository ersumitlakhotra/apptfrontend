import './css/App.css';
import './css/styles.css'
import Login from './pages/Login/login.js';
import Register from './pages/Register/register.js';
import ResetPassword from './pages/ResetPassword/resetpassword.js' 
import MasterPage from './pages/main/master';
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
        <Route path="register" element={<Register />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="main" element={<MasterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
