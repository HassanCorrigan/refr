import { findOne } from 'config/db';

export default async function handler(req, res) {
  const shortCode = req.query.redirect[0];
  const result = await checkDB(shortCode);
  console.log('Redirecting');
  console.log('Short Code: ', shortCode);
  console.log('DB Redirect Info: ', result);
  res.redirect(result.statusCode, result.url);
}

async function checkDB(shortCode) {
  const linkExists = await findOne(shortCode);
  if (linkExists) {
    return { statusCode: 301, url: linkExists.url };
  } else {
    return {
      statusCode: 404,
      url: `http://${process.env.NEXT_PUBLIC_WEBSITE_URL}/404`,
    };
  }
}
