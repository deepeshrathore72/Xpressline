import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import store from "./states/store";
import Loading from "./components/loading.js";
import Loading2 from "./components/loading2.js";
import Summary from "./components/summary.js";
import Header from "./components/header.js";
import Footer from "./components/footer.js";
import Landing from "./components/landing.js";
import Parcel from "./components/parcel.js";
import Grocery from "./components/grocery.js";
import Medicine from "./components/medicine.js";
import Login from "./components/login.js";
import Progress from "./components/progress.js";
import Register from "./components/register.js";
import OtpPopup from "./components/otp.js";
import UpdatePasswordPage from "./components/updatePassword.js";
import PasswordResetForm from "./components/resetPassword.js";

function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <Routes style={{ flex: 1 }}>
            <Route path="/parcel" element={<Parcel />} />
            <Route path="/grocery" element={<Grocery />} />
            <Route path="/medicine" element={<Medicine />} />
            <Route path="/" element={<Landing />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/update-password" element={<UpdatePasswordPage />} />
            <Route path="/reset-password" element={<PasswordResetForm />} />
            <Route path="/loading" element={<Loading />} />
            <Route path="/loading2" element={<Loading2 />} />
            <Route path="/summary" element={<Summary />} />
            <Route path="/otp" element={<OtpPopup />} />
          </Routes>
        </div>
        <Footer />
      </Provider>
    </BrowserRouter>
  );
}

export default App;
