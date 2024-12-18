import { useState } from 'react';
import Head from 'next/head';
import { motion } from 'framer-motion';

const companies = [
  {
    name: '24 Hour Data',
    website: 'www.24hourdata.com',
    description: 'Emergency data recovery services available 24/7. Specializing in all types of data recovery needs.',
    features: ['24/7 Emergency Service', 'All Storage Types', 'Nationwide Service'],
    rating: 5,
    featured: true
  },
  {
    name: 'Hard Drive Repair',
    website: 'www.harddriverepair.com',
    description: 'Expert hard drive repair and data recovery services. Professional clean room facility.',
    features: ['Clean Room Facility', 'HDD Specialists', 'Fast Turnaround'],
    rating: 5,
    featured: true
  },
  {
    name: 'DriveSavers',
    website: 'www.drivesavers.com',
    description: 'Industry leader in data recovery, providing secure and certified services.',
    features: ['Certified Security', 'Advanced Recovery', 'All Device Types'],
    rating: 5,
    featured: false
  },
  {
    name: 'Ontrack',
    website: 'www.ontrack.com',
    description: 'Global leader in data recovery with advanced proprietary technology.',
    features: ['Global Presence', 'Proprietary Technology', 'Enterprise Solutions'],
    rating: 5,
    featured: false
  },
  {
    name: 'Secure Data Recovery',
    website: 'www.securedatarecovery.com',
    description: 'Secure and certified data recovery services with multiple security certifications.',
    features: ['Security Certified', 'All Media Types', 'Free Diagnostics'],
    rating: 5,
    featured: false
  }
];

export default function Directory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCompanies, setFilteredCompanies] = useState(companies);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    setFilteredCompanies(
      companies.filter(company => 
        company.name.toLowerCase().includes(term) ||
        company.description.toLowerCase().includes(term) ||
        company.features.some(feature => feature.toLowerCase().includes(term))
      )
    );
  };

  return (
    <>
      <Head>
        <title>Data Recovery Companies Directory - Find Trusted Services</title>
        <meta name="description" content="Find trusted data recovery companies across the United States. Compare services, features, and expertise to choose the right provider for your needs." />
      </Head>

      <main className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Trusted Data Recovery Companies
              </h1>
              <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
                Find professional data recovery services across the United States
              </p>
            </motion.div>
          </div>

          <div className="mt-12">
            <div className="max-w-xl mx-auto mb-8">
              <input
                type="text"
                placeholder="Search companies by name, features, or services..."
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>

            <div className="mt-12 max-w-lg mx-auto grid gap-8 lg:grid-cols-2 lg:max-w-none">
              {filteredCompanies.map((company, index) => (
                <motion.div
                  key={company.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex flex-col rounded-lg shadow-lg overflow-hidden bg-white"
                >
                  <div className="flex-1 p-6 flex flex-col justify-between">
                    <div className="flex-1">
                      <div className="flex justify-between items-center">
                        <a
                          href={`https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block mt-2"
                        >
                          <p className="text-xl font-semibold text-gray-900">{company.name}</p>
                        </a>
                        {company.featured && (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-sm font-medium bg-primary-100 text-primary-800">
                            Featured
                          </span>
                        )}
                      </div>
                      <p className="mt-3 text-base text-gray-500">{company.description}</p>
                      <div className="mt-4 flex flex-wrap gap-2">
                        {company.features.map(feature => (
                          <span
                            key={feature}
                            className="inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="mt-6 flex items-center">
                      <div className="flex-shrink-0">
                        <div className="flex space-x-1">
                          {[...Array(company.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="h-5 w-5 text-yellow-400"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path
                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                              />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <div className="ml-3">
                        <a
                          href={`https://${company.website}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm font-medium text-primary-600 hover:text-primary-500"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
