import { Collection, MongoClient, WithId, Document } from 'mongodb';

/**
 * Connect to DB
 */
const dbConnect = async (): Promise<MongoClient> => {
  // Setup DB
  const dbUri: string = process.env.MONGO_URL!;
  const client: MongoClient = new MongoClient(dbUri);

  return await client.connect();
};

/**
 * Checks database for a short-code
 * @param {string} shortCode
 * returns a record if the short-code exists
 */
const findOne = async (shortCode: string): Promise<WithId<Document>> => {
  const client: MongoClient = await dbConnect();

  const dbName: string = process.env.DB_NAME!;
  const links: Collection = client.db(dbName).collection('links');

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
const insertOne = async (record: object): Promise<unknown> => {
  const client: MongoClient = await dbConnect();
  const dbName: string = process.env.DB_NAME!;
  const links: Collection = client.db(dbName).collection('links');

  try {
    return await links.insertOne(record);
  } finally {
    client.close();
  }
};

export { findOne, insertOne };
