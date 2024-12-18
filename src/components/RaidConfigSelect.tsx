import React from 'react';

export const raidConfigs = [
  {
    value: "raid0",
    label: "RAID 0 (Striping)",
    description: "Data spread across multiple drives for performance",
    drives: "2+ drives",
    risk: "High - No redundancy",
    complexity: "Low"
  },
  {
    value: "raid1",
    label: "RAID 1 (Mirroring)",
    description: "Data mirrored across drives for redundancy",
    drives: "2+ drives",
    risk: "Medium",
    complexity: "Low"
  },
  {
    value: "raid5",
    label: "RAID 5 (Striping with Parity)",
    description: "Data and parity spread across drives",
    drives: "3+ drives",
    risk: "Medium",
    complexity: "Medium"
  },
  {
    value: "raid6",
    label: "RAID 6 (Double Parity)",
    description: "Data with double parity protection",
    drives: "4+ drives",
    risk: "Low",
    complexity: "High"
  },
  {
    value: "raid10",
    label: "RAID 10 (Striping + Mirroring)",
    description: "Combined striping and mirroring",
    drives: "4+ drives",
    risk: "Low",
    complexity: "High"
  }
];

interface RaidConfigSelectProps {
  value: string;
  onChange: (value: string) => void;
  numDrives: number;
  onDrivesChange: (value: number) => void;
  className?: string;
}

export default function RaidConfigSelect({
  value,
  onChange,
  numDrives,
  onDrivesChange,
  className = ''
}: RaidConfigSelectProps) {
  const selectedConfig = raidConfigs.find(config => config.value === value);

  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {raidConfigs.map((config) => (
            <option key={config.value} value={config.value}>
              {config.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="numDrives" className="block text-sm font-medium text-gray-700">
          Number of Drives
        </label>
        <select
          id="numDrives"
          value={numDrives}
          onChange={(e) => onDrivesChange(parseInt(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
        >
          {[...Array(13)].map((_, i) => {
            const drives = i + 2;
            const minDrives = parseInt(selectedConfig?.drives.split('+')[0] || '2');
            return (
              <option key={drives} value={drives} disabled={drives < minDrives}>
                {drives} Drives {drives < minDrives ? '(Not supported)' : ''}
              </option>
            );
          })}
        </select>
      </div>

      {selectedConfig && (
        <div className="rounded-md bg-gray-50 p-4">
          <div className="text-sm text-gray-700">
            <p><strong>Description:</strong> {selectedConfig.description}</p>
            <p className="mt-2"><strong>Minimum Configuration:</strong> {selectedConfig.drives}</p>
            <p className="mt-2"><strong>Risk Level:</strong> {selectedConfig.risk}</p>
            <p className="mt-2"><strong>Recovery Complexity:</strong> {selectedConfig.complexity}</p>
          </div>
        </div>
      )}
    </div>
  );
}
