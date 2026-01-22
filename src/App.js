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
 Route,
 BrowserRouter
} from "react-router-dom";

import logo from './Images/logo.png'
import TermsCondition from './pages/TermsConditions/terms.js';
import { AuthProvider } from './auth/authContext.js';
import ProtectedRoute from './auth/protectedRoute.js';
import { Homepage ,Profile,Settings} from './pages/HomePage/homepage.js';
import ProtectedLayout from './auth/protectedLayout.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login logo={logo} />} />
          <Route path="signup" element={<Signup logo={logo} />} />
          <Route path="resetpassword" element={<ResetPassword logo={logo} />} />
          <Route path="main" element={<MasterPage />} />
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="support" element={<Support />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms-conditions" element={<TermsCondition />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/home" element={<Homepage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
