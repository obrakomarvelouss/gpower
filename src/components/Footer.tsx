import { Zap, Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-gradient-to-br from-green-500 to-green-600 p-2 rounded-lg">
                <Zap className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">GPower</span>
            </div>
            <p className="text-gray-400 text-sm">
              Leading the energy revolution with innovative solar and backup power solutions for a sustainable future.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Products
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Installation Services
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-green-400 transition-colors text-sm">
                  Warranty
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail className="w-4 h-4" />
                <span>info@gpower.com</span>
              </li>
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin className="w-4 h-4 mt-1" />
                <span>123 Solar Avenue, Green City, CA 90210</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="bg-gray-800 p-2 rounded-lg hover:bg-green-600 transition-colors duration-200"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} GPower. All rights reserved. | Powering a sustainable tomorrow.
          </p>
        </div>
      </div>
    </footer>
  );
}
