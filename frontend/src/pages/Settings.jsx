import React, { useState } from "react";
import { Switch } from "@/components/ui/switch"; // if using shadcn switch, otherwise replace with custom toggle
import { Card, CardContent } from "@/components/ui/Card";

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

  const toggleNotification = (key) => {
    setNotifications({ ...notifications, [key]: !notifications[key] });
  };

  const togglePayment = (key) => {
    setPayment({ ...payment, [key]: !payment[key] });
  };

  return (
    <div className="p-6 md:p-12 bg-white min-h-screen">
      <h1 className="text-2xl font-bold text-center text-blue-700 mb-8">
        SETTINGS
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Settings */}
        <Card className="p-4 shadow-md rounded-xl">
          <CardContent className="space-y-2">
            <h2 className="font-bold uppercase">PROFILE SETTINGS</h2>
            <p>customer name</p>
            <p>99999-99999</p>
            <p>customer@gmail.com</p>
            <button className="w-full bg-blue-700 text-white py-2 rounded-lg mt-3 hover:bg-blue-800">
              update address
            </button>
            <button className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800">
              add more profile
            </button>
          </CardContent>
        </Card>

        {/* Account Settings */}
        <Card className="p-4 shadow-md rounded-xl">
          <CardContent>
            <h2 className="font-bold uppercase">ACCOUNT SETTINGS</h2>
            <ul className="mt-2 space-y-2">
              <li>deactivate account</li>
              <li>delete account</li>
              <li>manage active sessions</li>
            </ul>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="p-4 shadow-md rounded-xl">
          <CardContent>
            <h2 className="font-bold uppercase">NOTIFICATION SETTINGS</h2>
            <div className="mt-2 space-y-2">
              {Object.keys(notifications).map((key) => (
                <div key={key} className="flex justify-between items-center">
                  <span className="capitalize">
                    {key === "serviceUpdates"
                      ? "service updates"
                      : key === "offers"
                      ? "promotional offers & discounts"
                      : key}
                  </span>
                  <Switch
                    checked={notifications[key]}
                    onCheckedChange={() => toggleNotification(key)}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Payment Settings */}
        <Card className="p-4 shadow-md rounded-xl">
          <CardContent>
            <h2 className="font-bold uppercase">PAYMENT SETTINGS</h2>
            <ul className="mt-2 space-y-2">
              <li>cards</li>
              <li>UPI</li>
              <li>wallets</li>
              <div className="flex justify-between items-center">
                <span>save billing address</span>
                <Switch
                  checked={payment.saveBilling}
                  onCheckedChange={() => togglePayment("saveBilling")}
                />
              </div>
              <div className="flex justify-between items-center">
                <span>auto - pay</span>
                <Switch
                  checked={payment.autoPay}
                  onCheckedChange={() => togglePayment("autoPay")}
                />
              </div>
            </ul>
          </CardContent>
        </Card>

        {/* Privacy & Security */}
        <Card className="p-4 shadow-md rounded-xl">
          <CardContent>
            <h2 className="font-bold uppercase">PRIVACY & SECURITY</h2>
            <ul className="mt-2 space-y-2">
              <li>control what info provider see</li>
              <li>blocked providers</li>
              <li>login alerts & device management</li>
            </ul>
          </CardContent>
        </Card>

        {/* Preferences */}
        <Card className="p-4 shadow-md rounded-xl">
          <CardContent>
            <h2 className="font-bold uppercase">PREFERENCES</h2>
            <ul className="mt-2 space-y-2">
              <li>FAQ & help centre</li>
              <li>contact support</li>
              <li>report a problem</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
