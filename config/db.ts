import { MongoClient } from 'mongodb';

/**
 * Connect to DB
 */
const dbConnect = async () => {
  // Setup DB
  const dbUri: string = process.env.MONGO_URL;
  const client = new MongoClient(dbUri, { useUnifiedTopology: true });

  return await client.connect();
};

/**
 * Checks database for a short-code
 * @param {string} shortCode -
 * returns a record if the short-code exists
 */
const findOne = async (shortCode: string) => {
  const client = await dbConnect();
  const dbName: string = process.env.DB_NAME;
  const links = client.db(dbName).collection('links');

  try {
    return await links.findOne({ shortCode });
  } finally {
    client.close();
  }
};

/**
 * Add a new item to the database
 * @param {object} record - url and shortCode
 */
const insertOne = async (record: object) => {
  const client = await dbConnect();
  const dbName: string = process.env.DB_NAME;
  const links = client.db(dbName).collection('links');

  try {
    return await links.insertOne(record);
  } finally {
    client.close();
  }
};

export { findOne, insertOne };
