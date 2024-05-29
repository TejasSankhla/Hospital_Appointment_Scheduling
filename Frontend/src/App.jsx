import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth.jsx";
import ListAppointments from "./pages/ListAppointments.jsx"; // Adjusted import to match the typical convention of naming
import RecHome from "./pages/RecHome.jsx";
import LoginError from "./pages/LoginError.jsx";
import Booked from "./pages/Booked.jsx";
import { DataProvider } from "./context/data.jsx";
import "./App.css";
import DocHome from "./pages/DocHome.jsx";

function App() {
  return (
    <DataProvider>
      <div className="h-full w-full">
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/rechome" element={<RecHome />} />
          <Route path="/loginerror" element={<LoginError />} />
          <Route path="/DocHome" element={<DocHome />} />
          <Route path="/book" element={<Booked />} />
          <Route path="/all-app" element={<ListAppointments />} />
        </Routes>
      </div>
    </DataProvider>
  );
}

export default App;
