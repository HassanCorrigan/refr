import { findOne } from 'config/db';

import type { NextApiRequest, NextApiResponse } from 'next';
import type { WithId, Document } from 'mongodb';
import type { CheckDbResponse } from 'models/CheckDbResponse';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const shortCode: string = req.query.redirect[0];
  const result = await checkDB(shortCode);
  res.redirect(result.statusCode, result.url);
};

/**
 * Check if shortcode exists in database
 * @param {string} shortCode
 * If it does exist, return the redirect url and status-code
 * Otherwise, return the 404 page and statuscode
 */
const checkDB = async (shortCode: string): Promise<CheckDbResponse> => {
  const linkExists: WithId<Document> = await findOne(shortCode);
  if (linkExists) {
    return { statusCode: 301, url: linkExists.url };
  } else {
    return {
      statusCode: 404,
      url: `${process.env.NEXT_PUBLIC_WEBSITE_URL}/404`,
    };
  }
};

export default handler;
