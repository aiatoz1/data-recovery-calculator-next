import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const {
    name,
    email,
    phone,
    message,
    deviceType,
    capacity,
    estimatedPrice,
    isUrgent,
    timestamp,
  } = req.body;

  // Log the form submission for testing
  console.log('New Contact Form Submission:', {
    name,
    email,
    phone,
    message,
    deviceType,
    capacity,
    estimatedPrice,
    isUrgent,
    timestamp,
  });

  // Simulate successful email sending
  return res.status(200).json({
    success: true,
    message: 'Form submitted successfully (test mode)',
  });
}
