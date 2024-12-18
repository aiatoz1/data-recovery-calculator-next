import Head from 'next/head';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState } from 'react';
import ChatBot from '../components/ChatBot';
import StorageCapacitySelect from '../components/StorageCapacitySelect';
import DeviceTypeSelect from '../components/DeviceTypeSelect';
import RaidRecoveryForm from '../components/RaidRecoveryForm';
import ContactForm from '../components/ContactForm';
import type { RaidRecoveryRequest } from '../components/RaidRecoveryForm';

export default function Home() {
  const [capacity, setCapacity] = useState('2TB');
  const [deviceType, setDeviceType] = useState('hard-drive');
  const [showRaidForm, setShowRaidForm] = useState(false);
  const [submissionStatus, setSubmissionStatus] = useState<{
    success?: boolean;
    message?: string;
    requestId?: string;
  }>({});
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null);
  const [isUrgent, setIsUrgent] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);

  const handleRaidFormSubmit = async (request: RaidRecoveryRequest) => {
    try {
      const response = await fetch('/api/raid-recovery-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      setSubmissionStatus(data);
      if (data.success) {
        setShowRaidForm(false);
      }
    } catch (error) {
      setSubmissionStatus({
        success: false,
        message: 'An error occurred. Please try again or contact us directly.',
      });
    }
  };

  const calculatePrice = () => {
    let basePrice = 0;
    let capacityMultiplier = 1;

    // Set base price based on device type
    switch (deviceType) {
      case 'hard-drive':
        basePrice = 300; // Logical recovery starting price
        break;
      case 'ssd':
        basePrice = 400; // SSDs are typically more complex
        break;
      case 'raid':
        basePrice = 1000; // RAID systems start higher
        break;
      case 'nas':
        basePrice = 800; // NAS devices
        break;
      case 'flash-drive':
        basePrice = 250; // USB drives start lower
        break;
      case 'memory-card':
        basePrice = 250; // Memory cards start lower
        break;
      default:
        basePrice = 300;
    }

    // Add capacity multiplier
    if (capacity) {
      const capacityValue = parseInt(capacity.replace(/[^0-9]/g, ''));
      if (capacityValue <= 1) { // 1TB or less
        capacityMultiplier = 1;
      } else if (capacityValue <= 4) { // 2-4TB
        capacityMultiplier = 1.5;
      } else if (capacityValue <= 8) { // 5-8TB
        capacityMultiplier = 2;
      } else if (capacityValue <= 12) { // 9-12TB
        capacityMultiplier = 2.5;
      } else { // > 12TB
        capacityMultiplier = 3;
      }
    }

    // Calculate final price
    let finalPrice = basePrice * capacityMultiplier;

    // Add urgent service fee if selected
    if (isUrgent) {
      finalPrice *= 1.5; // 50% premium for urgent service
    }

    // Round to nearest hundred
    finalPrice = Math.ceil(finalPrice / 100) * 100;

    setEstimatedPrice(finalPrice);
    setShowContactForm(true);
  };

  return (
    <>
      <Head>
        <title>Data Recovery Cost Calculator | Instant Price Estimates 2024</title>
        <meta name="description" content="Get instant data recovery pricing estimates. Calculate costs for hard drive recovery, SSD, RAID, and more. Starting from $300 for logical recovery, $500 for physical damage." />
        <meta name="keywords" content="data recovery cost, hard drive recovery price, SSD recovery cost, RAID recovery pricing, data recovery calculator" />
        <meta property="og:title" content="Data Recovery Cost Calculator | Instant Price Estimates 2024" />
        <meta property="og:description" content="Get instant data recovery pricing estimates. Calculate costs for hard drive recovery, SSD, RAID, and more. Starting from $300." />
        <link rel="canonical" href="https://yourwebsite.com/calculator" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Title Section */}
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl mb-8"
          >
            <span className="block">Data Recovery</span>
            <span className="block text-blue-600">Pricing Calculator</span>
          </motion.h1>

          {/* Form Fields */}
          <div className="max-w-md mx-auto mb-8">
            {/* Device Type Selection */}
            <div className="mb-4">
              <label htmlFor="deviceType" className="block text-sm font-medium text-gray-700 text-left mb-2">
                Device Type
              </label>
              <DeviceTypeSelect
                value={deviceType}
                onChange={setDeviceType}
              />
            </div>

            {/* Drive Capacity Selection */}
            {deviceType !== 'raid' && deviceType !== 'nas' && (
              <div className="mb-4">
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 text-left mb-2">
                  Drive Capacity
                </label>
                <StorageCapacitySelect
                  value={capacity}
                  onChange={setCapacity}
                />
              </div>
            )}

            {/* Urgent Service */}
            <div className="mb-4">
              <label htmlFor="urgentService" className="block text-sm font-medium text-gray-700 text-left mb-2">
                Urgent Service
              </label>
              <div className="flex items-center">
                <input
                  id="urgentService"
                  type="checkbox"
                  checked={isUrgent}
                  onChange={() => setIsUrgent(!isUrgent)}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-sm text-gray-600">50% premium for urgent service</span>
              </div>
            </div>

            {/* Calculate Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              onClick={() => calculatePrice()}
            >
              Calculate Your Recovery Cost
            </motion.button>

          </div>

          <div className="text-center">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl"
            >
              
            </motion.p>

            {/* Price Range Cards */}
            <div className="mt-10 grid gap-5 max-w-lg mx-auto lg:grid-cols-3 lg:max-w-none">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-1 bg-white p-6">
                  <h3 className="text-xl font-semibold text-gray-900">Logical Recovery</h3>
                  <p className="mt-3 text-primary-600 text-4xl font-bold">From $300</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500">
                    <li>• Deleted Files</li>
                    <li>• Formatted Drive</li>
                    <li>• Corrupted Data</li>
                    <li>• Operating System Errors</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-1 bg-white p-6">
                  <h3 className="text-xl font-semibold text-gray-900">Physical Recovery</h3>
                  <p className="mt-3 text-primary-600 text-4xl font-bold">From $500</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500">
                    <li>• Clicking Sounds</li>
                    <li>• Not Spinning</li>
                    <li>• Physical Damage</li>
                    <li>• Water Damage</li>
                  </ul>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-col rounded-lg shadow-lg overflow-hidden"
              >
                <div className="flex-1 bg-white p-6">
                  <h3 className="text-xl font-semibold text-gray-900">RAID Recovery</h3>
                  <p className="mt-3 text-primary-600 text-4xl font-bold">From $1000</p>
                  <ul className="mt-4 space-y-2 text-sm text-gray-500">
                    <li>• All RAID Levels</li>
                    <li>• Server Recovery</li>
                    <li>• NAS Systems</li>
                    <li>• Multiple Drives</li>
                  </ul>
                </div>
              </motion.div>
            </div>

            <div className="mt-10">
            </div>

            {/* FAQ Section for SEO */}
            <div className="mt-20 text-left">
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Data Recovery Pricing FAQ</h2>
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">How much does data recovery cost?</h3>
                  <p className="mt-2 text-gray-500">Data recovery costs typically range from $300 to $2500+, depending on the type of failure and device. Logical recovery starts at $300, while physical recovery starts at $500. RAID systems generally start at $1000.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">What factors affect data recovery pricing?</h3>
                  <p className="mt-2 text-gray-500">The main factors are: type of failure (logical vs physical), device type (HDD, SSD, RAID), storage capacity, service urgency, and the extent of damage. Complex recoveries or emergency services may cost more.</p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">Do you charge if data recovery is not possible?</h3>
                  <p className="mt-2 text-gray-500">Most professional data recovery services offer free evaluations and only charge if they successfully recover your data. Always confirm the "no data, no charge" policy with your chosen provider.</p>
                </div>
              </div>
            </div>

            <div className="mt-8 max-w-md mx-auto space-y-6">
              {/* Pricing Cards */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-2">Logical Recovery</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">From $300</p>
                  <ul className="space-y-2">
                    <li>✓ Software/File System Issues</li>
                    <li>✓ Accidental Deletion</li>
                    <li>✓ Partition Problems</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-2">Physical Recovery</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">From $500</p>
                  <ul className="space-y-2">
                    <li>✓ Hardware Failures</li>
                    <li>✓ Clean Room Service</li>
                    <li>✓ Component Replacement</li>
                  </ul>
                </div>
                <div className="bg-white rounded-lg p-6 shadow-lg">
                  <h3 className="text-xl font-bold mb-2">RAID Recovery</h3>
                  <p className="text-3xl font-bold text-blue-600 mb-2">From $1000</p>
                  <ul className="space-y-2">
                    <li>✓ Multiple Drive Recovery</li>
                    <li>✓ Array Reconstruction</li>
                    <li>✓ Business Solutions</li>
                  </ul>
                </div>
              </div>
            </div>

            {deviceType === 'raid' && !showRaidForm && !submissionStatus.success && (
              <div className="bg-white shadow-sm rounded-lg p-6 text-left">
                <h3 className="text-lg font-medium text-gray-900 mb-2">RAID Recovery Services</h3>
                <p className="text-sm text-gray-600 mb-4">
                  For RAID recovery, we'll need some additional information to provide you with the most accurate service. Our specialists will assess your configuration and create a custom recovery plan.
                </p>
                <button
                  onClick={() => setShowRaidForm(true)}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Start RAID Recovery Request
                </button>
              </div>
            )}

            {deviceType === 'raid' && showRaidForm && !submissionStatus.success && (
              <RaidRecoveryForm onSubmit={handleRaidFormSubmit} />
            )}

            {deviceType === 'raid' && submissionStatus.success && (
              <div className="bg-green-50 border border-green-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">Request Submitted Successfully</h3>
                    <div className="mt-2 text-sm text-green-700">
                      <p>{submissionStatus.message}</p>
                      {submissionStatus.requestId && (
                        <p className="mt-2">Reference ID: {submissionStatus.requestId}</p>
                      )}
                    </div>
                    <div className="mt-4">
                      <button
                        onClick={() => {
                          setShowRaidForm(false);
                          setSubmissionStatus({});
                        }}
                        className="text-sm font-medium text-green-600 hover:text-green-500"
                      >
                        Submit Another Request
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {deviceType === 'nas' && (
              <div className="bg-blue-50 border border-blue-200 rounded-md p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-blue-800">Custom Configuration Required</h3>
                    <div className="mt-2 text-sm text-blue-700">
                      <p>Due to the complexity of NAS devices, please contact us for a custom quote. Our experts will assess your specific configuration and provide an accurate estimate.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 max-w-md mx-auto sm:flex sm:justify-center">
            <div className="rounded-md shadow">
              <Link href="/directory" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg">
                Find Recovery Services
              </Link>
            </div>
          </div>
        </div>
      </main>
      <ChatBot selectedCapacity={capacity} selectedDeviceType={deviceType} />
      {showContactForm && estimatedPrice && (
        <ContactForm
          deviceType={deviceType}
          capacity={capacity}
          estimatedPrice={estimatedPrice}
          isUrgent={isUrgent}
          onClose={() => setShowContactForm(false)}
        />
      )}
    </>
  );
}
