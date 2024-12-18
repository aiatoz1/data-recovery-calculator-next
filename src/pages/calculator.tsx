import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

const deviceTypes = [
  { id: 'hdd', name: 'Hard Drive (HDD)', basePrice: { min: 300, max: 800 } },
  { id: 'ssd', name: 'Solid State Drive (SSD)', basePrice: { min: 400, max: 900 } },
  { id: 'usb', name: 'USB Flash Drive', basePrice: { min: 200, max: 500 } },
  { id: 'raid', name: 'RAID Array', basePrice: { min: 800, max: 2000 } },
  { id: 'other', name: 'Other Storage Device', basePrice: { min: 300, max: 800 } },
];

const failureTypes = [
  { id: 'physical', name: 'Physical Damage', multiplier: 1.67 },
  { id: 'logical', name: 'Logical Failure', multiplier: 1.0 },
  { id: 'water', name: 'Water Damage', multiplier: 2.0 },
  { id: 'fire', name: 'Fire Damage', multiplier: 2.0 },
  { id: 'not_spinning', name: 'Not Spinning', multiplier: 1.67 },
  { id: 'clicking', name: 'Clicking Sound', multiplier: 1.67 },
  { id: 'not_recognized', name: 'Not Recognized', multiplier: 1.0 },
  { id: 'other', name: 'Other Issue', multiplier: 1.33 },
];

const storageCapacities = [
  { value: '250', label: '250GB' },
  { value: '500', label: '500GB' },
  { value: '640', label: '640GB' },
  { value: '750', label: '750GB' },
  { value: '1000', label: '1TB' },
  { value: '1500', label: '1.5TB' },
  { value: '2000', label: '2TB' },
  { value: '4000', label: '4TB' },
  { value: '8000', label: '8TB' },
  { value: '16000', label: '16TB' },
  { value: '32000', label: '32TB' },
  { value: 'other', label: 'Other Size' },
];

export default function Calculator() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    deviceType: '',
    failureType: '',
    capacity: '',
    customCapacity: '',
    urgency: 'standard',
    description: '',
  });

  const [quote, setQuote] = useState<{ min: number; max: number } | null>(null);

  // Calculate form progress
  const getProgress = () => {
    let progress = 0;
    const total = 4; // Total required fields
    if (formData.deviceType) progress++;
    if (formData.failureType) progress++;
    if (formData.capacity) progress++;
    if (formData.description) progress++;
    return (progress / total) * 100;
  };

  const calculatePrice = () => {
    const selectedDevice = deviceTypes.find(d => d.id === formData.deviceType);
    const selectedFailure = failureTypes.find(f => f.id === formData.failureType);
    
    if (!selectedDevice || !selectedFailure) return;

    const urgencyMultiplier = formData.urgency === 'urgent' ? 1.5 : 1.0;
    const capacityGB = formData.capacity === 'other' 
      ? parseInt(formData.customCapacity) || 0 
      : parseInt(formData.capacity) || 0;
    
    // Adjusted capacity multiplier to be more gentle
    const capacityMultiplier = Math.min(1 + (capacityGB / 4000) * 0.5, 1.5);

    const minPrice = selectedDevice.basePrice.min * selectedFailure.multiplier * urgencyMultiplier * capacityMultiplier;
    const maxPrice = selectedDevice.basePrice.max * selectedFailure.multiplier * urgencyMultiplier * capacityMultiplier;

    setQuote({
      min: Math.round(minPrice),
      max: Math.round(maxPrice)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    calculatePrice();
  };

  return (
    <>
      <Head>
        <title>Data Recovery Cost Calculator | Get Instant Price Estimate</title>
        <meta name="description" content="Calculate data recovery costs instantly. Get accurate price estimates for hard drive, SSD, and RAID recovery. Professional data recovery services starting at $300." />
        <meta name="keywords" content="data recovery calculator, hard drive recovery cost, data recovery price, SSD recovery cost, RAID recovery pricing" />
        <meta property="og:title" content="Data Recovery Cost Calculator | Get Instant Price Estimate" />
        <meta property="og:description" content="Calculate data recovery costs instantly. Professional services starting at $300." />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
          <div className="px-4 py-8 sm:px-0">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg px-6 py-8 sm:px-8"
            >
              <div className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">Data Recovery Cost Calculator</h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
                  Get an instant estimate for your data recovery needs. Professional recovery services starting from $300.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700">
                      Device Type
                    </label>
                    <select
                      id="deviceType"
                      name="deviceType"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      value={formData.deviceType}
                      onChange={(e) => setFormData({ ...formData, deviceType: e.target.value })}
                      required
                    >
                      <option value="">Select a device type</option>
                      {deviceTypes.map((device) => (
                        <option key={device.id} value={device.id}>
                          {device.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="failureType" className="block text-sm font-medium text-gray-700">
                      Failure Type
                    </label>
                    <select
                      id="failureType"
                      name="failureType"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      value={formData.failureType}
                      onChange={(e) => setFormData({ ...formData, failureType: e.target.value })}
                      required
                    >
                      <option value="">Select a failure type</option>
                      {failureTypes.map((failure) => (
                        <option key={failure.id} value={failure.id}>
                          {failure.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                      Storage Capacity
                    </label>
                    <div className="space-y-2">
                      <select
                        id="capacity"
                        name="capacity"
                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                        value={formData.capacity}
                        onChange={(e) => setFormData({ ...formData, capacity: e.target.value })}
                        required
                      >
                        <option value="">Select storage capacity</option>
                        {storageCapacities.map((cap) => (
                          <option key={cap.value} value={cap.value}>
                            {cap.label}
                          </option>
                        ))}
                      </select>
                      {formData.capacity === 'other' && (
                        <div>
                          <label htmlFor="customCapacity" className="sr-only">Custom Storage Capacity (GB)</label>
                          <input
                            type="number"
                            id="customCapacity"
                            name="customCapacity"
                            placeholder="Enter size in GB"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                            value={formData.customCapacity}
                            onChange={(e) => setFormData({ ...formData, customCapacity: e.target.value })}
                            required
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="urgency" className="block text-sm font-medium text-gray-700">
                      Service Type
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
                      value={formData.urgency}
                      onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    >
                      <option value="standard">Standard Service</option>
                      <option value="urgent">Urgent Service</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Problem Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={4}
                    className="mt-1 focus:ring-primary-500 focus:border-primary-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Calculate Recovery Cost
                  </button>
                </div>
              </form>

              {quote && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-8 p-6 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm"
                >
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">Estimated Recovery Cost</h2>
                      <p className="mt-1 text-sm text-gray-500">Based on your device specifications and failure type</p>
                    </div>
                    <p className="text-3xl font-bold text-primary-600">
                      ${quote.min.toLocaleString()} - ${quote.max.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="mt-6 border-t border-gray-200 pt-6">
                    <h3 className="text-lg font-medium text-gray-900">What's included:</h3>
                    <ul className="mt-4 grid gap-4 sm:grid-cols-2">
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-gray-600">Free diagnostic evaluation</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-gray-600">No data, no charge policy</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-gray-600">Professional clean room recovery</span>
                      </li>
                      <li className="flex items-start">
                        <svg className="h-5 w-5 text-green-500 mt-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="ml-2 text-gray-600">Secure data handling</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2">
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 shadow-sm"
                      onClick={() => {
                        router.push({
                          pathname: '/directory',
                          query: {
                            deviceType: formData.deviceType,
                            failureType: formData.failureType,
                            capacity: formData.capacity === 'other' ? formData.customCapacity : formData.capacity,
                            urgency: formData.urgency,
                            description: formData.description,
                            estimatedMin: quote.min,
                            estimatedMax: quote.max
                          }
                        });
                      }}
                    >
                      Find Recovery Services Near You
                      <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center px-6 py-3 border border-primary-600 text-base font-medium rounded-md text-primary-600 bg-white hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                      onClick={() => {
                        window.location.href = `tel:${encodeURIComponent('1-800-XXX-XXXX')}`;
                      }}
                    >
                      Call for Emergency Service
                      <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                    </button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </main>
    </>
  );
}
