import React, { useState } from "react";

const Finance = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const payments = [
    { id: "#tf9086", date: "01/10/2025", job: "Cleaning", provider: "Meera", customer: "Sam", amount: "₹675", status: "Active" },
    { id: "#tf9087", date: "01/10/2025", job: "Repair", provider: "Meera", customer: "Sam", amount: "₹675", status: "Pending" },
    { id: "#tf9088", date: "10/10/2025", job: "Gardening", provider: "Meera", customer: "Sam", amount: "₹675", status: "Completed" },
    { id: "#tf9089", date: "01/10/2025", job: "Repair", provider: "Meera", customer: "Sam", amount: "₹675", status: "Active" },
  ];

  const filteredPayments = payments.filter(
    (p) =>
      p.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.job.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.provider.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">Finance & Payments</h2>

      <input
        type="text"
        placeholder="Search by payment ID, job or provider"
        className="w-full md:w-1/2 p-2 border rounded-md mb-4 dark:bg-gray-700 dark:text-gray-200"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr className="text-left">
              <th className="p-2">Payment ID</th>
              <th className="p-2">Date</th>
              <th className="p-2">Job</th>
              <th className="p-2">Provider</th>
              <th className="p-2">Customer</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredPayments.map((p, index) => (
              <tr key={index} className="border-t dark:border-gray-600">
                <td className="p-2">{p.id}</td>
                <td className="p-2">{p.date}</td>
                <td className="p-2">{p.job}</td>
                <td className="p-2">{p.provider}</td>
                <td className="p-2">{p.customer}</td>
                <td className="p-2">{p.amount}</td>
                <td className="p-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      p.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : p.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {p.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
