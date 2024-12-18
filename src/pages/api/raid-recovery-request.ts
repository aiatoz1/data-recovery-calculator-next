import type { NextApiRequest, NextApiResponse } from 'next';
import { companies } from '../../data/knowledgeBase';

type ResponseData = {
  success: boolean;
  message: string;
  requestId?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }

  try {
    const request = req.body;
    
    // Generate a unique request ID
    const requestId = `RR${Date.now()}${Math.random().toString(36).substr(2, 4)}`;

    // Here you would typically:
    // 1. Save the request to a database
    // 2. Send notification emails
    // 3. Create a ticket in your support system
    // For now, we'll just simulate success

    // Determine which company to assign based on request details
    const assignedCompany = request.isEmergency ? companies[1] : companies[0]; // 24 Hour Data for emergencies

    // Format the RAID configuration details
    const raidDetails = request.raidLevel === 'custom'
      ? `Custom RAID Configuration: ${request.customRaidConfig}`
      : `RAID Level: ${request.raidLevel.toUpperCase()}`;

    const configDetails = `
Configuration Details:
- ${raidDetails}
- Number of Drives: ${request.numDrives}
- Array Type: ${request.arrayType}
- Data Type: ${request.dataType}
- Emergency Status: ${request.isEmergency ? 'YES - Priority Service' : 'Standard Service'}

Contact Information:
- Name: ${request.name}
- Phone: ${request.phone}
- Email: ${request.email}
- Preferred Contact: ${request.preferredContact}
${request.bestTimeToCall ? `- Best Time to Call: ${request.bestTimeToCall}` : ''}

Failure Summary:
${request.failureSummary}
    `.trim();

    // In a real implementation, you would send emails here
    console.log('New RAID Recovery Request:', {
      requestId,
      configDetails,
      assignedCompany: assignedCompany.name
    });

    const responseMessage = request.raidLevel === 'custom'
      ? `Thank you for your custom RAID recovery request. Due to the specialized nature of your configuration, a senior recovery specialist from ${assignedCompany.name} will contact you ${
          request.isEmergency ? 'immediately' : 'within 1 business hour'
        } to discuss your case. Your request ID is ${requestId}.`
      : `Thank you for your ${request.raidLevel.toUpperCase()} recovery request. A recovery specialist from ${assignedCompany.name} will contact you ${
          request.isEmergency ? 'immediately' : 'within 1 business hour'
        }. Your request ID is ${requestId}.`;

    return res.status(200).json({
      success: true,
      message: responseMessage,
      requestId
    });
  } catch (error) {
    console.error('Error processing RAID recovery request:', error);
    return res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request. Please try again or contact us directly.'
    });
  }
}
