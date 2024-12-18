import React from 'react';

export const deviceTypes = [
  {
    value: "hard-drive",
    label: "Hard Drive (HDD)",
    description: "Traditional spinning hard drive"
  },
  {
    value: "ssd",
    label: "Solid State Drive (SSD)",
    description: "Flash-based storage device"
  },
  {
    value: "raid",
    label: "RAID Array",
    description: "Multiple drives in array configuration",
    customNote: "Custom quote needed - complex configuration"
  },
  {
    value: "nas",
    label: "NAS Device",
    description: "Network Attached Storage",
    customNote: "Custom quote needed - multiple drives"
  },
  {
    value: "flash-drive",
    label: "USB Flash Drive",
    description: "Portable USB storage device"
  },
  {
    value: "memory-card",
    label: "Memory Card",
    description: "SD, microSD, CF cards"
  }
];

interface DeviceTypeSelectProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export default function DeviceTypeSelect({
  value,
  onChange,
  className = ''
}: DeviceTypeSelectProps) {
  const selectedDevice = deviceTypes.find(device => device.value === value);

  return (
    <div className={className}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      >
        <option value="">Select Device Type</option>
        {deviceTypes.map((device) => (
          <option key={device.value} value={device.value}>
            {device.label}
          </option>
        ))}
      </select>
      
      {selectedDevice && (
        <div className="mt-2 text-sm text-gray-500">
          {selectedDevice.description}
          {selectedDevice.customNote && (
            <div className="mt-1 text-blue-600 font-medium">
              {selectedDevice.customNote}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
