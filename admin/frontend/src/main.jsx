import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

// Wrapper component to handle theme toggle
function RootContainer() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? "dark bg-gray-900 text-white" : "bg-white text-black"}>
      <App darkMode={darkMode} setDarkMode={setDarkMode} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RootContainer />
  </StrictMode>
);
