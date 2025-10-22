import './css/App.css';
import './css/styles.css'
import Login from './pages/Login/login.js';
import ResetPassword from './pages/ResetPassword/resetpassword.js' 
import MasterPage from './pages/main/master.js';
import Signup from './pages/Signup/signup.js';
import BookAppointment from './pages/BookAppointment/book-appointment.js';
import {
 BrowserRouter as Router,
 Routes,
 Route
} from "react-router-dom";

import logo from './Images/logo.png'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login logo={logo} />} />
        <Route path="signup" element={<Signup   logo={logo}/>} />
        <Route path="resetpassword" element={<ResetPassword logo={logo} />} />
        <Route path="main" element={<MasterPage />} />
        <Route path="book-appointment" element={<BookAppointment />} />
      </Routes>
    </Router>
  );
}

export default App;
