import { findOne, insertOne } from 'config/db';
import validate from 'utils/validator';
import checkForUrlConflicts from 'utils/url';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const url = req.body.url;
    const shortCode = req.body.short_code;

    // Validate server input
    const isValid = await validate(url, shortCode);
    if (!isValid) {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: 'Please enter a correct URL and Short Code',
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
          message: "You aren't permitted to redirect to this website",
          shortCode,
        })
      );
      return;
    }

    // If both previous checks pass, create the link
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
}

async function createLink(url, short_code) {
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
}

// Generate random Short Code
function generateShortCode(length) {
  return Math.random().toString(36).substr(2, length);
}

// Set external resolver to remove warning
export const config = {
  api: {
    externalResolver: true,
  },
};
