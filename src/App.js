import react from "react";
import { Route,Routes } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ForgotPassVerifyEmail from "./Pages/ForgotPass-verifyemail";
import ForgotPassVerifyOtp from "./Pages/ForgotPass-Verify-Otp";
import ForgotPasswordChangePass from "./Pages/ForgotPassword-ChangePass";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login/>}></Route>
      <Route path="/homepage"  element={<HomePage/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/forgot-email-verify" element={<ForgotPassVerifyEmail/>}/>
      <Route path="/forgot-otp-verify" element={<ForgotPassVerifyOtp/>}/>
      <Route path="/forgot-change-pass" element={<ForgotPasswordChangePass/>}/>
    </Routes>
  );
}

export default App;
