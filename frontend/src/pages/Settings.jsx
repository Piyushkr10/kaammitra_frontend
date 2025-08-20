import React, { useState } from "react";
import { ChevronRight, User, Bell, CreditCard, Lock, Settings as SettingsIcon } from "lucide-react";

// The `Switch` component, recreated for this file to be self-contained.
// This is an accessible toggle switch.
const Switch = ({ checked, onCheckedChange }) => {
  return (
    <button
      onClick={onCheckedChange}
      role="switch"
      aria-checked={checked}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200
                  ${checked ? "bg-blue-600" : "bg-gray-200 dark:bg-gray-600"}`}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200
                    ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
};

// The `Card` component, recreated to be self-contained.
const Card = ({ children, className = "" }) => (
  <div
    className={`bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200
                p-6 rounded-2xl shadow-lg transition-colors duration-300 ${className}`}
  >
    {children}
  </div>
);

// The `CardContent` component.
const CardContent = ({ children, className = "" }) => (
  <div className={`space-y-4 ${className}`}>{children}</div>
);

const Settings = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    app: true,
    serviceUpdates: true,
    offers: false,
  });

  const [payment, setPayment] = useState({
    saveBilling: false,
    autoPay: false,
  });

  // User data for a more realistic UI
  const userData = {
    name: "John Doe",
    phone: "99999-99999",
    email: "johndoe@gmail.com",
  };

  const toggleNotification = (key) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePayment = (key) => {
    setPayment((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleLinkClick = (e, message) => {
    e.preventDefault();
    // This would typically navigate, but for this demo, we can just log a message.
    console.log(message);
    alert(message);
  };

  return (
    <div className="p-4 sm:p-6 md:p-12 min-h-screen bg-gray-50 dark:bg-gray-950 transition-colors duration-300">
      <h1 className="text-3xl font-bold text-center text-blue-700 dark:text-blue-400 mb-8 md:mb-12">
        Account Settings
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {/* Profile Settings */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <User size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">
                Profile
              </h2>
            </div>
            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
              <p className="font-medium text-gray-800 dark:text-gray-100">
                {userData.name}
              </p>
              <p>{userData.phone}</p>
              <p>{userData.email}</p>
            </div>
            <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg mt-4 font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
              Update Address
            </button>
            <button className="w-full bg-blue-600 dark:bg-blue-700 text-white py-2 rounded-lg mt-2 font-medium hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors">
              Add More Profiles
            </button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">
                Notifications
              </h2>
            </div>
            <div className="space-y-3">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                  <span className="text-sm">
                    {key === "serviceUpdates"
                      ? "Service Updates"
                      : key === "offers"
                      ? "Promotional Offers & Discounts"
                      : key.charAt(0).toUpperCase() + key.slice(1)}
                  </span>
                  <Switch
                    checked={value}
                    onCheckedChange={() => toggleNotification(key)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <CreditCard size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">
                Payment
              </h2>
            </div>
            <div className="space-y-3 text-sm">
              <div
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Managing cards...")}
              >
                <span>Cards</span> <ChevronRight size={16} />
              </div>
              <div
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Managing UPI...")}
              >
                <span>UPI</span> <ChevronRight size={16} />
              </div>
              <div
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Managing wallets...")}
              >
                <span>Wallets</span> <ChevronRight size={16} />
              </div>
              <div className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                <span>Save billing address</span>
                <Switch
                  checked={payment.saveBilling}
                  onCheckedChange={() => togglePayment("saveBilling")}
                />
              </div>
              <div className="flex justify-between items-center text-gray-700 dark:text-gray-200">
                <span>Auto-pay</span>
                <Switch
                  checked={payment.autoPay}
                  onCheckedChange={() => togglePayment("autoPay")}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account & Security */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Lock size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">
                Account & Security
              </h2>
            </div>
            <ul className="mt-2 space-y-3 text-sm">
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Deactivating account...")}
              >
                <span>Deactivate Account</span> <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Deleting account...")}
              >
                <span>Delete Account</span> <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Managing sessions...")}
              >
                <span>Manage Active Sessions</span> <ChevronRight size={16} />
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <SettingsIcon size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">
                Privacy
              </h2>
            </div>
            <ul className="mt-2 space-y-3 text-sm">
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Controlling provider info...")}
              >
                <span>Control what providers see</span> <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Managing blocked providers...")}
              >
                <span>Blocked providers</span> <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Setting login alerts...")}
              >
                <span>Login alerts & device management</span> <ChevronRight size={16} />
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardContent>
            <div className="flex items-center gap-2 mb-2">
              <Bell size={20} className="text-blue-500" />
              <h2 className="font-bold text-lg uppercase tracking-wide">
                Support
              </h2>
            </div>
            <ul className="mt-2 space-y-3 text-sm">
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Opening FAQ...")}
              >
                <span>FAQ & Help Centre</span> <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Contacting support...")}
              >
                <span>Contact Support</span> <ChevronRight size={16} />
              </li>
              <li
                className="flex justify-between items-center text-gray-700 dark:text-gray-200"
                onClick={(e) => handleLinkClick(e, "Reporting a problem...")}
              >
                <span>Report a Problem</span> <ChevronRight size={16} />
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
