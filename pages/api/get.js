import { connect } from "lib/mongodb";
import { MONGO_DOC } from "lib/constants";
import withSession from "lib/session";

const ACCEPTED_QUERIES = {}

export default withSession(async (req, res) => {
  const apiUser = req.session.get("user");

  if (!apiUser || apiUser.isLoggedIn === false) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { q } = req.query;
  console.log(new Date(), q);

  if (!q || !ACCEPTED_QUERIES[q]) {
    return res.status(400).json({ message: 'Bad Request' })
  }

  const task = ACCEPTED_QUERIES[q];
  return task (req, res);
});

export async function getConstants(req, res) {
  try {
    const { db } = await connect();
    const rs = await db.collection(MONGO_DOC.Constants).findOne();

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['get-constants'] = async function getConstants(req, res) {
  try {
    const { db } = await connect();
    const rs = await db.collection(MONGO_DOC.Constants).findOne();

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['get-responden'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { id } = req.query;

    if (!id) return res.status(404).json({ message: 'Not found' })

    const rs = await db.collection(MONGO_DOC.Responden).findOne({ _id: id });

    if (!rs) return res.status(404).json({ message: 'Not found' })

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['get-daftar-responden'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { id } = req.query;

    const rs = await db.collection(MONGO_DOC.Responden).find({ _rid: id }).toArray();
    console.log("RS", rs)

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}


ACCEPTED_QUERIES['get-daftar-anggota'] = async function (req, res) {
  try {
    const apiUser = req.session.get("user");
    const { db } = await connect();
    const { id } = req.query;

    const rs = await db.collection(MONGO_DOC.Anggota).find({ _rid: id }).toArray();

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['get-tanah-rumah'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { rid } = req.query;

    const rs = await db.collection(MONGO_DOC.AsetRumah).findOne({ _rid: rid });

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['get-daftar-tanaman'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { rid } = req.query;

    const rs = await db.collection(MONGO_DOC.AsetLain).find({ _rid: rid, tipe: "tanaman" }).toArray();

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['get-daftar-aset'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { rid } = req.query;

    const rs = await db.collection(MONGO_DOC.AsetLain).find({ _rid: rid }).toArray();

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['get-klaim-adat'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { rid } = req.query;

    const rs = await db.collection(MONGO_DOC.KlaimAdat).findOne({ _rid: rid });

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['get-kesmas'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { rid } = req.query;

    const rs = await db.collection(MONGO_DOC.Kesmas).findOne({ _rid: rid });

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

// ==========

ACCEPTED_QUERIES['my-responden'] = async function (req, res) {
  try {
    const apiUser = req.session.get("user");
    const { db } = await connect();

    const rs = await db.collection(MONGO_DOC.Responden).find({ dataEntri: apiUser.fullname }).toArray();

    return res.json( rs );
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}