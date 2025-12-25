import './css/App.css';
import './css/styles.css'
import Login from './pages/Login/login.js';
import ResetPassword from './pages/ResetPassword/resetpassword.js' 
import MasterPage from './pages/main/master.js';
import Signup from './pages/Signup/signup.js';
import BookAppointment from './pages/BookAppointment/book-appointment.js';
import Support from './pages/Support/support.js'
import Privacy from './pages/Privacy/privacy.js'
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
        <Route path="support" element={<Support/>} />
        <Route path="privacy-policy" element={<Privacy/>} />
      </Routes>
    </Router>
  );
}

export default App;
