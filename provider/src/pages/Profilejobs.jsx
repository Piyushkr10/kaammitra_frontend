import React from "react";
// Assuming you have a placeholder image for the user avatar (Meera) or are using a standard placeholder
// For this example, we'll use a functional component for the placeholder image.

const AvatarPlaceholder = ({ name }) => (
    <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 text-lg font-semibold border-2 border-gray-300">
        {name ? name[0] : 'U'}
    </div>
);

// Component for a single job row/card
const JobCard = ({ userName, location, service, dateTime, price1, price2, status }) => {
    let buttonText;
    let buttonColorClass;

    switch (status) {
        case 'Active Job':
            buttonText = 'Active Job';
            buttonColorClass = 'bg-blue-600 hover:bg-blue-700';
            break;
        case 'Decline':
            buttonText = 'Decline';
            buttonColorClass = 'bg-red-600 hover:bg-red-700';
            break;
        case 'Completed':
            buttonText = 'Completed';
            buttonColorClass = 'bg-green-600 hover:bg-green-700';
            break;
        case 'Pending Job':
            buttonText = 'Pending Job';
            buttonColorClass = 'bg-yellow-600 hover:bg-yellow-700';
            break;
        default:
            buttonText = 'View';
            buttonColorClass = 'bg-gray-500 hover:bg-gray-600';
    }

    return (
        <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm mb-3 border border-gray-200 dark:border-gray-700">
            {/* Avatar and Name/Location */}
            <div className="flex items-center w-64 min-w-0">
                <AvatarPlaceholder name={userName} />
                <div className="ml-4 truncate">
                    <p className="font-semibold text-gray-900 dark:text-white truncate">{userName}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{location}</p>
                </div>
            </div>

            {/* Service and Date/Time */}
            <div className="flex-1 min-w-0 px-4">
                <p className="font-medium text-gray-900 dark:text-white truncate">{service}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">{dateTime}</p>
            </div>

            {/* Price 1 */}
            <div className="w-20 text-center px-2">
                <p className="font-semibold text-gray-700 dark:text-gray-300">{price1}</p>
            </div>

            {/* Price 2 */}
            <div className="w-20 text-center px-2">
                <p className="font-semibold text-gray-700 dark:text-gray-300">{price2}</p>
            </div>

            {/* Action Button */}
            <div className="w-32 ml-4">
                <button
                    className={`w-full text-white font-medium py-2 px-3 rounded-md text-sm transition duration-150 ${buttonColorClass}`}
                >
                    {buttonText}
                </button>
            </div>
        </div>
    );
};

// Main Dashboard Component
const ProfileJobs = () => {
    // Dummy Data to replicate the list in the image
    const jobList = [
        { userName: 'Meera', location: 'Vikas nagar,delhi', service: 'AC Repair', dateTime: '10 November,2025 -10:00 am', price1: 300, price2: 1200, status: 'Active Job' },
        { userName: 'Meera', location: 'Vikas nagar,delhi', service: 'AC Repair', dateTime: '10 November,2025 -10:00 am', price1: 300, price2: 1200, status: 'Decline' },
        { userName: 'Meera', location: 'Vikas nagar,delhi', service: 'AC Repair', dateTime: '10 November,2025 -10:00 am', price1: 300, price2: 1200, status: 'Completed' },
        { userName: 'Meera', location: 'Vikas nagar,delhi', service: 'AC Repair', dateTime: '10 November,2025 -10:00 am', price1: 300, price2: 1200, status: 'Pending Job' },
        { userName: 'Meera', location: 'Vikas nagar,delhi', service: 'AC Repair', dateTime: '10 November,2025 -10:00 am', price1: 300, price2: 1200, status: 'Active Job' },
    ];
    
    // State to manage the active tab (optional, but good practice)
    const [activeTab, setActiveTab] = React.useState('Active Jobs');

    const tabs = ['Active Jobs', 'Pending Requests', 'Completed Jobs', 'Cancelled Jobs'];

    return (
        <div className="flex-1 p-6 bg-gray-50 dark:bg-gray-900 min-h-screen">
            
            {/* Header Section (Provider Name, Status, Icons) */}
            <div className="flex justify-between items-center mb-6 border-b pb-4 border-gray-200 dark:border-gray-700">
                <div className="flex items-center space-x-4">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Provider name</h2>
                    <span className="text-green-500">✓</span> {/* Checkmark */}
                    <span className="bg-gray-300 dark:bg-gray-600 text-xs text-gray-800 dark:text-gray-200 py-1 px-3 rounded-full font-medium">
                        complete profile
                    </span>
                </div>
                
                {/* Icons (Notification, Theme, User) - Placeholder icons used */}
                <div className="flex space-x-4 items-center">
                    <button className="text-gray-600 dark:text-gray-300 hover:text-blue-600 focus:outline-none">
                        {/* Bell Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
                    </button>
                    <button className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 focus:outline-none">
                        {/* Moon Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
                    </button>
                    <button className="bg-blue-800 p-2 rounded-full text-white hover:bg-blue-700 focus:outline-none">
                        {/* User Icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </button>
                </div>
            </div>

            {/* Tabs for Job Status */}
            <div className="flex space-x-3 mb-6">
                {tabs.map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={`py-2 px-4 rounded-lg font-medium text-sm transition duration-150 ${
                            activeTab === tab
                                ? 'bg-blue-600 text-white shadow-lg'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                        }`}
                    >
                        {tab}
                    </button>
                ))}
            </div>

            {/* Jobs List */}
            <div className="job-list">
                {jobList.map((job, index) => (
                    <JobCard key={index} {...job} />
                ))}
            </div>

        </div>
    );
};

export default ProfileJobs;