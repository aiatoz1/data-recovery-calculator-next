import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';
import { knowledgeBase, getRecommendedCompany, getPricingEstimate, companies } from '../../data/knowledgeBase';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { messages, userLocation, selectedDeviceType, selectedCapacity, raidConfig } = req.body;

    // Extract the last user message to check for location/pricing queries
    const lastUserMessage = messages[messages.length - 1].content.toLowerCase();
    
    // Check if the user is asking about locations or pricing
    const isAskingLocation = lastUserMessage.includes('location') || lastUserMessage.includes('near me') || lastUserMessage.includes('in my area');
    const isAskingPrice = lastUserMessage.includes('price') || lastUserMessage.includes('cost') || lastUserMessage.includes('how much');

    let additionalInfo = '';
    
    if (isAskingLocation && userLocation) {
      const recommendation = getRecommendedCompany(userLocation, '');
      additionalInfo = `\n\n${recommendation.message}\n\n` + 
        recommendation.companies.map(company => 
          `🏢 ${company.name}\n` +
          `📍 ${company.contact.address}\n` +
          `📞 ${company.contact.phone}\n` +
          `🌐 ${company.contact.website}\n\n` +
          `✨ Specialties:\n${company.specialties.map(s => `  • ${s}`).join('\n')}\n\n` +
          `🏆 Key Features:\n${company.features.map(f => `  • ${f}`).join('\n')}\n\n` +
          `📋 Certifications:\n${company.certifications.map(c => `  • ${c}`).join('\n')}\n\n` +
          `💰 Pricing:\n` +
          `  • Diagnostic: ${company.pricing.diagnostic}\n` +
          `  • Standard Recovery: ${company.pricing.standardRecovery}\n` +
          `  • Emergency Service: ${company.pricing.emergencyService}\n`
        ).join('\n---\n\n');

      if (recommendation.localInfo) {
        additionalInfo += `\n\n📌 Local Information:\n${recommendation.localInfo}`;
      }
      if (recommendation.shippingInfo) {
        additionalInfo += `\n\n📦 Shipping Information:\n${recommendation.shippingInfo}`;
      }
    }

    if (isAskingPrice) {
      // Try to detect drive capacity from the message
      const capacityMatch = lastUserMessage.match(/(\d+)\s*(tb|gb)/i);
      const capacity = capacityMatch ? 
        (capacityMatch[2].toLowerCase() === 'tb' ? `${capacityMatch[1]}TB` : `${capacityMatch[1]}GB`) :
        selectedCapacity || '2TB';

      // Detect if physical damage is mentioned
      const isPhysicalDamage = lastUserMessage.includes('physical') || 
        lastUserMessage.includes('clicking') || 
        lastUserMessage.includes('dropped') ||
        lastUserMessage.includes('water') ||
        lastUserMessage.includes('not spinning');

      if (selectedDeviceType === 'raid' && raidConfig) {
        const { type: raidType, drives: numDrives } = raidConfig;
        const basePrice = isPhysicalDamage ? 1500 : 1000;
        const driveMultiplier = Math.max(1, (numDrives - 2) * 0.3);
        const complexityMultiplier = {
          'raid0': 1.0,  // Simplest but riskiest
          'raid1': 1.2,  // Mirror recovery
          'raid5': 1.5,  // Parity calculations needed
          'raid6': 1.8,  // Double parity, most complex
          'raid10': 1.6  // Combined mirror and stripe
        }[raidType] || 1.0;

        const minPrice = Math.round(basePrice * driveMultiplier * complexityMultiplier);
        const maxPrice = Math.round(minPrice * 2.5);
        const timeframe = isPhysicalDamage ? "7-10 business days" : "5-7 business days";

        const raidInfo = {
          'raid0': {
            risk: "High risk - No redundancy",
            recovery: "Requires all drives to be functional",
            success: "70-80% success rate"
          },
          'raid1': {
            risk: "Medium risk - Mirrored data",
            recovery: "Can recover from single drive failure",
            success: "85-95% success rate"
          },
          'raid5': {
            risk: "Medium risk - Single parity",
            recovery: "Can recover from single drive failure",
            success: "80-90% success rate"
          },
          'raid6': {
            risk: "Low risk - Double parity",
            recovery: "Can recover from up to two drive failures",
            success: "85-95% success rate"
          },
          'raid10': {
            risk: "Low risk - Mirror + Stripe",
            recovery: "Can recover from multiple drive failures",
            success: "90-95% success rate"
          }
        }[raidType] || { risk: "Unknown", recovery: "Custom assessment needed", success: "Varies" };

        additionalInfo = `\n\nRAID Recovery Estimate (${raidType.toUpperCase()}, ${numDrives} drives):\n` +
          `💰 Estimated Range: $${minPrice} - $${maxPrice}\n` +
          `⏱️ Expected Timeframe: ${timeframe}\n\n` +
          `📊 Configuration Details:\n` +
          `• RAID Level: ${raidType.toUpperCase()}\n` +
          `• Number of Drives: ${numDrives}\n` +
          `• Risk Level: ${raidInfo.risk}\n` +
          `• Recovery Method: ${raidInfo.recovery}\n` +
          `• Success Rate: ${raidInfo.success}\n\n` +
          `🔧 Recovery Process:\n` +
          `• Full system assessment\n` +
          `• Drive imaging and verification\n` +
          `• RAID reconstruction\n` +
          `• Data extraction and validation\n\n` +
          `⚠️ Important Notes:\n` +
          `• Stop using the array immediately\n` +
          `• Keep all drives in original configuration\n` +
          `• Document any error messages\n` +
          `• Maintain drive order if possible\n\n` +
          `📞 Expert Consultation:\n` +
          `• Hard Drive Repair (Kansas City): ${companies[0].contact.phone}\n` +
          `  ${companies[0].contact.website}\n\n` +
          `• 24 Hour Data (Dallas): ${companies[1].contact.phone}\n` +
          `  ${companies[1].contact.website}`;
      } else if (selectedDeviceType === 'nas') {
        additionalInfo = `\n\nFor ${selectedDeviceType === 'raid' ? 'RAID Arrays' : 'NAS Devices'}, we need additional information to provide an accurate quote:\n\n` +
          `📋 Required Information:\n` +
          `• Number of drives\n` +
          `• RAID configuration (if applicable)\n` +
          `• Total storage capacity\n` +
          `• Type of failure\n\n` +
          `🔧 Common ${selectedDeviceType === 'raid' ? 'RAID' : 'NAS'} Issues:\n` +
          `• Multiple drive failures\n` +
          `• Controller failure\n` +
          `• Configuration loss\n` +
          `• Operating system corruption\n\n` +
          `📞 Contact our ${selectedDeviceType === 'raid' ? 'RAID' : 'NAS'} specialists directly:\n` +
          `• Hard Drive Repair (Kansas City): ${companies[0].contact.phone}\n` +
          `  ${companies[0].contact.website}\n\n` +
          `• 24 Hour Data (Dallas): ${companies[1].contact.phone}\n` +
          `  ${companies[1].contact.website}`;
      } else {
        const pricing = getPricingEstimate(
          selectedDeviceType,
          isPhysicalDamage ? 'physical' : 'logical',
          'standard',
          capacity
        );

        additionalInfo = `\n\nPricing Estimate for ${selectedDeviceType.replace('-', ' ')}:\n` +
          `💰 Estimated Range: ${pricing.range}\n` +
          `⏱️ Expected Timeframe: ${pricing.timeframe}\n\n` +
          `📋 ${pricing.explanation}\n\n` +
          `Key Recommendations:\n${pricing.recommendations.map(r => `• ${r}`).join('\n')}\n\n` +
          `✅ Our Guarantees:\n${pricing.guarantees.map(g => `• ${g}`).join('\n')}\n\n` +
          `📞 Get an Accurate Quote:\n` +
          `• Hard Drive Repair (Kansas City): ${companies[0].contact.phone}\n` +
          `  ${companies[0].contact.website}\n\n` +
          `• 24 Hour Data (Dallas): ${companies[1].contact.phone}\n` +
          `  ${companies[1].contact.website}`;
      }
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are a helpful data recovery expert. Use the following knowledge base to answer questions. If the question isn't covered in the knowledge base, provide general best practices and recommend contacting a professional. Always be professional and concise.\n\n${knowledgeBase}`
        },
        ...messages
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    let response = completion.choices[0].message.content || '';
    if (additionalInfo) {
      response += additionalInfo;
    }

    return res.status(200).json({
      message: response
    });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({
      message: 'An error occurred while processing your request.'
    });
  }
}
