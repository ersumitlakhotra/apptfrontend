import './css/App.css';
import Login from './pages/entry/login'
import Register from './pages/entry/register';
import ResetPassword from './pages/entry/resetpassword';
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
      </Routes>
    </Router>
  );
}

export default App;
