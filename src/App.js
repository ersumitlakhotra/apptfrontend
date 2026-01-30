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
import Homepage  from './pages/HomePage/homepage.js';
import ProtectedLayout from './auth/protectedLayout.js';
import Setting from './pages/Setting/setting.js';
import Tasks from './pages/Tasks/tasks.js';
import Order from './pages/Order/order.js';
import Event from './pages/Event/event.js';
import Customer from './pages/Customer/customer.js';
import Services from './pages/Services/services.js';
import Users from './pages/Users/users.js';
import Schedule from './pages/Schedule/schedule.js';
import Dashboard from './pages/Dashboard/dashboard.js';
import QRcode from './components/Setting/QRcode/qrcode.js';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login logo={logo} />} />
          <Route path="signup" element={<Signup logo={logo} />} />
          <Route path="resetpassword" element={<ResetPassword logo={logo} />} />
         {/*<Route path="main" element={<MasterPage />} />*/} 
          <Route path="book-appointment" element={<BookAppointment />} />
          <Route path="support" element={<Support />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="terms-conditions" element={<TermsCondition />} />

          {/* Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<ProtectedLayout />}>
              <Route path="/home" element={<Homepage />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/calender" element={<Tasks />} />
              <Route path="/appointment" element={<Order />} />
              <Route path="/event" element={<Event />} />
              <Route path="/customers" element={<Customer />} />
              <Route path="/services" element={<Services />} />
              <Route path="/users" element={<Users />} />
              <Route path="/schedule" element={<Schedule />} />
              <Route path="/help" element={<Support />} />
              <Route path="/scanQR" element={<QRcode />} />
              <Route path="/setting" element={<Setting />} />
            </Route>
          </Route>
          
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
