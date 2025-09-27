import React, { useState } from "react";
import { 
    Briefcase, 
    Download, 
    CreditCard, 
    User,
    Sun,
    Moon,
    CheckCircle,
    Bell // Added Bell icon for consistency with the header
} from "lucide-react";

// Placeholder component for the mini Earnings Graph
const MiniEarningsGraph = () => (
    <div className="w-full h-16 relative overflow-hidden">
        {/* Simple line graph representation - scaled down */}
        <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
            {/* Data points and line (Values approximate from image: 18, 27, 23, 35, 37) */}
            <polyline
                fill="none"
                stroke="#3b82f6" // blue-500
                strokeWidth="2"
                points="20,80 120,55 220,70 320,35 420,25" // Approximate coordinates based on the 0-40 scale.
                transform="translate(0, 0)"
            />
             {/* X-axis labels (Placeholder for Items 1-5) */}
            {['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'].map((label, index) => (
                <text key={label} x={30 + (index * 100)} y="95" className="text-[10px] fill-gray-500 dark:fill-gray-400 text-center">{label}</text>
            ))}
        </svg>
    </div>
);

// Component for a single payment method (left bottom)
const PaymentMethod = ({ name, id, isUPI = false }) => (
    <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-700 last:border-b-0">
        <div>
            <p className="font-semibold text-gray-800 dark:text-white">{isUPI ? 'UPI ID' : 'Bank name'}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{id}</p>
        </div>
        <button className="text-blue-600 hover:text-blue-700 font-medium text-sm px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900 transition">
            Manage
        </button>
    </div>
);

// Component for the Payout History table (center bottom)
const PayoutHistoryTable = () => {
    const historyData = [
        { date: '10 Nov,2025', method: 'UPI(Gpay)', status: 'SUCCESS' },
        { date: '10 Nov,2025', method: 'Bank(SBI)', status: 'SUCCESS' },
        { date: '10 Nov,2025', method: 'Bank(SBI)', status: 'SUCCESS' },
        { date: '10 Nov,2025', method: 'Bank(SBI)', status: 'SUCCESS' },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Payout History</h3>
            <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead>
                        <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            <th className="py-3 pr-4">Date</th>
                            <th className="py-3 pr-4">Method</th>
                            <th className="py-3">Status</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                        {historyData.map((item, index) => (
                            <tr key={index} className="text-sm text-gray-900 dark:text-gray-200">
                                <td className="py-2 pr-4 whitespace-nowrap">{item.date}</td>
                                <td className="py-2 pr-4 whitespace-nowrap">{item.method}</td>
                                <td className="py-2 whitespace-nowrap">
                                    <span className={`inline-flex px-2 text-xs font-semibold leading-5 rounded-full ${
                                        item.status === 'SUCCESS' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300' : 
                                        'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                                    }`}>
                                        {item.status}
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

const ProfileEarnings = () => {
    // Dummy Data for the Transaction History Table
    const transactionHistory = [
        { date: '10 Nov,2025', jobId: 'FGYT56', clientName: 'Meera', serviceType: 'AC Repair', token: 'Rs 300', payment: 'Rs 1200' },
        { date: '10 Nov,2025', jobId: 'FGYT56', clientName: 'Meera', serviceType: 'AC Repair', token: 'Rs 300', payment: 'Rs 1200' },
        { date: '10 Nov,2025', jobId: 'FGYT56', clientName: 'Meera', serviceType: 'AC Repair', token: 'Rs 300', payment: 'Rs 1200' },
    ];
    
    // State for the withdrawal amount
    const [withdrawalAmount, setWithdrawalAmount] = useState('');
    const availableBalance = 18500;

    return (
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            
            {/* Header Section (Provider Name, Status, Icons) - Replicating structure */}
            <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Provider name</h2>
                    <span className="text-green-500">✓</span>
                    <span className="bg-gray-300 dark:bg-gray-600 text-xs text-gray-800 dark:text-gray-200 py-1 px-3 rounded-full font-medium">
                        complete profile
                    </span>
                </div>
                
                <div className="flex space-x-4 items-center">
                    <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 focus:outline-none">
                        <Bell className="h-6 w-6" />
                    </button>
                    
                </div>
            </div>

            {/* Top Stat Cards and Tabs */}
            <div className="flex space-x-3 mb-6">
                {['Active Jobs', 'Pending Requests', 'Completed Jobs', 'Cancelled Jobs'].map((tab, index) => (
                    <button
                        key={tab}
                        className={`py-2 px-4 rounded-lg font-medium text-sm transition duration-150 ${
                            index === 0 // Active Jobs is selected in the image
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Earnings Summary Row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                {/* Your Earnings (all time) */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your Earnings(all time)</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">Rs 2,15,000</p>
                </div>

                {/* Earnings This Month */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Earnings This Month</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">Rs 18,500</p>
                </div>
                
                {/* Pending Payments */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Pending Payments</p>
                    <p className="text-2xl font-bold text-red-600 dark:text-red-400">Rs 3,200</p>
                </div>

                {/* Mini Graph */}
                <div className="bg-white dark:bg-gray-800 p-2 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center">
                    <MiniEarningsGraph />
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mb-8">
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 flex items-center space-x-2">
                    <CreditCard className="w-5 h-5" />
                    <span>Withdraw now</span>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5" />
                    <span>Add pay mode</span>
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 font-semibold py-2 px-4 rounded-md shadow-md transition duration-150 flex items-center space-x-2">
                    <Download className="w-5 h-5" />
                    <span>Download</span>
                </button>
            </div>

            {/* Transaction History Table */}
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 mb-8">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Transaction History</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead>
                            <tr className="text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                <th className="py-3 pr-4">Date</th>
                                <th className="py-3 pr-4">Job ID</th>
                                <th className="py-3 pr-4">Client name</th>
                                <th className="py-3 pr-4">Service type</th>
                                <th className="py-3 pr-4">Token</th>
                                <th className="py-3">Payment</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-100 dark:divide-gray-700">
                            {transactionHistory.map((item, index) => (
                                <tr key={index} className="text-sm text-gray-900 dark:text-gray-200">
                                    <td className="py-2 pr-4 whitespace-nowrap">{item.date}</td>
                                    <td className="py-2 pr-4 whitespace-nowrap text-blue-600 font-medium">{item.jobId}</td>
                                    <td className="py-2 pr-4 whitespace-nowrap">{item.clientName}</td>
                                    <td className="py-2 pr-4 whitespace-nowrap">{item.serviceType}</td>
                                    <td className="py-2 pr-4 whitespace-nowrap">{item.token}</td>
                                    <td className="py-2 whitespace-nowrap">{item.payment}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Bottom Section: Payment Methods, Payout History, Withdrawal */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Payment Methods (Left) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Payment Methods</h3>
                    <PaymentMethod name="HDFC bank" id="hdfc bank" />
                    <PaymentMethod name="umeshhh@upopi" id="umeshhh@upopi" isUPI={true} />
                    <PaymentMethod name="umeshhh@upopi" id="umeshhh@upopi" isUPI={true} />
                </div>

                {/* Payout History (Center) */}
                <PayoutHistoryTable />

                {/* Withdrawal Panel (Right) */}
                <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-4">Withdrawal</h3>
                    
                    <p className="text-sm text-gray-500 dark:text-gray-400">Available balance</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Rs {availableBalance.toLocaleString('en-IN')}</p>

                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={withdrawalAmount}
                        onChange={(e) => setWithdrawalAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 mb-4"
                    />

                    <label htmlFor="via" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Withdraw via</label>
                    <select
                        id="via"
                        className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-blue-500 focus:border-blue-500 mb-6"
                    >
                        <option>Select Payment Method</option>
                        <option>HDFC bank</option>
                        <option>UPI (umeshhh@upopi)</option>
                    </select>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md shadow-lg transition duration-150">
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileEarnings;
