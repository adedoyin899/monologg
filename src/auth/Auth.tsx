import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuthStore } from '@/app/stores/auth';
import AuthSupport from './AuthSupport';
import ForgotPassword from './ForgotPassword';
import OtpVerify from './OtpVerify';
import Register from './Register';
import SignIn from './SignIn';
import Welcome from './Welcome';

/** PWA-01: welcome, register (audience choice up front), sign-in, OTP, forgot, support. */
export default function Auth() {
  const user = useAuthStore((state) => state.user);
  if (user) {
    return <Navigate to={user.userType === 'talent' ? '/creator' : '/client'} replace />;
  }

  return (
    <Routes>
      <Route index element={<Welcome />} />
      <Route path="register" element={<Register />} />
      <Route path="signin" element={<SignIn />} />
      <Route path="otp" element={<OtpVerify />} />
      <Route path="forgot" element={<ForgotPassword />} />
      <Route path="support" element={<AuthSupport />} />
    </Routes>
  );
}
