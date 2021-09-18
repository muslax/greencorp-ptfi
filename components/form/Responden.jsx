import { useRouter } from 'next/router';
import fetchJson from 'lib/fetchJson';
import useConstants from 'hooks/useConstants'
import { generatePOSTData } from 'lib/utils';
import { useEffect, useState } from 'react';
import { isEqual } from 'lodash';

import DataRow from 'components/DataRow';
import { mutate } from 'swr';

function createModel(user) {
  return {
    _id: null,
    enumerator: "",
    dataEntri: user.fullname,
    type: user.type == "dataentri" ? "data" : "sample",
    tanggal: new Date().toISOString().substr(0, 10),
    desa: "",
    kelompokDesa: "",
    nama: "",
    gender: "",
    tahunLahir: "",
    umur: 0,
    hubungan: "",
    marital: "",
    pendidikan: "",
    jmlKlgSerumah: 0,
    jmlOrangSerumah: 0,
    melekHuruf: "",
    agama: "",
    suku: "",
    bahasa: "",
    melekHuruf: "",
    lamaTinggal: "",
    asalDaerah: "",
    alasanPindah: "",
    // Sosial ekonomi
    pekerjaanUtama: "",
    pekerjaanLain: [],
    minatKerja: "",
    pernahMelamar: "",
    hambatanMelamar: "",
    minatPelatihanKerja: "",
    rerataPemasukan: 0,
    periodePemasukan: "",
    sumberPemasukan: [],
    rerataPengeluaran: 0,
    periodePengeluaran: "",
    belanjaMakanan: 0,
    belanjaPendidikan: 0,
    belanjaKesehatan: 0,
    belanjaTransportasi: 0,
    belanjaKomunikasi: 0,
    belanjaTempatTinggal: 0,
    belanjaListrik: 0,
    belanjaCicilan: 0,
    belanjaLainnya: 0,
    tabungan: "",
    jumlahTabungan: 0,
    tempatTabungan: "",
    kecukupanPemasukan: "",
    caraPemenuhanKebutuhan: "",
    //
    keberadaanUsaha: "",
    namaUsaha: "",
    bidangUsaha: "",
    tahunUsaha: "",
    pendapatanUsahaPerBulan: 0,
    pernahKerjasama: "",
    bidangKerjasama: "",
    minatKerjasama: "",
    alasanMinatKerjasama: "",
    kemampuanKerjasama: "",
    pernahKirimProposal: "",
    kendalaProposal: [],
    minatPelatihanUsaha: [],
  }
}

const Responden = ({ user, responden, mutateResponden }) => {
  const router = useRouter();
  const { constants, loadingConstants } = useConstants();

  const currentYear = new Date().getFullYear();

  const [model, setModel] = useState(createModel(user))

  const [sukuLain, setSukuLain] = useState(false);
  const [bahasaLain, setBahasaLain] = useState(false);

  useEffect(() => {
    if (constants && responden) {
      setModel(responden);
      setSukuLain(responden.suku !== "" && !constants.Suku.includes(responden.suku))
      setBahasaLain(responden.bahasa !== "" && !constants.Bahasa.includes(responden.bahasa))
    }
  }, [constants, responden])

  const isReady = (
    model.enumerator
    // && dataEntri
    && model.tanggal
    && model.desa
    // && model.kelompokDesa
    && model.nama
    && model.gender
    && model.tahunLahir
    && model.umur > 0
    && model.hubungan
    && model.marital
    // && model.pendidikan
    // && model.jmlKlgSerumah > 0
    // && model.jmlOrangSerumah > 0
    // && model.agama
    // && model.melekHuruf
    // && model.suku
    // && model.bahasa
    // && model.lamaTinggal
  )

  function isDirty() {
    return !isEqual(model, responden);
  }

  function sss() {
    return ((isNew && !isReady) || (!isNew && (!isReady || !isDirty())));
  }

  async function saveData(e) {
    e.preventDefault();
    try {
      const rs = await fetchJson("/api/post?q=save-responden", generatePOSTData(model))
      if (!model._id) {
        router.push(`/res/${rs.insertedId}`);
      } else {
        mutateResponden();
        mutate(`/api/get?q=get-daftar-anggota&id=${model._id}`)
      }
    } catch (error) {
      alert("ERROR")
    }
  }

  if (loadingConstants) return null;

  const isNew = responden === null || responden === undefined;

  const userIsOwner = isNew || responden.dataEntri == user.fullname;

  return (
    <div className="pt-6">
      {/* <h1 className="text-3xl font-bold mb-6">{isNew ? "New Responden" : responden.nama }</h1> */}
      <div className="block md:flex md:space-x-8 py-3">
        <div className="w-full md:flex-grow md:w-1/2">
          <table className="w-full">
            <tbody>
              <tr className="align-top">
                <td className={`w-1/3 pt-[10px] pr-4`}>
                    Enumerator
                </td>
                <td className="">
                  <select
                    required={true}
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    value={model.enumerator}
                    onChange={e => {
                      setModel(m => ({...m, enumerator: e.target.value}))
                    }}
                  >
                    <option value="">- Pilih</option>
                    {constants.Enumerator.map((e, i) => (
                      <option key={`KEY-${i}`} value={e}>{e}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Tanggal
                </td>
                <td className="">
                  <input
                    type="date"
                    className=""
                    value={model.tanggal}
                    disabled={!userIsOwner}
                    onChange={e => setModel(m => ({...m, tanggal: e.target.value}))}
                  />
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Desa
                </td>
                <td className="">
                  <select
                    value={model.desa}
                    disabled={model.desa}
                    className=""
                    onChange={e => {
                      setModel(m => ({...m, desa: e.target.value}))
                      const kelompok = constants.Desa.filter(d => d.nama == e.target.value)[0].kelompok;
                      setModel(m => ({...m, kelompokDesa: kelompok}))
                    }}
                  >
                    <option value="">- Pilih</option>
                    {constants.Desa.map((d, i) => (
                      <option key={`KEY-${i}`} value={d.nama}>{d.nama}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Nama
                </td>
                <td className="">
                  <input
                    type="text"
                    disabled={!userIsOwner}
                    className="w-full mt-1" value={model.nama}
                    onChange={e => setModel(prev => ({...prev, nama: e.target.value }))}
                  />
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Jenis kelamin
                </td>
                <td className="">
                  <select
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    value={model.gender}
                    onChange={e => setModel(prev => ({...prev, gender: e.target.value }))}
                  >
                    <option value="">- Pilih</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Tahun lahir
                </td>
                <td className="">
                  <input
                    type="number"
                    maxLength="4"
                    min="1935" max="2000"
                    disabled={!userIsOwner}
                    className="leading-5 w-24 mt-1"
                    value={model.tahunLahir}
                    onChange={e => setModel(prev => ({
                      ...prev,
                      tahunLahir: e.target.value,
                      umur: currentYear - parseInt(e.target.value)
                    }))}
                  />
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Hubungan
                </td>
                <td className="">
                  <select
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    value={model.hubungan}
                    onChange={e => setModel(prev => ({...prev, hubungan: e.target.value }))}
                  >
                    <option value="">- Pilih</option>
                    {constants.Hubungan.map((e, i) => (
                      <option key={`KEY-${i}`} value={e}>{e}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Status
                </td>
                <td className="">
                  <select
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    value={model.marital}
                    onChange={e => setModel(prev => ({...prev, marital: e.target.value }))}
                  >
                    <option value="">- Pilih</option>
                    <option value="Menikah">Menikah</option>
                    <option value="Cerai hidup">Cerai hidup</option>
                    <option value="Cerai mati">Cerai mati</option>
                    <option value="Belum menikah">Belum menikah</option>
                  </select>
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                  KK serumah
                </td>
                <td className="">
                  <input
                    type="number" min="0"
                    className="w-20 mt-1"
                    value={model.jmlKlgSerumah}
                    disabled={!userIsOwner}
                    onChange={e => setModel(m => ({...m, jmlKlgSerumah: parseInt(e.target.value)}))}
                  />
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                  Jml orang
                </td>
                <td className="">
                  <input
                    type="number"
                    min="0"
                    className="w-20 mt-1" value={model.jmlOrangSerumah}
                    disabled={!userIsOwner}
                    onChange={e => setModel(m => ({...m, jmlOrangSerumah: parseInt(e.target.value)}))}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="w-full md:flex-grow md:w-1/2">
          <table className="w-full">
            <tbody>
              <tr className="align-top">
                <td className={`w-1/3 pt-[10px] pr-4`}>
                    Agama
                </td>
                <td className="">
                  <select
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    value={model.agama}
                    onChange={e => setModel(prev => ({...prev, agama: e.target.value }))}
                  >
                    <option value="">- Pilih</option>
                    {constants.Agama.map((e, i) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Suku
                </td>
                <td className="">
                  <select
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    defaultValue={model.suku}
                    onChange={e => {
                      const v = e.target.value;
                      if (v != "" || v != "Lainnya") {
                        setModel(prev => ({...prev, suku: e.target.value }));
                        setSukuLain(false);
                      }
                      if (v == "Lainnya") {
                        setSukuLain(true);
                        setModel(prev => ({...prev, suku: "" }));
                      }
                      if (v == "") {
                        setSukuLain(false);
                        setModel(prev => ({...prev, suku: "" }));
                      }
                    }}
                  >
                    <option value="">- Pilih</option>
                    {constants.Suku.map((e, i) => (
                      <option key={e} value={e} selected={model.suku == e}>{e}</option>
                    ))}
                    <option value="Lainnya" selected={sukuLain}>Lainnya</option>
                  </select>
                </td>
              </tr>
              {sukuLain && (
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}></td>
                <td className="">
                  <input
                    type="text"
                    disabled={!userIsOwner}
                    className="mt-1" value={model.suku}
                    onChange={e => setModel(prev => ({...prev, suku: e.target.value }))}
                  />
                </td>
              </tr>
              )}
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Bahasa
                </td>
                <td className="">
                  <select
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    defaultValue={model.bahasa}
                    onChange={e => {
                      const v = e.target.value;
                      if (v != "" || v != "Lainnya") {
                        setModel(prev => ({...prev, bahasa: e.target.value }));
                        setBahasaLain(false);
                      }
                      if (v == "Lainnya") {
                        setBahasaLain(true);
                        setModel(prev => ({...prev, bahasa: "" }));
                      }
                      if (v == "") {
                        setBahasaLain(false);
                        setModel(prev => ({...prev, bahasa: "" }));
                      }
                    }}
                  >
                    <option value="">- Pilih</option>
                    {constants.Bahasa.map((e, i) => (
                      <option key={e} value={e} selected={model.bahasa == e}>{e}</option>
                    ))}
                    <option value="Lainnya" selected={bahasaLain}>Lainnya</option>
                  </select>
                </td>
              </tr>
              {bahasaLain && (
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}></td>
                <td className="">
                  <input
                    type="text"
                    disabled={!userIsOwner}
                    className="mt-1" value={model.bahasa}
                    onChange={e => setModel(prev => ({...prev, bahasa: e.target.value }))}
                  />
                </td>
              </tr>
              )}
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Pendidikan
                </td>
                <td className="">
                  <select
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    value={model.pendidikan}
                    onChange={e => setModel(prev => ({...prev, pendidikan: e.target.value }))}
                  >
                    <option value="">- Pilih</option>
                    {constants.Pendidikan.map((e, i) => (
                      <option key={e} value={e}>{e}</option>
                    ))}
                  </select>
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Melek huruf
                </td>
                <td className="">
                  <select
                    disabled={!userIsOwner}
                    className="max-w-xs"
                    value={model.melekHuruf}
                    onChange={e => setModel(prev => ({...prev, melekHuruf: e.target.value }))}
                  >
                    <option value="">- Pilih</option>
                    <option value="Ya">Melek huruf</option>
                    <option value="Tidak">Tidak melek huruf</option>
                  </select>
                </td>
              </tr>
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Lama tinggal
                </td>
                <td className="">
                  <select
                    className="max-w-xs"
                    disabled={!userIsOwner}
                    value={model.lamaTinggal}
                    onChange={e => {
                      const val = e.target.value;
                      setModel(prev => ({...prev, lamaTinggal: val }));
                      if (val == "" || val == "Sejak lahir") {
                        setModel(prev => ({...prev, asalDaerah: "", alasanPindah: "" }));
                      }
                    }}
                  >
                    <option value="">- Pilih</option>
                    <option value="Sejak lahir">Sejak lahir</option>
                    <option value="1-5 tahun">Selama 1-5 tahun</option>
                    <option value="Lebih dari 5 tahun">Lebih dari 5 tahun</option>
                  </select>
                </td>
              </tr>
              {model.lamaTinggal != "" && model.lamaTinggal != "Sejak lahir" && (
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Asal daerah
                </td>
                <td className="">
                  <input
                    type="text"
                    disabled={!userIsOwner}
                    placeholder="Asal daerah"
                    className="w-40 mt-1" value={model.asalDaerah}
                    onChange={e => setModel(prev => ({...prev, asalDaerah: e.target.value }))}
                  />
                </td>
              </tr>
              )}
              {model.lamaTinggal != "" && model.lamaTinggal != "Sejak lahir" && (
              <tr className="align-top">
                <td className={`pt-[10px] pr-4`}>
                    Alasan pindah
                </td>
                <td className="">
                  <input
                    type="text"
                    disabled={!userIsOwner}
                    placeholder="Alasan pindah"
                    className="w-full mt-1" value={model.alasanPindah}
                    onChange={e => setModel(prev => ({...prev, alasanPindah: e.target.value }))}
                  />
                </td>
              </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex md:justify-center border-t border-b border-blue-200 py-1">
        <table className="w-full md:w-auto md:mx-auto">
          <tbody>
            <tr>
              <td className="w-1/3 md:w-auto pr-4">Pekerjaan&nbsp;utama</td>
              <td className="">
                <select
                  className="inline-block max-w-xs mb-1"
                  value={model.pekerjaanUtama}
                  disabled={!userIsOwner}
                  onChange={e => setModel(prev => ({...prev, pekerjaanUtama: e.target.value }))}
                >
                  <option value="">-</option>
                  {constants.Pekerjaan.map((e, i) => (
                    <option key={`KEY-${i}`} value={e}>{e}</option>
                  ))}
                </select>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p className="py-2">Pekerjaan&nbsp;lain</p>
      <div className="flex flex-wrap pb-3">
        {constants.PekerjaanLain.map((p, i) => (
          <label key={p} className="w-60 flex items-center space-x-1 mr-4 mt-1">
            <input
              type="checkbox"
              value={p}
              checked={model.pekerjaanLain.includes(p)}
              disabled={!userIsOwner}
              onChange={e => {
                const val = e.target.value;
                const array = model.pekerjaanLain;
                if (e.target.checked) {
                  if (!array.includes[val]) {
                    setModel(prev => ({...prev,
                      pekerjaanLain: [...array, val]
                    }))
                  }
                } else {
                  setModel(prev => ({...prev,
                    pekerjaanLain: array.filter(item => item != val)
                  }))
                }
              }}
            />
            <span className="truncate">{p}</span>
          </label>
        ))}
      </div>
      {userIsOwner &&
        <div className="pt-4 text-center border-t border-blue-200">
        {
          ((isNew && !isReady) ||
          (!isNew && (!isReady || !isDirty()))) && (
            <button className="btnSubSectionDisabled">Save</button>
          )
        }
        {isReady && isDirty() && <button
          className="btnSubSection" onClick={saveData}>Save</button>}
        </div>
      }

      <div className="my-8">
        {/* <pre>MODEL {JSON.stringify(model, null, 2)}</pre> */}
      </div>
    </div>
  )
}

export default Responden;
