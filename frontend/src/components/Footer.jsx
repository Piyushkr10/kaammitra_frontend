import React, { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email) {
      alert("Please enter your email.");
      return;
    }
    alert(`Subscribed with ${email}`);
    setEmail("");
  };

  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-blue-600 text-white rounded-full px-3 py-1 font-bold">K</div>
            <span className="font-bold text-lg">Kaam Mitra</span>
          </div>
          <p className="mb-4 text-sm">
            Connecting you with trusted service providers across India. Your reliable partner for all home and professional services.
          </p>
          <div className="flex items-center gap-2 mb-2">
            <Mail size={16} /> support@kaammitra.com
          </div>
          <div className="flex items-center gap-2 mb-2">
            <Phone size={16} /> +91 98765 43210
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={16} /> Mumbai, Delhi, Bangalore & 50+ cities
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="font-bold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li><a href="/about" className="hover:underline">About Us</a></li>
            <li><a href="/how-it-works" className="hover:underline">How It Works</a></li>
            <li><a href="/all-services" className="hover:underline">All Services</a></li>
            <li><a href="/contact" className="hover:underline">Contact</a></li>
          </ul>
        </div>

        {/* Services */}
        <div>
          <h3 className="font-bold mb-4">Services</h3>
          <ul className="space-y-2">
            <li><a href="/services/cleaning" className="hover:underline">Cleaning Services</a></li>
            <li><a href="/services/photography" className="hover:underline">Photography</a></li>
            <li><a href="/services/cooking" className="hover:underline">Cooking Services</a></li>
            <li><a href="/services" className="hover:underline">Browse All</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-bold mb-4">Support</h3>
          <ul className="space-y-2">
            <li><a href="/help" className="hover:underline">Help Center</a></li>
            <li><a href="/safety" className="hover:underline">Safety Guidelines</a></li>
            <li><a href="/terms" className="hover:underline">Terms of Service</a></li>
            <li><a href="/privacy" className="hover:underline">Privacy Policy</a></li>
          </ul>
        </div>
      </div>

      {/* Subscribe */}
      <div className="container mx-auto px-6 mt-10 border-t border-gray-700 pt-6">
        <h3 className="font-bold mb-2">Stay Updated</h3>
        <p className="text-sm mb-4">Get the latest updates on new services and special offers.</p>
        <div className="flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-grow px-4 py-2 rounded-md text-black"
          />
          <button
            onClick={handleSubscribe}
            className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md"
          >
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
}
