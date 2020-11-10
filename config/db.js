const { MongoClient } = require('mongodb');

// Connect to DB
const dbConnect = async () => {
  // Setup DB
  const dbUri = process.env.MONGO_URL;
  const client = new MongoClient(dbUri, { useUnifiedTopology: true });

  return await client.connect();
};

const findOne = async (shortCode) => {
  const client = await dbConnect();
  const links = client.db('link-db').collection('links');

  try {
    return await links.findOne({ shortCode });
  } finally {
    client.close();
  }
};

const insertOne = async (record) => {
  const client = await dbConnect();
  const links = client.db('link-db').collection('links');

  try {
    return await links.insertOne(record);
  } finally {
    client.close();
  }
};

module.exports = { findOne, insertOne };
