import { findOne, insertOne } from '../../config/db.js';
import validate from '../../utils/validator.js';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const url = req.body.url;
    const shortCode = req.body.short_code;

    // Validate server input
    const isValid = await validate(url, shortCode);

    if (isValid) {
      createLink(url, shortCode)
        .then((response) => {
          res.statusCode = response.statusCode;
          res.end(JSON.stringify(response.data));
        })
        .catch(console.dir);
    } else {
      res.statusCode = 400;
      res.end(
        JSON.stringify({
          message: 'Please enter a correct URL and Short Code',
          shortCode,
        })
      );
    }
  } else {
    res.redirect(301, '/'); // Redirect all other request other than POST
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
