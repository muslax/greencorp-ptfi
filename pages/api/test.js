import { MONGO_DOC } from "lib/constants";
import { connect } from "lib/mongodb";

export default async (req, res) => {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  try {
    const { db } = await connect();
    const rs = await db.collection(MONGO_DOC.Constants).find({}).toArray()
    console.log(rs)
    return res.json(rs);
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}