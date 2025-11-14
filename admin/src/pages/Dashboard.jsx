// src/pages/Dashboard.jsx
import React, { useState, useContext, useEffect } from "react";
import { Users, Briefcase, DollarSign, CheckCircle } from "lucide-react";
import axios from "axios";
import { JobContext } from "../context/jobContext";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const Dashboard = () => {
  const { addJob, jobs, fetchJobs } = useContext(JobContext);
  const [showPopup, setShowPopup] = useState(false);
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    category: "",
    subService: "",
    description: "",
    requirement: "",
    image: null,
    price: "",
    location: "",
  });
  const [providerCount, setProviderCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  // small list of Indian towns/cities for searchable datalist — extend as needed
  const towns = [
    "New Delhi","Mumbai","Bengaluru","Kolkata","Chennai","Hyderabad","Pune",
    "Ahmedabad","Jaipur","Lucknow","Kanpur","Nagpur","Indore","Thane","Bhopal",
    "Visakhapatnam","Pimpri-Chinchwad","Patna","Vadodara","Ghaziabad","Ludhiana",
    "Agra","Nashik","Faridabad","Meerut","Rajkot","Kalyan-Dombivli","Vasai-Virar",
    "Varanasi","Srinagar","Dhanbad","Jodhpur","Amritsar","Raipur","Allahabad",
    "Ranchi","Howrah","Coimbatore","Jabalpur","Gwalior","Vijayawada","Madurai",
    "Kota","Bareilly","Noida","Gurugram","Moradabad","Aligarh","Tiruchirappalli"
  ];

  // Fetch counts (polling)
  useEffect(() => {
    const fetchProviderCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/providers");
        setProviderCount(res.data.length);
      } catch (err) {
        console.error("Error fetching provider count:", err);
      }
    };
    const fetchCustomerCount = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/customers");
        setCustomerCount(res.data.length);
      } catch (err) {
        console.error("Error fetching customer count:", err);
      }
    };

    const fetchAll = async () => {
      await fetchProviderCount();
      await fetchCustomerCount();
    };

    fetchAll();
    const interval = setInterval(fetchAll, 5000);
    return () => clearInterval(interval);
  }, []);

  // initial fetch of services & keep in sync with global jobs
  useEffect(() => {
    setServices(jobs);
  }, [jobs]);

  // real-time socket: when a new job is added elsewhere, update local services
  useEffect(() => {
    socket.on("jobAdded", (job) => {
      if (job) {
        setServices((prev) => [job, ...prev]);
      }
    });
    socket.on("jobUpdated", (job) => {
      if (job) {
        setServices((prev) => prev.map((s) => (s._id === job._id ? job : s)));
      }
    });
    return () => {
      socket.off("jobAdded");
      socket.off("jobUpdated");
    };
  }, []);

  // Real-time revenue data simulation (7 points)
  const [revenueData, setRevenueData] = useState(() => {
    const today = new Date();
    return Array.from({ length: 7 }).map((_, i) => {
      const d = new Date(today);
      d.setDate(today.getDate() - (6 - i));
      return {
        date: d.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
        revenue: Math.floor(50000 + Math.random() * 50000),
      };
    });
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setRevenueData((prev) => {
        const lastRevenue = prev[prev.length - 1].revenue;
        const newRevenue =
          lastRevenue + Math.floor(Math.random() * 20000 - 10000);
        const today = new Date();
        const newEntry = {
          date: today.toLocaleDateString("en-IN", { day: "numeric", month: "short" }),
          revenue: Math.max(newRevenue, 0),
        };
        return [...prev.slice(1), newEntry];
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Submit form — create service with price & location
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { category, subService, description, requirement, image, price, location } = formData;

    if (!category || !subService || !description || !requirement) {
      alert("Please fill required fields!");
      return;
    }
    // price numeric check
    if (!price || isNaN(Number(price))) {
      alert("Please enter a valid price");
      return;
    }

    const data = new FormData();
    data.append("category", category);
    data.append("subService", subService);
    data.append("description", description);
    data.append("requirement", requirement);
    if (image) data.append("image", image);
    data.append("price", price);
    data.append("location", location);
    // default status will be Active in backend

    try {
      // use context addJob which posts to backend
      await addJob(data);
      setShowPopup(false);
      // reset
      setFormData({
        category: "",
        subService: "",
        description: "",
        requirement: "",
        image: null,
        price: "",
        location: "",
      });

      // re-fetch to be safe
      fetchJobs();
    } catch (err) {
      console.error("Error adding service:", err);
      alert("Failed to add service!");
    }
  };

  // Add town quickly next to location input
  const handleAddTown = (town) => {
    setFormData((prev) => ({ ...prev, location: town }));
  };

  const stats = [
    { title: "Total Customers", value: customerCount, icon: Users },
    { title: "Total Providers", value: providerCount, icon: CheckCircle },
    { title: "Active Jobs", value: services.filter(s => s.status === "Active").length, icon: Briefcase },
    {
      title: "Today's Revenue",
      value: `Rs ${revenueData[revenueData.length - 1].revenue.toLocaleString()}`,
      icon: DollarSign,
    },
  ];

  return (
    <div className="space-y-6 p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {stats.map(({ title, value, icon: Icon }) => (
          <div
            key={title}
            className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow flex items-center gap-4"
          >
            <Icon className="text-blue-600" size={30} />
            <div>
              <p className="text-gray-500 text-sm">{title}</p>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {value}
              </h2>
            </div>
          </div>
        ))}
      </div>

      {/* Revenue Chart */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-lg font-semibold mb-2 text-blue-700">Real-Time Revenue Growth</h2>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip formatter={(v) => `Rs ${v.toLocaleString()}`} labelFormatter={(label) => `Date: ${label}`} />
              <Line type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} dot={{ r: 5 }} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow">
        <h2 className="font-semibold mb-2">Quick Actions</h2>
        <button onClick={() => setShowPopup(true)} className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 w-full">
          Add Service
        </button>
      </div>

      {/* Services List */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-4 text-blue-700">All Services</h2>
        {services.length === 0 ? (
          <p className="text-gray-500">No services added yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {services.map((service) => (
              <div key={service._id} className="border rounded-lg p-3 dark:border-gray-700 shadow">
                {service.image && (
                  <img src={`http://localhost:5000${service.image.startsWith("/") ? service.image : "/" + service.image}`} alt={service.category} className="w-full h-40 object-cover rounded-md mb-2" />
                )}
                <h3 className="font-semibold text-lg">{service.category} — Rs {service.price?.toLocaleString()}</h3>
                <p className="text-sm text-gray-500">Subcategory: {service.subService}</p>
                <p className="text-gray-700 dark:text-gray-300 mt-2 text-sm">{service.description}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm"><strong>Requirements:</strong> {service.requirement}</p>
                <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm"><strong>Location:</strong> {service.location}</p>
                <p className="text-gray-500 text-xs mt-1">{service.status} • {service.date} {service.time ? `• ${service.time}` : ""}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Popup Form */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[600px] relative">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 text-center">Add New Service</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Service Category" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full border rounded-md p-2" required />

              <input type="text" placeholder="Sub-Service" value={formData.subService} onChange={(e) => setFormData({ ...formData, subService: e.target.value })} className="w-full border rounded-md p-2" required />

              <textarea rows="3" placeholder="Service Description" value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full border rounded-md p-2" required />

              <textarea rows="2" placeholder="Service Requirement" value={formData.requirement} onChange={(e) => setFormData({ ...formData, requirement: e.target.value })} className="w-full border rounded-md p-2" required />

              <div className="flex gap-2">
                <input type="file" accept="image/*" onChange={(e) => setFormData({ ...formData, image: e.target.files[0] })} className="w-2/3" />
                <input type="number" placeholder="Price (Rs)" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-1/3 border rounded-md p-2" required />
              </div>

              <div className="flex items-center gap-2">
                <input list="towns" name="town" placeholder="Location (search or pick)" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full border rounded-md p-2" />
                <datalist id="towns">
                  {towns.map((t) => <option key={t} value={t} />)}
                </datalist>
                <div className="flex flex-col gap-1">
                  {towns.slice(0,6).map(t => (
                    <button type="button" key={t} onClick={() => handleAddTown(t)} className="px-2 py-1 bg-gray-100 rounded text-sm">+ {t}</button>
                  ))}
                </div>
              </div>

              <button type="submit" className="bg-blue-600 text-white py-2 w-full rounded-md">Add Service</button>
            </form>
            <button type="button" onClick={() => setShowPopup(false)} className="absolute top-2 right-3 text-gray-500 hover:text-red-600">✕</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
