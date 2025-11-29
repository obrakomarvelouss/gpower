import { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Mail, Phone, MapPin, Send, Check } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const { error } = await supabase.from('contact_messages').insert({
      name: formData.name,
      email: formData.email,
      message: formData.message,
    });

    setSubmitting(false);

    if (!error) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50">
      <div className="bg-gradient-to-r from-green-600 to-green-700 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">Get in Touch</h1>
          <p className="text-xl text-green-100 max-w-3xl mx-auto">
            Have questions about our solar solutions? We're here to help you make the switch to clean energy.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Send us a Message</h2>
              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                  <Check className="w-6 h-6 text-green-600" />
                  <p className="text-green-800 font-medium">
                    Thank you! Your message has been sent successfully. We'll get back to you soon.
                  </p>
                </div>
              )}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors outline-none"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors outline-none"
                    placeholder="john@example.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-green-500 focus:ring-2 focus:ring-green-200 transition-colors outline-none resize-none"
                    placeholder="Tell us about your solar energy needs..."
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting || submitted}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-lg flex items-center justify-center space-x-2 transition-all duration-200 ${
                    submitted
                      ? 'bg-green-500 text-white'
                      : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg hover:shadow-xl'
                  }`}
                >
                  {submitted ? (
                    <>
                      <Check className="w-6 h-6" />
                      <span>Message Sent!</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{submitting ? 'Sending...' : 'Send Message'}</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Phone className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600">+1 (555) 123-4567</p>
                    <p className="text-sm text-gray-500 mt-1">Mon-Fri, 9am-6pm EST</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <Mail className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">info@gpower.com</p>
                    <p className="text-sm text-gray-500 mt-1">We'll respond within 24 hours</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <div className="bg-green-100 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Address</h3>
                    <p className="text-gray-600">
                      123 Solar Avenue
                      <br />
                      Green City, CA 90210
                      <br />
                      United States
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-600 to-green-700 rounded-2xl shadow-xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-4">Need Immediate Help?</h3>
              <p className="text-green-100 mb-6">
                Our solar experts are standing by to answer your questions and provide personalized recommendations.
              </p>
              <button className="w-full bg-white text-green-600 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How long does installation take?
              </h3>
              <p className="text-gray-600">
                Most residential installations are completed within 1-3 days, depending on the system size and complexity.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What warranty do you offer?
              </h3>
              <p className="text-gray-600">
                All our solar panels come with a 25-year performance warranty and a 10-year product warranty.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Do you offer financing options?
              </h3>
              <p className="text-gray-600">
                Yes, we offer flexible financing options including zero-down payment plans and competitive interest rates.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                What maintenance is required?
              </h3>
              <p className="text-gray-600">
                Solar panels require minimal maintenance. We recommend annual inspections and occasional cleaning for optimal performance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
