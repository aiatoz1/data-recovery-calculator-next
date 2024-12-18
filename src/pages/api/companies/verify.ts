import type { NextApiRequest, NextApiResponse } from 'next';

interface VerificationRequest {
  companyName: string;
  website: string;
  contactName: string;
  email: string;
  phone: string;
  address: string;
  businessLicense?: string;
  certifications?: string[];
  cleanRoomDetails?: string;
  yearsInBusiness: number;
  serviceAreas: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
    return;
  }

  try {
    const verificationData: VerificationRequest = req.body;

    // In production:
    // 1. Validate all required fields
    // 2. Verify business license
    // 3. Check certifications
    // 4. Store verification request in database
    // 5. Send notification to admin
    // 6. Send confirmation email to company

    const verificationResponse = {
      id: 'verification_123',
      status: 'pending',
      submittedAt: new Date().toISOString(),
      ...verificationData,
    };

    res.status(201).json(verificationResponse);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit verification request' });
  }
}
