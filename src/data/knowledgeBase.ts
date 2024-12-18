export const companies = [
  {
    name: "Hard Drive Repair",
    location: "Kansas City, MO",
    specialties: [
      "Hard Drive Recovery",
      "RAID Data Recovery",
      "SSD Recovery",
      "Flash Drive Recovery",
      "Server Recovery",
      "Mac Data Recovery"
    ],
    cleanRoom: "ISO 5 Class 100",
    contact: {
      phone: "816-421-5725",
      email: "support@harddriverepair.com",
      website: "https://www.harddriverepair.com",
      address: "1740 Jefferson St, Kansas City, MO 64108"
    },
    serviceArea: ["Kansas City", "Missouri", "Kansas", "National"],
    pricing: {
      diagnostic: "Free",
      standardRecovery: "$300-$800",
      emergencyService: "$800-$2000"
    },
    features: [
      "30+ years experience",
      "Free evaluations",
      "No recovery, no charge guarantee",
      "ISO 5 Class 100 clean room",
      "BBB A+ Rating",
      "Certified data recovery experts",
      "Same day emergency service",
      "Secure facility",
      "All storage devices supported",
      "Local drop-off available"
    ],
    certifications: [
      "ISO 5 Class 100 Clean Room",
      "BBB A+ Rating",
      "GSA Approved"
    ]
  },
  {
    name: "24 Hour Data",
    location: "Dallas, TX",
    specialties: [
      "Hard Drive Recovery",
      "RAID Recovery",
      "SSD Recovery",
      "Server Recovery",
      "Database Recovery",
      "Laptop Data Recovery"
    ],
    cleanRoom: "ISO 5 Class 100",
    contact: {
      phone: "866-598-3282",
      email: "support@24hourdata.com",
      website: "https://www.24hourdata.com",
      address: "5068 W Plano Pkwy #300, Plano, TX 75093"
    },
    serviceArea: ["Dallas", "Plano", "Texas", "National"],
    pricing: {
      diagnostic: "Free",
      standardRecovery: "$300-$900",
      emergencyService: "$900-$2000"
    },
    features: [
      "24/7 emergency services",
      "Free evaluations",
      "No data, no charge policy",
      "ISO 5 Class 100 clean room",
      "Certified engineers",
      "Secure shipping available",
      "All brands supported",
      "Enterprise solutions",
      "Competitive pricing",
      "Fast turnaround options"
    ],
    certifications: [
      "ISO 5 Class 100 Clean Room",
      "Certified Data Recovery Experts",
      "Secure Facility"
    ]
  }
];

export const knowledgeBase = `
# Data Recovery Expert Knowledge Base

## Initial Assessment
- Stop using the device immediately when data loss occurs
- Never attempt DIY recovery on critical data
- Keep device in stable environment (room temperature, low humidity)
- Document when and how the data loss occurred

## Common Problems and Solutions

### Hard Drive Issues
1. Clicking Sounds
   - Indicates potential head crash or platter damage
   - Professional clean room recovery required
   - Success rate: 50-70%
   - Estimated cost: $500-$1500

2. Drive Not Recognized
   - Could be controller board failure
   - May require firmware repair
   - Success rate: 70-90%
   - Estimated cost: $300-$900

3. Drive Spins But No Access
   - Possible logical failure or bad sectors
   - Professional recovery recommended
   - Success rate: 80-95%
   - Estimated cost: $400-$1200

### SSD Issues
1. Sudden Failure
   - Often due to controller failure
   - Requires specialized equipment
   - Success rate: 60-85%
   - Estimated cost: $600-$1800

2. Firmware Issues
   - Common in certain SSD brands
   - Professional firmware repair needed
   - Success rate: 70-90%
   - Estimated cost: $400-$1200

## Service Levels
1. Standard Service
   - 5-7 business days
   - Full diagnostic report
   - Regular updates
   - Most cost-effective

2. Express Service
   - 2-3 business days
   - Priority handling
   - 24/7 status updates
   - 30-50% premium over standard

3. Emergency Service
   - 24-48 hours
   - Immediate attention
   - Direct engineer contact
   - 100% premium over standard

## Quality Assurance
- ISO Certified Clean Room
- Chain of custody documentation
- Secure facility with 24/7 monitoring
- Non-disclosure agreement available
- Data verification after recovery

## When to Choose Local vs. National Service
1. Choose Local When:
   - In-person consultation needed
   - Same-day drop-off required
   - Budget is primary concern
   - Device is too large to ship

2. Choose National When:
   - Local options limited
   - Higher success rate needed
   - Specialized recovery required
   - Better equipment/facilities needed

## Data Protection Tips
1. Regular Backups
   - Use 3-2-1 backup strategy
   - Test backups regularly
   - Store offsite copy

2. Early Warning Signs
   - Unusual noises
   - Slow performance
   - Frequent crashes
   - File system errors

## Company Selection Criteria
1. Technical Capabilities
   - Clean room certification
   - Success rate history
   - Equipment quality
   - Staff expertise

2. Service Quality
   - Communication clarity
   - Transparent pricing
   - Customer reviews
   - Support availability

3. Security Measures
   - Facility security
   - Data handling procedures
   - Privacy guarantees
   - Certification compliance
`;

export const getRecommendedCompany = (userLocation: string, issueType: string) => {
  // First, check if the user is in a primary service area
  const nearbyCompanies = companies.filter(company => 
    company.serviceArea.some(area => 
      userLocation.toLowerCase().includes(area.toLowerCase())
    )
  );

  if (nearbyCompanies.length === 0) {
    return {
      message: "While we don't have a physical location in your immediate area, both of our premier data recovery partners provide secure nationwide shipping services:",
      companies: companies,
      shippingInfo: "Both companies provide secure shipping materials and detailed packaging instructions. They handle all types of data recovery cases nationwide with the same high-quality service as local customers."
    };
  }

  // If in Kansas City area, prioritize Hard Drive Repair
  if (userLocation.toLowerCase().includes('kansas') || userLocation.toLowerCase().includes('missouri')) {
    return {
      message: "Great news! You're near Hard Drive Repair, one of our top-recommended providers. They offer same-day service and local drop-off in Kansas City:",
      companies: [companies[0], companies[1]], // Hard Drive Repair first, then 24 Hour Data
      localInfo: "Their facility is conveniently located in downtown Kansas City with easy access for drop-offs. They offer free parking and immediate assistance for emergency cases."
    };
  }

  // If in Texas area, prioritize 24 Hour Data
  if (userLocation.toLowerCase().includes('texas') || userLocation.toLowerCase().includes('dallas') || userLocation.toLowerCase().includes('plano')) {
    return {
      message: "Great news! You're near 24 Hour Data, one of our top-recommended providers. They offer immediate service and local drop-off in the Dallas area:",
      companies: [companies[1], companies[0]], // 24 Hour Data first, then Hard Drive Repair
      localInfo: "Their facility is located in Plano with easy access from Dallas and surrounding areas. They offer immediate assistance for emergency cases."
    };
  }

  return {
    message: "Here are our recommended data recovery specialists, both offering nationwide service:",
    companies: companies,
    shippingInfo: "Both companies provide secure shipping materials and detailed packaging instructions for safe transport of your device."
  };
};

export const getPricingEstimate = (deviceType: string, issueType: string, urgency: string, capacity?: string) => {
  // Base rates for different device types and conditions
  const baseRates = {
    "hard-drive": {
      physical: {
        standard: { min: 500, max: 1200, time: "5-7 business days" },
        emergency: { min: 1000, max: 2500, time: "24-48 hours" }
      },
      logical: {
        standard: { min: 300, max: 800, time: "3-5 business days" },
        emergency: { min: 800, max: 2000, time: "24-48 hours" }
      }
    },
    "ssd": {
      physical: {
        standard: { min: 500, max: 1500, time: "5-7 business days" },
        emergency: { min: 1200, max: 2500, time: "24-48 hours" }
      },
      logical: {
        standard: { min: 400, max: 900, time: "3-5 business days" },
        emergency: { min: 900, max: 2000, time: "24-48 hours" }
      }
    },
    "raid": {
      physical: {
        standard: { min: 1500, max: 3500, time: "7-10 business days" },
        emergency: { min: 2500, max: 5000, time: "48-72 hours" }
      },
      logical: {
        standard: { min: 1000, max: 3000, time: "5-7 business days" },
        emergency: { min: 2000, max: 4000, time: "48-72 hours" }
      }
    },
    "nas": {
      physical: {
        standard: { min: 1200, max: 3000, time: "7-10 business days" },
        emergency: { min: 2000, max: 4500, time: "48-72 hours" }
      },
      logical: {
        standard: { min: 800, max: 2500, time: "5-7 business days" },
        emergency: { min: 1800, max: 3500, time: "48-72 hours" }
      }
    },
    "flash-drive": {
      physical: {
        standard: { min: 500, max: 1000, time: "3-5 business days" },
        emergency: { min: 800, max: 1500, time: "24-48 hours" }
      },
      logical: {
        standard: { min: 200, max: 600, time: "2-4 business days" },
        emergency: { min: 600, max: 1200, time: "24-48 hours" }
      }
    },
    "memory-card": {
      physical: {
        standard: { min: 400, max: 900, time: "3-5 business days" },
        emergency: { min: 700, max: 1400, time: "24-48 hours" }
      },
      logical: {
        standard: { min: 200, max: 500, time: "2-4 business days" },
        emergency: { min: 500, max: 1000, time: "24-48 hours" }
      }
    }
  };

  // Capacity multipliers for drives over 4TB
  const capacityMultipliers: { [key: string]: number } = {
    "500GB": 1,
    "1TB": 1,
    "2TB": 1,
    "4TB": 1,
    "6TB": 1.2,
    "8TB": 1.3,
    "10TB": 1.4,
    "12TB": 1.5,
    "14TB": 1.6,
    "16TB": 1.7,
    "18TB": 1.8,
    "20TB": 2
  };

  const damageType = issueType.includes('physical') ? 'physical' : 'logical';
  const service = urgency === 'emergency' ? 'emergency' : 'standard';
  const rates = baseRates[deviceType as keyof typeof baseRates]?.[damageType][service] || baseRates["hard-drive"].physical.standard;

  // Apply capacity multiplier if provided
  let multiplier = 1;
  if (capacity && capacityMultipliers[capacity]) {
    multiplier = capacityMultipliers[capacity];
  }

  const adjustedMin = Math.round(rates.min * multiplier);
  const adjustedMax = Math.round(rates.max * multiplier);

  return {
    estimated: `${adjustedMin}-${adjustedMax}`,
    range: `$${adjustedMin} - $${adjustedMax}`,
    timeframe: rates.time,
    factors: [
      "Type and severity of damage",
      "Drive capacity and complexity",
      "Required turnaround time",
      "Current drive condition"
    ],
    guarantees: [
      "Free evaluation",
      "No data, no charge policy",
      "Secure certified facilities",
      "Confidentiality guaranteed"
    ],
    explanation: `This estimate is for a ${capacity || ''} ${deviceType.replace('-', ' ')} with ${damageType} damage. ${
      multiplier > 1 ? 'The price includes an adjustment for the larger drive capacity.' : ''
    } ${
      damageType === 'physical' ? 'Physical damage requires clean room work and specialized equipment.' : 'Logical damage typically requires less intensive recovery methods.'
    }`,
    recommendations: [
      "Stop using the drive immediately to prevent further damage",
      "Don't attempt DIY recovery on physically damaged drives",
      "Choose emergency service only if time-critical",
      "Professional clean room required for physical damage"
    ]
  };
};
