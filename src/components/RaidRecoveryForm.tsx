import React, { useState } from 'react';

export interface RaidRecoveryRequest {
  name: string;
  email: string;
  phone: string;
  arrayType: string;
  raidLevel: string;
  customRaidConfig?: string;
  numDrives: number;
  dataType: string;
  failureSummary: string;
  isEmergency: boolean;
  preferredContact: 'phone' | 'email';
  bestTimeToCall?: string;
}

const arrayTypes = [
  { value: 'hardware', label: 'Hardware RAID' },
  { value: 'software', label: 'Software RAID' },
  { value: 'nas', label: 'NAS Device' },
  { value: 'san', label: 'SAN Storage' },
  { value: 'other', label: 'Other' }
];

const raidLevels = [
  { value: 'raid0', label: 'RAID 0 (Striping)', minDrives: 2 },
  { value: 'raid1', label: 'RAID 1 (Mirroring)', minDrives: 2 },
  { value: 'raid5', label: 'RAID 5 (Single Parity)', minDrives: 3 },
  { value: 'raid6', label: 'RAID 6 (Double Parity)', minDrives: 4 },
  { value: 'raid10', label: 'RAID 10 (Stripe + Mirror)', minDrives: 4 },
  { value: 'raid50', label: 'RAID 50 (Stripe + Parity)', minDrives: 6 },
  { value: 'jbod', label: 'JBOD (Just a Bunch of Disks)', minDrives: 2 },
  { value: 'custom', label: 'Custom Configuration', minDrives: 2 }
];

const dataTypes = [
  { value: 'business', label: 'Business Documents' },
  { value: 'database', label: 'Database' },
  { value: 'email', label: 'Email Server' },
  { value: 'virtualizations', label: 'Virtual Machines' },
  { value: 'media', label: 'Media Files' },
  { value: 'backup', label: 'Backup Storage' },
  { value: 'other', label: 'Other' }
];

interface Props {
  onSubmit: (request: RaidRecoveryRequest) => void;
  className?: string;
}

export default function RaidRecoveryForm({ onSubmit, className = '' }: Props) {
  const [formData, setFormData] = useState<RaidRecoveryRequest>({
    name: '',
    email: '',
    phone: '',
    arrayType: '',
    raidLevel: '',
    customRaidConfig: '',
    numDrives: 2,
    dataType: '',
    failureSummary: '',
    isEmergency: false,
    preferredContact: 'phone'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (name === 'numDrives') {
      const numValue = parseInt(value) || 2;
      const level = raidLevels.find(r => r.value === formData.raidLevel);
      const minDrives = level?.minDrives || 2;
      setFormData(prev => ({
        ...prev,
        numDrives: Math.max(minDrives, numValue)
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        // Reset number of drives to minimum when RAID level changes
        ...(name === 'raidLevel' ? {
          numDrives: raidLevels.find(r => r.value === value)?.minDrives || 2
        } : {})
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-6 ${className}`}>
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              name="phone"
              id="phone"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">RAID Configuration</h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="arrayType" className="block text-sm font-medium text-gray-700">
              Type of Array
            </label>
            <select
              name="arrayType"
              id="arrayType"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.arrayType}
              onChange={handleChange}
            >
              <option value="">Select Array Type</option>
              {arrayTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="raidLevel" className="block text-sm font-medium text-gray-700">
              RAID Level
            </label>
            <select
              name="raidLevel"
              id="raidLevel"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.raidLevel}
              onChange={handleChange}
            >
              <option value="">Select RAID Level</option>
              {raidLevels.map(level => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>
          {formData.raidLevel === 'custom' && (
            <div className="sm:col-span-2">
              <label htmlFor="customRaidConfig" className="block text-sm font-medium text-gray-700">
                Custom RAID Configuration
              </label>
              <textarea
                name="customRaidConfig"
                id="customRaidConfig"
                required
                rows={2}
                placeholder="Please describe your RAID configuration (e.g., Nested RAID, Special Controller, etc.)"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.customRaidConfig}
                onChange={handleChange}
              />
            </div>
          )}
          <div>
            <label htmlFor="numDrives" className="block text-sm font-medium text-gray-700">
              Number of Drives
            </label>
            <input
              type="number"
              name="numDrives"
              id="numDrives"
              min={formData.raidLevel ? raidLevels.find(r => r.value === formData.raidLevel)?.minDrives || 2 : 2}
              max="24"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.numDrives}
              onChange={handleChange}
            />
            {formData.raidLevel && (
              <p className="mt-1 text-sm text-gray-500">
                Minimum {raidLevels.find(r => r.value === formData.raidLevel)?.minDrives || 2} drives required for {
                  raidLevels.find(r => r.value === formData.raidLevel)?.label || 'this configuration'
                }
              </p>
            )}
          </div>
          <div>
            <label htmlFor="dataType" className="block text-sm font-medium text-gray-700">
              Type of Data
            </label>
            <select
              name="dataType"
              id="dataType"
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              value={formData.dataType}
              onChange={handleChange}
            >
              <option value="">Select Data Type</option>
              {dataTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Failure Details</h3>
        <div className="space-y-4">
          <div>
            <label htmlFor="failureSummary" className="block text-sm font-medium text-gray-700">
              Failure Summary
            </label>
            <textarea
              name="failureSummary"
              id="failureSummary"
              rows={4}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              placeholder="Please describe what happened, any error messages, and when the issue started..."
              value={formData.failureSummary}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="isEmergency"
              id="isEmergency"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              checked={formData.isEmergency}
              onChange={handleChange}
            />
            <label htmlFor="isEmergency" className="ml-2 block text-sm text-gray-900">
              This is an emergency (24/7 priority service)
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-sm rounded-lg p-6">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Preference</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Preferred Contact Method</label>
            <div className="mt-2 space-x-4">
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="phone"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={formData.preferredContact === 'phone'}
                  onChange={handleChange}
                />
                <span className="ml-2">Phone</span>
              </label>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  name="preferredContact"
                  value="email"
                  className="form-radio h-4 w-4 text-blue-600"
                  checked={formData.preferredContact === 'email'}
                  onChange={handleChange}
                />
                <span className="ml-2">Email</span>
              </label>
            </div>
          </div>
          {formData.preferredContact === 'phone' && (
            <div>
              <label htmlFor="bestTimeToCall" className="block text-sm font-medium text-gray-700">
                Best Time to Call
              </label>
              <select
                name="bestTimeToCall"
                id="bestTimeToCall"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                value={formData.bestTimeToCall || ''}
                onChange={handleChange}
              >
                <option value="">Select Time</option>
                <option value="morning">Morning (9AM - 12PM)</option>
                <option value="afternoon">Afternoon (12PM - 5PM)</option>
                <option value="evening">Evening (5PM - 8PM)</option>
                <option value="anytime">Anytime (24/7 Emergency)</option>
              </select>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Submit Request
        </button>
      </div>
    </form>
  );
}
