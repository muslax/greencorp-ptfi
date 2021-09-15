import { connect } from "lib/mongodb";
import { MONGO_DOC } from "lib/constants";
import withSession from "lib/session";
import { ObjectId } from "bson";

const ACCEPTED_QUERIES = {}

export default withSession(async (req, res) => {
  const apiUser = req.session.get("user");

  if (!apiUser || apiUser.isLoggedIn === false) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
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


ACCEPTED_QUERIES['update-constants'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { key, value } = req.body;
    console.log(key, value )

    let prop = {}
    prop[key] = value

    const rs = await db.collection(MONGO_DOC.Constants).findOneAndUpdate({},
      { $set: prop },
      { returnDocument: "after" }
    )

    return res.json(rs);
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['delete-responden'] = async function (req, res) {
  const { id } = req.body;
  const { db, client } = await connect();
  const session = client.startSession() ;
  try {
    await session.withTransaction(async () => {
      // delete dependants
      await db.collection(MONGO_DOC.Anggota).deleteMany({ _rid: id })
      await db.collection(MONGO_DOC.AsetRumah).deleteMany({ _rid: id })
      await db.collection(MONGO_DOC.AsetLain).deleteMany({ _rid: id })
      // await db.collection(MONGO_DOC.Anggota).deleteMany({ _rid: id })

      const rs = await db.collection(MONGO_DOC.Responden).findOneAndDelete({ _id: id });
      return res.json(rs);
    })
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['save-responden'] = async function (req, res) {
  const data = req.body;
  const { db, client } = await connect();
  const session = client.startSession()
  try {
    await session.withTransaction(async () => {
      if (!data._id) {
        const idResponden = ObjectId().toString();
        data._id = idResponden;
        const rs = await db.collection(MONGO_DOC.Responden).insertOne(data);

        // Save anggota kk
        const asAnggota = {
          _id: ObjectId().toString(),
          _rid: idResponden,
          isResponden: true,
          nama: data.nama,
          hubungan: data.hubungan,
          gender: data.gender,
          umur: data.umur,
          marital: data.marital,
          melekHuruf: data.melekHuruf,
          pendidikan: data.pendidikan,
          pekerjaanUtama: data.pekerjaanUtama,
          pekerjaanLain: data.pekerjaanLain,
        }

        // Add rumah
        await db.collection(MONGO_DOC.AsetRumah).insertOne({
          _id: ObjectId().toString(),
          _rid: idResponden,
          jenisRumah: "",
          jumlahRuang: "",
          statusRumah: "",
          buktiKepemilikan: "",
          luasTanah: 0,
          luasBangunan: 0,
          luasLahanProduktif: 0,
          luasLahanNonProduktif: 0,
          luasLahanLain: 0,
          sumberListrik: "",
          // kendaraan: [],
          sepeda: 0,
          sepedaMotor: 0,
          mobil: 0,
          traktor: 0,
          perahuTradisional: 0,
          perahuMesinTempel: 0,
        })

        // Add klaim adat
        await db.collection(MONGO_DOC.KlaimAdat).insertOne({
          _id: ObjectId().toString(),
          _rid: idResponden,
          hakUlayat: "",
          infoHakUlayat: "",
          peningkatanHakUlayat: "",
          permintaanPeningkatanHakUlayat: [],
          danaKemitraan: "",
          manfaatDanaKemitraan: [],
          danaPerwalian: "",
          infoDanaPerwalian: "",
          penghargaanPTFI: "",
          infoPenghargaanPTFI: "",
          perjanjian1974: "",
          infoPerjanjian1974: "",
          mou2000: "",
          infoMou2000: "",
        })

        await db.collection(MONGO_DOC.Anggota).insertOne(asAnggota);

        return res.json(rs);
      } else {
        // 1 Update responden in anggota
        await db.collection(MONGO_DOC.Anggota).findOneAndUpdate(
          { _rid: data._id, isResponden: true },
          { $set: {
            nama: data.nama,
            hubungan: data.hubungan,
            gender: data.gender,
            umur: data.umur,
            marital: data.marital,
            melekHuruf: data.melekHuruf,
            pendidikan: data.pendidikan,
            pekerjaanUtama: data.pekerjaanUtama,
            pekerjaanLain: data.pekerjaanLain,
          }}
        )
        // 2 Update responden
        const rs = await db.collection(MONGO_DOC.Responden).findOneAndUpdate(
          { _id: data._id},
          { $set: {
            enumerator: data.enumerator,
            tanggal: data.tanggal,
            desa: data.desa,
            kelompokDesa: data.kelompokDesa,
            nama: data.nama,
            gender: data.gender,
            tahunLahir: data.tahunLahir,
            umur: data.umur,
            hubungan: data.hubungan,
            marital: data.marital,
            pendidikan: data.pendidikan,
            jmlKlgSerumah: data.jmlKlgSerumah,
            jmlOrangSerumah: data.jmlOrangSerumah,
            agama: data.agama || "",
            suku: data.suku || "",
            bahasa: data.bahasa || "",
            melekHuruf: data.melekHuruf || "",
            lamaTinggal: data.lamaTinggal || "",
            asalDaerah: data.asalDaerah || "",
            alasanPindah: data.alasanPindah || "",
            pekerjaanUtama: data.pekerjaanUtama,
            pekerjaanLain: data.pekerjaanLain,
          }},
          { returnDocument: "after" }
        )
        console.log(rs);
        return res.json(rs);
      }
    })
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['save-anggota'] = async function (req, res) {
  try {
    const { db } = await connect();
    const data = req.body;
    if (data._id) {
      const rs = await db.collection(MONGO_DOC.Anggota).findOneAndUpdate(
        { _id: data._id },
        { $set: {
          nama: data.nama,
          hubungan: data.hubungan,
          gender: data.gender,
          umur: data.umur,
          marital: data.marital,
          melekHuruf: data.melekHuruf,
          pendidikan: data.pendidikan,
          pekerjaanUtama: data.pekerjaanUtama,
          pekerjaanLain: data.pekerjaanLain,
        }}
      )
      console.log(rs)
      return res.json(rs);
    } else {
      data._id = ObjectId().toString();
      const rs = await db.collection(MONGO_DOC.Anggota).insertOne(data);
      console.log(rs)
      return res.json(rs);
    }
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['save-sosek'] = async function (req, res) {
  try {
    const { db } = await connect();
    const data = req.body;
    console.log(data);
    const rs = await db.collection(MONGO_DOC.Responden).findOneAndUpdate(
      { _id: data._id },
      { $set: {
        // pekerjaanUtama: data.pekerjaanUtama,
        // pekerjaanLain: data.pekerjaanLain,
        minatKerja: data.minatKerja,
        pernahMelamar: data.pernahMelamar,
        hambatanMelamar: data.hambatanMelamar,
        minatPelatihanKerja: data.minatPelatihanKerja,
        rerataPemasukan: data.rerataPemasukan,
        periodePemasukan: data.periodePemasukan,
        sumberPemasukan: data.sumberPemasukan,
        rerataPengeluaran: data.rerataPengeluaran,
        periodePengeluaran: data.periodePengeluaran,
        belanjaMakanan: data.belanjaMakanan,
        belanjaPendidikan: data.belanjaPendidikan,
        belanjaKesehatan: data.belanjaKesehatan,
        belanjaTransportasi: data.belanjaTransportasi,
        belanjaKomunikasi: data.belanjaKomunikasi,
        belanjaTempatTinggal: data.belanjaTempatTinggal,
        belanjaListrik: data.belanjaListrik,
        belanjaCicilan: data.belanjaCicilan,
        belanjaLainnya: data.belanjaLainnya,
        tabungan: data.tabungan,
        jumlahTabungan: data.jumlahTabungan,
        tempatTabungan: data.tempatTabungan,
        kecukupanPemasukan: data.kecukupanPemasukan,
        caraPemenuhanKebutuhan: data.caraPemenuhanKebutuhan,
        keberadaanUsaha: data.keberadaanUsaha,
        namaUsaha: data.namaUsaha,
        bidangUsaha: data.bidangUsaha,
        tahunUsaha: data.tahunUsaha,
        pendapatanUsahaPerBulan: data.pendapatanUsahaPerBulan,
        pernahKerjasama: data.pernahKerjasama,
        bidangKerjasama: data.bidangKerjasama,
        minatKerjasama: data.minatKerjasama,
        alasanMinatKerjasama: data.alasanMinatKerjasama,
        kemampuanKerjasama: data.kemampuanKerjasama,
        pernahKirimProposal: data.pernahKirimProposal,
        kendalaProposal: data.kendalaProposal,
        minatPelatihanUsaha: data.minatPelatihanUsaha,
      }},
      { returnDocument: "after" }
    )
    console.log("RS", rs);
    return res.json(rs);
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['delete-anggota'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { id } = req.body;
    console.log(id);
    const rs =  await db.collection(MONGO_DOC.Anggota).findOneAndDelete({ _id: id })
    return res.json(rs);
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['save-rumah'] = async function (req, res) {
  try {
    const { db } = await connect();
    const data = req.body;
    console.log(data);
    if (data._id) {
      const rs = await db.collection(MONGO_DOC.AsetRumah).findOneAndUpdate(
        { _id: data._id },
        { $set: {
          // _rid: data._rid,
          jenisRumah: data.jenisRumah,
          jumlahRuang: data.jumlahRuang,
          statusRumah: data.statusRumah,
          buktiKepemilikan: data.buktiKepemilikan,
          luasTanah: data.luasTanah,
          luasBangunan: data.luasBangunan,
          luasLahanProduktif: data.luasLahanProduktif,
          luasLahanNonProduktif: data.luasLahanNonProduktif,
          luasLahanLain: data.luasLahanLain,
          sumberListrik: data.sumberListrik,
          // kdata.//,
          sepeda: data.sepeda,
          sepedaMotor: data.sepedaMotor,
          mobil: data.mobil,
          traktor: data.traktor,
          perahuTradisional: data.perahuTradisional,
          perahuMesinTempel: data.perahuMesinTempel,
        }}
      )
      console.log(rs)
      return res.json(rs);
    } else {
      data._id = ObjectId().toString();
      const rs = await db.collection(MONGO_DOC.AsetRumah).insertOne(data);
      console.log(rs)
      return res.json(rs);
    }
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['save-tanaman'] = async function (req, res) {
  try {
    const { db } = await connect();
    const data = req.body;
    if (data._id) {
      const rs = await db.collection(MONGO_DOC.AsetLain).findOneAndUpdate(
        { _id: data._id },
        { $set: {
          jenis: data.jenis,
          satuan: data.satuan,
          periode: data.periode,
          dikonsumsiPerbulan: data.dikonsumsiPerbulan,
          dijualPerBulan: data.dijualPerBulan,
          nilaiJualPerBulan: data.nilaiJualPerBulan,
        }}
      )
      console.log(rs)
      return res.json(rs);
    } else {
      data._id = ObjectId().toString();
      const rs = await db.collection(MONGO_DOC.AsetLain).insertOne(data);
      console.log(rs)
      return res.json(rs);
    }
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['save-aset'] = async function (req, res) {
  try {
    const { db } = await connect();
    const data = req.body;
    const tipe = data.tipe
    const props = {};
    if (tipe == "tanaman") {
      props.luasPanen = data.luasPanen;
      props.kgDikonsumsiPerTahun = data.kgDikonsumsiPerTahun;
      props.kgDijualPerTahun = data.kgDijualPerTahun;
      props.nilaiJualPerTahun = data.nilaiJualPerTahun;
    } else if (tipe == "ternak") {
      props.jumlah = data.jumlah;
      props.kgDikonsumsiPerMinggu = data.kgDikonsumsiPerMinggu;
      props.kgDijualPerMinggu = data.kgDijualPerMinggu;
      props.nilaiJualPerMinggu = data.nilaiJualPerMinggu;
    } else if (tipe == "ikan") {
      props.kgDikonsumsiPerMinggu = data.kgDikonsumsiPerMinggu;
      props.kgDijualPerMinggu = data.kgDijualPerMinggu;
      props.nilaiJualPerMinggu = data.nilaiJualPerMinggu;
    } else if (tipe == "hasilhutan") {
      props.satuan = data.satuan;
      props.periode = data.periode;
      props.dikonsumsiPerbulan = data.dikonsumsiPerbulan;
      props.dijualPerBulan = data.dijualPerBulan;
      props.nilaiJualPerBulan = data.nilaiJualPerBulan;
    }
    if (data._id) {
      const rs = await db.collection(MONGO_DOC.AsetLain).findOneAndUpdate(
        { _id: data._id },
        // { $set: {
        //   jenis: data.jenis,
        //   satuan: data.satuan,
        //   periode: data.periode,
        //   dikonsumsiPerbulan: data.dikonsumsiPerbulan,
        //   dijualPerBulan: data.dijualPerBulan,
        //   nilaiJualPerBulan: data.nilaiJualPerBulan,
        // }}
        { $set: props }
      )
      console.log(rs)
      return res.json(rs);
    } else {
      data._id = ObjectId().toString();
      const rs = await db.collection(MONGO_DOC.AsetLain).insertOne(data);
      console.log(rs)
      return res.json(rs);
    }
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['delete-aset'] = async function (req, res) {
  try {
    const { db } = await connect();
    const { id } = req.body;
    console.log(id);
    const rs =  await db.collection(MONGO_DOC.AsetLain).findOneAndDelete({ _id: id })
    return res.json(rs);
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}

ACCEPTED_QUERIES['save-klaim-adat'] = async function (req, res) {
  try {
    const { db } = await connect();
    const data = req.body;
    if (data._id) {
      const rs = await db.collection(MONGO_DOC.KlaimAdat).findOneAndUpdate(
        { _id: data._id },
        { $set: {
          hakUlayat: data.hakUlayat,
          infoHakUlayat: data.infoHakUlayat,
          peningkatanHakUlayat: data.peningkatanHakUlayat,
          permintaanPeningkatanHakUlayat: data.permintaanPeningkatanHakUlayat,
          danaKemitraan: data.danaKemitraan,
          manfaatDanaKemitraan: data.manfaatDanaKemitraan,
          danaPerwalian: data.danaPerwalian,
          infoDanaPerwalian: data.infoDanaPerwalian,
          penghargaanPTFI: data.penghargaanPTFI,
          infoPenghargaanPTFI: data.infoPenghargaanPTFI,
          perjanjian1974: data.perjanjian1974,
          infoPerjanjian1974: data.infoPerjanjian1974,
          mou2000: data.mou2000,
          infoMou2000: data.infoMou2000,
        }}
      )
      console.log(rs)
      return res.json(rs);
    } else {
      data._id = ObjectId().toString();
      const rs = await db.collection(MONGO_DOC.KlaimAdat).insertOne(data);
      console.log(rs)
      return res.json(rs);
    }
  } catch (error) {
    return res.status(error.status || 500).end(error.message)
  }
}