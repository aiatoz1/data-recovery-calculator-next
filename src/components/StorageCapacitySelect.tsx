import React from 'react';

export const storageCapacities = [
  { value: "500GB", label: "500GB", bytes: 500 * 1024 * 1024 * 1024 },
  { value: "1TB", label: "1 Terabyte (1TB)", bytes: 1024 * 1024 * 1024 * 1024 },
  { value: "2TB", label: "2 Terabytes (2TB)", bytes: 2 * 1024 * 1024 * 1024 * 1024 },
  { value: "4TB", label: "4 Terabytes (4TB)", bytes: 4 * 1024 * 1024 * 1024 * 1024 },
  { value: "6TB", label: "6 Terabytes (6TB)", bytes: 6 * 1024 * 1024 * 1024 * 1024 },
  { value: "8TB", label: "8 Terabytes (8TB)", bytes: 8 * 1024 * 1024 * 1024 * 1024 },
  { value: "10TB", label: "10 Terabytes (10TB)", bytes: 10 * 1024 * 1024 * 1024 * 1024 },
  { value: "12TB", label: "12 Terabytes (12TB)", bytes: 12 * 1024 * 1024 * 1024 * 1024 },
  { value: "14TB", label: "14 Terabytes (14TB)", bytes: 14 * 1024 * 1024 * 1024 * 1024 },
  { value: "16TB", label: "16 Terabytes (16TB)", bytes: 16 * 1024 * 1024 * 1024 * 1024 },
  { value: "18TB", label: "18 Terabytes (18TB)", bytes: 18 * 1024 * 1024 * 1024 * 1024 },
  { value: "20TB", label: "20 Terabytes (20TB)", bytes: 20 * 1024 * 1024 * 1024 * 1024 },
];

interface StorageCapacitySelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function StorageCapacitySelect({
  value,
  onChange,
  className = ''
}: StorageCapacitySelectProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 ${className}`}
    >
      <option value="">Select Storage Capacity</option>
      {storageCapacities.map((capacity) => (
        <option key={capacity.value} value={capacity.value}>
          {capacity.label}
        </option>
      ))}
    </select>
  );
}
