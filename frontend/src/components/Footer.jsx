import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer({ darkMode }) {
  const { t } = useTranslation();

  return (
    <footer
      className="bg-gray-200 text-gray-700 dark:bg-gray-900 dark:text-gray-400
                 py-12 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <Link to="/" className="flex items-center gap-2 mb-4">
            <img
              src={darkMode ? "/logo2.png" : "/logo.png"}
              alt="KaamMitra"
              className="h-10 w-auto"
            />
          </Link>
          <p className="text-sm">
            {t('footer.copyright')}
          </p>
        </div>

        {/* Services Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-blue-700 dark:text-blue-500 mb-4">
            {t('footer.services_title')}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/service/Plumbing" className="hover:text-blue-700 dark:hover:text-blue-500">
                Plumbing
              </Link>
            </li>
            <li>
              <Link to="/service/Electrical" className="hover:text-blue-700 dark:hover:text-blue-500">
                Electrical
              </Link>
            </li>
            <li>
              <Link to="/service/Cleaning" className="hover:text-blue-700 dark:hover:text-blue-500">
                Cleaning
              </Link>
            </li>
            <li>
              <Link to="/moreservices" className="hover:text-blue-700 dark:hover:text-blue-500">
                {t('more_services')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-blue-700 dark:text-blue-500 mb-4">
            {t('footer.quick_links_title')}
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/about" className="hover:text-blue-700 dark:hover:text-blue-500">
                {t('footer.about')}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-blue-700 dark:hover:text-blue-500">
                {t('footer.contact')}
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="hover:text-blue-700 dark:hover:text-blue-500">
                {t('footer.privacy')}
              </Link>
            </li>
            <li>
              <Link to="/terms" className="hover:text-blue-700 dark:hover:text-blue-500">
                {t('footer.terms')}
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us */}
        <div className="text-center md:text-left">
          <h3 className="text-lg font-bold text-blue-700 dark:text-blue-500 mb-4">
            {t('footer.contact_us_title')}
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <MapPin size={16} />
              <span>Patna, Bihar, India</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Phone size={16} />
              <span>+91 98765 43210</span>
            </div>
            <div className="flex items-center justify-center md:justify-start gap-2">
              <Mail size={16} />
              <span>info@kaammitra.in</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}