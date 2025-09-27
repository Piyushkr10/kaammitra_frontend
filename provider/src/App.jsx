import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import AddServices from "./pages/AddServices";
import ProfilePage from "./pages/ProfilePage";

// Profile nested pages
import ProfileDashboard from "./pages/ProfileDashboard";
import ProfileJobs from "./pages/ProfileJobs";
import ProfileEarnings from "./pages/ProfileEarnings";
import ProfileNotifications from "./pages/ProfileNotifications";
import ProfileDetailsPage from "./pages/ProfileDetailsPage";

function App() {
  const [homeServices, setHomeServices] = useState([
    { name: "Maid", img: "https://i.ibb.co/FWwM1h7/maid.jpg" },
    { name: "Painter", img: "https://i.ibb.co/4WqRCDP/painter.jpg" },
    { name: "Gardener", img: "https://i.ibb.co/pZMxjR1/gardener.jpg" },
  ]);

  const addService = (service) => {
    setHomeServices((prev) => [...prev, service]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        {/* Navbar visible on all pages */}
        <Navbar />

        <main className="flex-grow pt-16">
          <Routes>
            {/* Home */}
            <Route path="/" element={<Home homeServices={homeServices} />} />

            {/* Add Service */}
            <Route path="/addservice" element={<AddServices addService={addService} />} />

            {/* Profile nested */}
            <Route path="/profile" element={<ProfilePage />}>
              <Route index element={<ProfileDashboard />} />
              <Route path="jobs" element={<ProfileJobs />} />
              <Route path="earnings" element={<ProfileEarnings />} />
              <Route path="notifications" element={<ProfileNotifications />} />
              <Route path="profiledetails" element={<ProfileDetailsPage />} />
            </Route>
          </Routes>
        </main>

        {/* Footer visible on all pages */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
