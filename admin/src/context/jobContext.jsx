import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);

  // ✅ Base URL for backend
  const baseURL = "http://localhost:5000";

  // Fetch jobs from backend (real-time-ish with interval)
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/jobs`);
      setJobs(res.data);

      // Debug image paths
      if (res.data?.length) {
        console.log(
          "Fetched Jobs:",
          res.data.map((j) => j.image)
        );
      }
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000); // auto-refresh every 5 sec
    return () => clearInterval(interval);
  }, []);

  // Add job → POST to backend (used if components call addJob with formData)
  const addJob = async (jobData) => {
    try {
      // jobData expected to be FormData instance (multipart)
      const res = await axios.post(`${baseURL}/api/jobs`, jobData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setJobs((prev) => [res.data, ...prev]);
      return res.data;
    } catch (error) {
      console.error("Error adding job:", error);
      throw error;
    }
  };

  return (
    <JobContext.Provider value={{ jobs, addJob, fetchJobs }}>
      {children}
    </JobContext.Provider>
  );
};