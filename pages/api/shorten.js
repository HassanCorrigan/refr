import { findOne, insertOne } from 'config/db';
import { checkForUrlConflicts, checkForMaliciousURL } from 'utils/url';
import validate from 'utils/validator';

const handler = async (req, res) => {
  if (req.method === 'POST') {
    const url = req.body.url;
    const shortCode = req.body.short_code;

    // Validate server input
    const valid = await validate(url, shortCode);
    if (!valid) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: 'Please enter a correct URL and Short Code.',
          shortCode,
        })
      );
      return;
    }

    // Return error if URLs match
    const conflicts = await checkForUrlConflicts(url);
    if (conflicts) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message:
            "We couldn't create your shortlink: You aren't allowed to create a redirect to this website.",
          shortCode,
        })
      );
      return;
    }

    // Return error if URL is malicious
    const malicious = await checkForMaliciousURL(url);
    if (malicious) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message:
            "We couldn't create your shortlink: The link you provided is untrusted and may contain malware.",
          shortCode,
        })
      );
      return;
    }

    // If all previous checks pass, create the link
    try {
      const response = await createLink(url, shortCode);
      res.statusCode = response.statusCode;
      res.end(JSON.stringify(response.data));
    } catch (error) {
      console.error(error);
    }
  } else {
    res.redirect(301, '/'); // Redirect all requests other than POST
  }
};

/**
 * Creates the link by adding to the database
 * @param {string} url
 * @param {string} short_code
 */
const createLink = async (url, short_code) => {
  // If no short code is supplied, generate a random one
  const shortCode = short_code || generateShortCode(4);
  const linkPair = {
    url,
    shortCode,
  };

  // Check if Short Code already exists
  const alreadyExists = await findOne(shortCode);

  if (alreadyExists) {
    return {
      statusCode: 403,
      data: {
        message: 'Sorry, your chosen short code already exists',
      },
    };
  } else {
    await insertOne(linkPair);
    return {
      statusCode: 200,
      data: {
        message: 'Link created successfully',
        shortCode,
      },
    };
  }
};

/**
 * Generates a random short-code based on the length paremeter
 * @param {number} length
 */
const generateShortCode = length =>
  Math.random().toString(36).substr(2, length);

export default handler;
