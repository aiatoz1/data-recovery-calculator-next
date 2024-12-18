import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface LeadFormData {
  name: string;
  email: string;
  phone: string;
  company?: string;
  deviceType: string;
  problemDescription: string;
  urgency: string;
  preferredContact: string;
  location: string;
}

interface LeadCaptureFormProps {
  onSubmit: (data: LeadFormData) => void;
  initialData?: Partial<LeadFormData>;
}

export default function LeadCaptureForm({ onSubmit, initialData = {} }: LeadCaptureFormProps) {
  const [formData, setFormData] = useState<LeadFormData>({
    name: initialData.name || '',
    email: initialData.email || '',
    phone: initialData.phone || '',
    company: initialData.company || '',
    deviceType: initialData.deviceType || '',
    problemDescription: initialData.problemDescription || '',
    urgency: initialData.urgency || 'standard',
    preferredContact: initialData.preferredContact || 'email',
    location: initialData.location || ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white p-6 rounded-lg shadow-lg"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address *
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone Number *
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company Name
            </label>
            <input
              type="text"
              name="company"
              id="company"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.company}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location (City, State) *
            </label>
            <input
              type="text"
              name="location"
              id="location"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700">
              Device Type *
            </label>
            <select
              name="deviceType"
              id="deviceType"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.deviceType}
              onChange={handleChange}
            >
              <option value="">Select Device Type</option>
              <option value="hdd">Hard Drive (HDD)</option>
              <option value="ssd">Solid State Drive (SSD)</option>
              <option value="raid">RAID Array</option>
              <option value="usb">USB Flash Drive</option>
              <option value="sd">Memory Card</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label htmlFor="problemDescription" className="block text-sm font-medium text-gray-700">
              Problem Description *
            </label>
            <textarea
              name="problemDescription"
              id="problemDescription"
              required
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.problemDescription}
              onChange={handleChange}
            />
          </div>

          <div>
            <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
              Urgency Level *
            </label>
            <select
              name="urgency"
              id="urgency"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.urgency}
              onChange={handleChange}
            >
              <option value="standard">Standard Service</option>
              <option value="urgent">Urgent (24-48 hours)</option>
              <option value="emergency">Emergency (Same Day)</option>
            </select>
          </div>

          <div>
            <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700">
              Preferred Contact Method *
            </label>
            <select
              name="preferredContact"
              id="preferredContact"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500"
              value={formData.preferredContact}
              onChange={handleChange}
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
              <option value="both">Both Email and Phone</option>
            </select>
          </div>
        </div>

        <div className="flex items-center justify-end">
          <button
            type="submit"
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Submit Request
          </button>
        </div>
      </form>
    </motion.div>
  );
}
