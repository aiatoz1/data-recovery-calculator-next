import type { NextApiRequest, NextApiResponse } from 'next';
import { v4 as uuidv4 } from 'uuid';

// This is a mock database. In production, use a real database like MongoDB or PostgreSQL
let leads: any[] = [];

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case 'POST':
      try {
        const lead = {
          id: uuidv4(),
          ...req.body,
          status: 'new',
          createdAt: new Date().toISOString(),
        };
        leads.push(lead);

        // Here you would typically:
        // 1. Save to database
        // 2. Send notification emails
        // 3. Distribute lead to appropriate companies

        res.status(201).json(lead);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create lead' });
      }
      break;

    case 'GET':
      // Add authentication check here
      try {
        res.status(200).json(leads);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch leads' });
      }
      break;

    default:
      res.setHeader('Allow', ['POST', 'GET']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
