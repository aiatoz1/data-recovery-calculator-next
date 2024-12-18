import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;

  switch (req.method) {
    case 'PUT':
      try {
        // In production, update the lead in your database
        const updatedLead = {
          id,
          ...req.body,
          updatedAt: new Date().toISOString(),
        };

        res.status(200).json(updatedLead);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update lead' });
      }
      break;

    case 'GET':
      try {
        // In production, fetch the lead from your database
        const lead = {
          id,
          // ... other lead data
        };

        if (!lead) {
          res.status(404).json({ error: 'Lead not found' });
          return;
        }

        res.status(200).json(lead);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch lead' });
      }
      break;

    default:
      res.setHeader('Allow', ['PUT', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
