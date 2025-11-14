import React, { useState, useEffect } from "react";
import { Search, Eye, X } from "lucide-react";
import axios from "axios";

const Providers = () => {
  const [providers, setProviders] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [imageView, setImageView] = useState(""); // for full image popup

  // Fetch providers
  const fetchProviders = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/providers");
      setProviders(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching providers:", err);
    }
  };

  useEffect(() => {
    fetchProviders();
    const id = setInterval(fetchProviders, 8000);
    return () => clearInterval(id);
  }, []);

  const filtered = providers.filter((p) => {
    const text = search.trim().toLowerCase();
    const matchText =
      p.fullName?.toLowerCase().includes(text) ||
      p.phoneNumber?.toLowerCase().includes(text) ||
      p.serviceCategory?.toLowerCase().includes(text) ||
      p.email?.toLowerCase().includes(text);
    const matchesFilter = filter === "All" || p.status === filter;
    return matchText && matchesFilter;
  });

  const getStatusColor = (s) => {
    switch (s) {
      case "Active":
        return "bg-green-100 text-green-700";
      case "Pending":
        return "bg-red-100 text-red-700";
      case "Suspended":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const verifyProvider = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/providers/${id}`, {
        status: "Active",
      });
      fetchProviders();
      setSelectedProvider(null);
    } catch (err) {
      console.error("Error verifying provider:", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-800 mb-4">Service Providers</h2>

      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center bg-gray-100 rounded p-2 w-full max-w-md">
          <Search size={16} className="mr-2 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name / phone / service"
            className="bg-transparent outline-none w-full"
          />
        </div>

        <div className="flex gap-2">
          {["All", "Active", "Pending", "Suspended"].map((s) => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-3 py-1 rounded-full text-sm ${
                filter === s ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="w-full text-sm">
          <thead className="bg-gray-200 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Category</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Email</th>
              <th className="p-3">Status</th>
              <th className="p-3">Rating</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p) => (
                <tr key={p._id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{p.fullName || "N/A"}</td>
                  <td className="p-3">{p.serviceCategory || "N/A"}</td>
                  <td className="p-3">{p.phoneNumber || "N/A"}</td>
                  <td className="p-3">{p.email || "N/A"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        p.status
                      )}`}
                    >
                      {p.status || "Unknown"}
                    </span>
                  </td>
                  <td className="p-3">{p.rating ?? "—"}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setSelectedProvider(p)}
                      className="px-3 py-1 rounded bg-gray-100 hover:bg-gray-200 flex items-center gap-2"
                    >
                      <Eye size={14} /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center p-6 text-gray-500">
                  No providers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Provider Detail Popup */}
      {selectedProvider && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-2xl relative">
            <button
              onClick={() => setSelectedProvider(null)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500"
            >
              <X />
            </button>
            <h3 className="text-xl font-bold text-blue-800 mb-4">Provider Details</h3>
            <p><strong>Provider ID:</strong> {selectedProvider.providerId}</p>


            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p>
                  <strong>Name:</strong> {selectedProvider.fullName}
                </p>
                <p>
                  <strong>Phone:</strong> {selectedProvider.phoneNumber}
                </p>
                <p>
                  <strong>Email:</strong> {selectedProvider.email}
                </p>
                <p>
                  <strong>Category:</strong> {selectedProvider.serviceCategory}
                </p>
                <p>
                  <strong>Sub-Service:</strong> {selectedProvider.subService}
                </p>
                <p>
                  <strong>Experience:</strong> {selectedProvider.experience} yrs
                </p>
              </div>

              <div>
                <p>
                  <strong>Service Area:</strong> {selectedProvider.serviceArea} (
                  {selectedProvider.pinCode})
                </p>
                <p>
                  <strong>Language:</strong> {selectedProvider.languageSpoken}
                </p>
                <p>
                  <strong>Bank A/C:</strong>{" "}
                  {selectedProvider.bankAccountNumber
                    ? `*****${selectedProvider.bankAccountNumber.slice(-4)}`
                    : "N/A"}
                </p>
                <p>
                  <strong>IFSC:</strong> {selectedProvider.ifscCode}
                </p>
                <p>
                  <strong>UPI:</strong> {selectedProvider.upiId}
                </p>
              </div>

              <div className="md:col-span-2 pt-4">
                <h4 className="font-semibold">Verification Documents</h4>
                {[
                  { label: "Profile Photo", key: "profilePhoto" },
                  { label: "Govt ID", key: "governmentIDProof" },
                  { label: "Address Proof", key: "addressProof" },
                  { label: "Skill Cert", key: "skillCertificate" },
                ].map((doc) => (
                  <p key={doc.key} className="flex items-center gap-2">
                    <strong>{doc.label}:</strong>{" "}
                    {selectedProvider[doc.key] ? (
                      <>
                        {selectedProvider[doc.key]}
                        <button
                          onClick={() =>
                            setImageView(selectedProvider[doc.key])
                          }
                          className="px-2 py-1 text-xs bg-blue-100 rounded hover:bg-blue-200"
                        >
                          View
                        </button>
                      </>
                    ) : (
                      "N/A"
                    )}
                  </p>
                ))}
              </div>
            </div>

            {/* Accept / Verify Button */}
            {selectedProvider.status === "Pending" && (
              <div className="mt-4 text-right">
                <button
                  onClick={() => verifyProvider(selectedProvider._id)}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Accept
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Image Popup */}
      {imageView && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4"
          onClick={() => setImageView("")}
        >
          <img
            src={`http://localhost:5000/uploads/${imageView}`}
            alt="Document"
            className="max-h-full max-w-full rounded shadow-lg"
          />
        </div>
      )}
    </div>
  );
};

export default Providers;
