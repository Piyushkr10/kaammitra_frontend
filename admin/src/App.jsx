import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Providers from "./pages/Providers";
import Jobs from "./pages/Jobs";
import Finance from "./pages/Finance";
import Notification from "./pages/Notification";
import Support from "./pages/Support";
import Settings from "./pages/Settings";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header darkMode={darkMode} setDarkMode={setDarkMode} />
          <main className="p-6 overflow-auto flex-1">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/providers" element={<Providers />} />
              <Route path="/jobs" element={<Jobs />} />
              <Route path="/finance" element={<Finance />} />
              <Route path="/notification" element={<Notification />} />
              <Route path="/support" element={<Support />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  );
};

export default App;
