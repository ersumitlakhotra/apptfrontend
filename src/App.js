import './css/App.css';
import Login from './pages/entry/login'
import Register from './pages/entry/register';
import ResetPassword from './pages/entry/resetpassword';
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
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route path="main" element={<MasterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
