const { MongoClient } = require('mongodb');

// Connect to DB
const dbConnect = async () => {
  // Setup DB
  const dbUri = process.env.MONGO_URL;
  const client = new MongoClient(dbUri, { useUnifiedTopology: true });

  return await client.connect();
};

const findOne = async shortCode => {
  const client = await dbConnect();
  const dbName = process.env.DB_NAME;
  const links = client.db(dbName).collection('links');

  try {
    return await links.findOne({ shortCode });
  } finally {
    client.close();
  }
};

const insertOne = async record => {
  const client = await dbConnect();
  const dbName = process.env.DB_NAME;
  const links = client.db(dbName).collection('links');

  try {
    return await links.insertOne(record);
  } finally {
    client.close();
  }
};

module.exports = { findOne, insertOne };
