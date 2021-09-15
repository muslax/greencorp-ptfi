import { useState } from "react";
import fetchJson from 'lib/fetchJson';
import { generatePOSTData } from 'lib/utils';

import DataRow from "components/DataRow";

export default function SosialEkonomi({ user, isOwner, responden, constants, mutate }) {

  const [model, setModel] = useState({
    _id: responden._id,
    // pekerjaanUtama: responden.pekerjaanUtama,
    // pekerjaanLain: responden.pekerjaanLain,
    minatKerja: responden.minatKerja,
    pernahMelamar: responden.pernahMelamar,
    hambatanMelamar: responden.hambatanMelamar,
    minatPelatihanKerja: responden.minatPelatihanKerja,
    rerataPemasukan: responden.rerataPemasukan,
    periodePemasukan: responden.periodePemasukan,
    sumberPemasukan: responden.sumberPemasukan,
    rerataPengeluaran: responden.rerataPengeluaran,
    periodePengeluaran: responden.periodePengeluaran,
    belanjaMakanan: responden.belanjaMakanan,
    belanjaPendidikan: responden.belanjaPendidikan,
    belanjaKesehatan: responden.belanjaKesehatan,
    belanjaTransportasi: responden.belanjaTransportasi,
    belanjaKomunikasi: responden.belanjaKomunikasi,
    belanjaTempatTinggal: responden.belanjaTempatTinggal,
    belanjaListrik: responden.belanjaListrik,
    belanjaCicilan: responden.belanjaCicilan,
    belanjaLainnya: responden.belanjaLainnya,
    tabungan: responden.tabungan,
    jumlahTabungan: responden.jumlahTabungan,
    tempatTabungan: responden.tempatTabungan,
    kecukupanPemasukan: responden.kecukupanPemasukan,
    caraPemenuhanKebutuhan: responden.caraPemenuhanKebutuhan,
    keberadaanUsaha: responden.keberadaanUsaha,
    namaUsaha: responden.namaUsaha,
    bidangUsaha: responden.bidangUsaha,
    tahunUsaha: responden.tahunUsaha,
    pendapatanUsahaPerBulan: responden.pendapatanUsahaPerBulan,
    pernahKerjasama: responden.pernahKerjasama,
    bidangKerjasama: responden.bidangKerjasama,
    minatKerjasama: responden.minatKerjasama,
    alasanMinatKerjasama: responden.alasanMinatKerjasama,
    kemampuanKerjasama: responden.kemampuanKerjasama,
    pernahKirimProposal: responden.pernahKirimProposal,
    kendalaProposal: responden.kendalaProposal,
    minatPelatihanUsaha: responden.minatPelatihanUsaha,
  });

  async function saveData(e) {
    try {
      const rs = await fetchJson("/api/post?q=save-sosek", generatePOSTData(model))
      mutate();
    } catch (error) {
      console.log("ERROR")
    }
  }

  function dirty1() {
    return model.minatKerja != responden.minatKerja
    || model.pernahMelamar != responden.pernahMelamar
    || model.hambatanMelamar != responden.hambatanMelamar
    || model.minatPelatihanKerja != responden.minatPelatihanKerja
  }

  function dirty2() {
    const arr1 = [...model.sumberPemasukan].sort().toString();
    const arr2 = [...responden.sumberPemasukan].sort().toString();
    return model.rerataPemasukan != responden.rerataPemasukan
    || arr1 != arr2;
  }

  function dirty3() {
    return model.rerataPengeluaran != responden.rerataPengeluaran
    || model.periodePengeluaran != responden.periodePengeluaran
    || model.belanjaMakanan != responden.belanjaMakanan
    || model.belanjaPendidikan != responden.belanjaPendidikan
    || model.belanjaKesehatan != responden.belanjaKesehatan
    || model.belanjaTransportasi != responden.belanjaTransportasi
    || model.belanjaKomunikasi != responden.belanjaKomunikasi
    || model.belanjaTempatTinggal != responden.belanjaTempatTinggal
    || model.belanjaListrik != responden.belanjaListrik
    || model.belanjaCicilan != responden.belanjaCicilan
    || model.belanjaLainnya != responden.belanjaLainnya
  }

  function dirty4() {
    return model.tabungan != responden.tabungan
    || model.jumlahTabungan != responden.jumlahTabungan
    || model.tempatTabungan != responden.tempatTabungan
    || model.kecukupanPemasukan != responden.kecukupanPemasukan
    || model.caraPemenuhanKebutuhan != responden.caraPemenuhanKebutuhan
  }

  function dirty5() {
    const arr1 = [...model.kendalaProposal].sort().toString();
    const arr2 = [...responden.kendalaProposal].sort().toString();
    const arr3 = [...model.minatPelatihanUsaha].sort().toString();
    const arr4 = [...responden.minatPelatihanUsaha].sort().toString();
    return model.keberadaanUsaha != responden.keberadaanUsaha
    || model.namaUsaha != responden.namaUsaha
    || model.bidangUsaha != responden.bidangUsaha
    || model.tahunUsaha != responden.tahunUsaha
    || model.pendapatanUsahaPerBulan != responden.pendapatanUsahaPerBulan
    || model.pernahKerjasama != responden.pernahKerjasama
    || model.bidangKerjasama != responden.bidangKerjasama
    || model.minatKerjasama != responden.minatKerjasama
    || model.alasanMinatKerjasama != responden.alasanMinatKerjasama
    || model.kemampuanKerjasama != responden.kemampuanKerjasama
    || model.pernahKirimProposal != responden.pernahKirimProposal
    || arr1 != arr2
    || arr3 != arr4;
  }

  return (
    <div>
      <table className="w-full border-t border-blue-200">
        <tbody>
          <tr className="align-top">
            <td className="w-1/4 h-3"></td>
            <td className=""></td>
          </tr>
          <DataRow text="Pekerjaan formal/utama">
            <input
              type="text"
              className="bg-yellow-50 mt-1"
              readOnly
              value={responden.pekerjaanUtama}
            />
          </DataRow>
          <DataRow text="Pekerjaan lain">
            <input
              type="text"
              className="w-full bg-yellow-50 mt-1"
              readOnly
              value={responden.pekerjaanLain.join(", ")}
            />
          </DataRow>
          <DataRow text="Minat bekerja di PTFI/Kontraktor">
            <select
              className=""
              disabled={!isOwner}
              value={model.minatKerja}
              onChange={e => setModel(m => ({...m, minatKerja: e.target.value }))}
            >
              <option value="">-</option>
              <option value="Berminat">Berminat</option>
              <option value="Tidak berminat">Tidak berminat</option>
              <option value="Tidak tahu">Tidak tahu</option>
            </select>
          </DataRow>
          <DataRow text="Pernah melamar kerja di PTFI/Kontraktor">
            <select
              className=""
              disabled={!isOwner}
              value={model.pernahMelamar}
              onChange={e => setModel(m => ({...m, pernahMelamar: e.target.value }))}
            >
              <option value="">-</option>
              <option value="Pernah dan diterima">Pernah dan diterima</option>
              <option value="Pernah tapi tidak diterima">Pernah tapi tidak diterima</option>
              <option value="Belum pernah">Belum pernah</option>
            </select>
          </DataRow>
          <DataRow text="Hambatan bekerja di PTFI/Kontraktor">
            <select
              className=""
              disabled={!isOwner}
              value={model.hambatanMelamar}
              onChange={e => setModel(m => ({...m, hambatanMelamar: e.target.value }))}
            >
              <option value="">-</option>
              <option value="Tidak memenuhi syarat">Tidak memenuhi syarat</option>
              <option value="Memenuhi syarat tapi tidak terpilih">Memenuhi syarat tapi tidak terpilih</option>
              <option value="Tidak tahu">Tidak tahu</option>
            </select>
          </DataRow>
          <DataRow text="Minat pelatihan kerja">
            <select
              className=""
              disabled={!isOwner}
              value={model.minatPelatihanKerja}
              onChange={e => setModel(m => ({...m, minatPelatihanKerja: e.target.value }))}
            >
              <option value="">-</option>
              <option value="Bersedia">Bersedia</option>
              <option value="Tidak bersedia">Tidak bersedia</option>
              <option value="Tidak tahu">Tidak tahu</option>
            </select>
          </DataRow>

          {isOwner && (
            <DataRow text="&nbsp;">
              {!dirty1() && <button className="btnSubSectionDisabled">Save</button>}
              {dirty1() && <button onClick={saveData} className="btnSubSection">Save</button>}
            </DataRow>
          )}
          <tr className="align-top">
            <td colSpan="2" className="py-3">
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRow text="Rata-rata pemasukan (Rp) per bulan">
            <select
              className=""
              disabled={!isOwner}
              value={model.rerataPemasukan}
              onChange={e => setModel(m => ({...m, rerataPemasukan: e.target.value }))}
            >
              <option value="">-</option>
              {constants.TingkatPemasukan.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </DataRow>
          <DataRow text="Sumber-sumber pemasukan">
            <div className="flex flex-col pt-2">
              {constants.SumberPemasukan.map(m => (
                <div key={m} className="">
                  <label className="inline-flex items-center space-x-1 my-1">
                    <input
                      type="checkbox"
                      value={m}
                      disabled={!isOwner}
                      checked={model.sumberPemasukan.includes(m)}
                      onChange={e => {
                        const val = e.target.value;
                        const array = model.sumberPemasukan;
                        if (e.target.checked) {
                          if (!array.includes[val]) {
                            setModel(prev => ({...prev,
                              sumberPemasukan: [...array, val]
                            }))
                          }
                        } else {
                          setModel(prev => ({...prev,
                            sumberPemasukan: array.filter(item => item != val)
                          }))
                        }
                      }}
                    />
                    <span>{m}</span>
                  </label>
                </div>
              ))}
            </div>
          </DataRow>
          {isOwner && (
            <DataRow text="&nbsp;">
              {!dirty2() && <button className="btnSubSectionDisabled">Save</button>}
              {dirty2() && <button onClick={saveData} className="btnSubSection">Save</button>}
            </DataRow>
          )}
          <tr className="align-top">
            <td colSpan="2" className="text-center py-3">
              <hr className="border-blue-200"/>
              <p className="pt-3 text-red-500 font-medium">
                Seluruh nilai harus sudah dikonversi menjadi nilai per bulan.
              </p>
            </td>
          </tr>
          <DataRow text="Rata-rata pengeluaran">
            <select
              className=""
              disabled={!isOwner}
              value={model.rerataPengeluaran}
              onChange={e => setModel(m => ({...m, rerataPengeluaran: e.target.value }))}
            >
              <option value="">-</option>
              {constants.TingkatPengeluaran.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </DataRow>
          <DataRow text="Pengeluaran untuk konsumsi">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaMakanan}
              onChange={e => setModel(m => ({...m, belanjaMakanan: parseInt(e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pengeluaran untuk pendidikan">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaPendidikan}
              onChange={e => setModel(m => ({...m, belanjaPendidikan: parseInt(e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pengeluaran untuk kesehatan">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaKesehatan}
              onChange={e => setModel(m => ({...m, belanjaKesehatan: parseInt(e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pengeluaran untuk transportasi">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaTransportasi}
              onChange={e => setModel(m => ({...m, belanjaTransportasi: parseInt(e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pengeluaran untuk komunikasi">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaKomunikasi}
              onChange={e => setModel(m => ({...m, belanjaKomunikasi: parseInt(e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pengeluaran untuk tempat tinggal">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaTempatTinggal}
              onChange={e => setModel(m => ({...m, belanjaTempatTinggal: parseInt(e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pengeluaran untuk listrik">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaListrik}
              onChange={e => setModel(m => ({...m, belanjaListrik: parseInt(e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pengeluaran untuk cicilan">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaCicilan}
              onChange={e => setModel(m => ({...m, belanjaCicilan: parseInt(e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pengeluaran untuk lainnya">
            <input
              type="number"
              className="mt-1"
              disabled={!isOwner}
              value={model.belanjaLainnya}
              onChange={e => setModel(m => ({...m, belanjaLainnya: parseInt(e.target.value) }))}
            />
          </DataRow>

          {isOwner && (
            <DataRow text="&nbsp;">
              {!dirty3() && <button className="btnSubSectionDisabled">Save</button>}
              {dirty3() && <button onClick={saveData} className="btnSubSection">Save</button>}
            </DataRow>
          )}

          <tr className="align-top">
            <td colSpan="2" className="py-3">
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRow text="Keberadaan tabungan">
            <select
              className="mr-3"
              disabled={!isOwner}
              value={model.tabungan}
              onChange={e => {
                setModel(m => ({...m, tabungan: e.target.value }))
                if (e.target.value != "Ada") {
                  setModel(m => ({...m, jumlahTabungan: 0 }))
                  setModel(m => ({...m, tempatTabungan: "" }))
                }
              }}
            >
              <option value="">-</option>
              <option value="Ada">Ada</option>
              <option value="Tidak ada">Tidak ada</option>
            </select>
            {model.tabungan == "Ada" && (
              <>
              <input
                type="number"
                min={0}
                className="w-36 mr-3 mt-1"
                placeholder="Berapa?"
                disabled={!isOwner}
                value={model.jumlahTabungan}
                onChange={e => setModel(m => ({...m, jumlahTabungan: parseInt(e.target.value) }))}
              />
              <input
                type="text"
                className="mt-1"
                placeholder="Di mana?"
                disabled={!isOwner}
                value={model.tempatTabungan}
                onChange={e => setModel(m => ({...m, tempatTabungan: (e.target.value) }))}
              />
              </>
            )}
          </DataRow>
          <DataRow text="Kecukupan pemasukan">
            <select
              className=""
              disabled={!isOwner}
              value={model.kecukupanPemasukan}
              onChange={e => {
                setModel(m => ({...m, kecukupanPemasukan: (e.target.value) }))
                if (e.target.value == "Cukup") {
                  setModel(m => ({...m, caraPemenuhanKebutuhan: "" }))
                }
              }}
            >
              <option value="">-</option>
              <option value="Cukup">Cukup</option>
              <option value="Tidak cukup">Tidak cukup</option>
            </select>
          </DataRow>
          {model.kecukupanPemasukan == "Tidak cukup" && (
            <DataRow text="Cara pemenuhan kebutuhan">
              <input
                type="text"
                className="w-full mt-1"
                disabled={!isOwner}
                value={model.caraPemenuhanKebutuhan}
                onChange={e => setModel(m => ({...m, caraPemenuhanKebutuhan: (e.target.value) }))}
              />
            </DataRow>
          )}

          {isOwner && (
            <DataRow text="&nbsp;">
              {!dirty4() && <button className="btnSubSectionDisabled">Save</button>}
              {dirty4() && <button onClick={saveData} className="btnSubSection">Save</button>}
            </DataRow>
          )}
          <tr className="align-top">
            <td colSpan="2" className="py-3">
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRow text="Kepimilikan usaha">
            <select
              className=""
              disabled={!isOwner}
              value={model.keberadaanUsaha}
              onChange={e => {
                setModel(m => ({...m, keberadaanUsaha: (e.target.value) }))
                if (e.target.value != "Ada") {
                  setModel(m => ({
                    ...m,
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
                  }))
                }
              }}
            >
              <option value="">-</option>
              <option value="Ada">Ada</option>
              <option value="Tidak ada">Tidak ada</option>
            </select>
          </DataRow>
          {model.keberadaanUsaha == "Ada" && (<>
          <DataRow text="Nama perusahaan">
            <input
              type="text"
              className="w-full max-w-sm mt-1"
              disabled={!isOwner}
              value={model.namaUsaha}
              onChange={e => setModel(m => ({...m, namaUsaha: (e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Bidang usaha">
            <select
              className=""
              disabled={!isOwner}
              value={model.bidangUsaha}
              onChange={e => setModel(m => ({...m, bidangUsaha: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.BidangUsaha.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
              <option value="Lainnya">Lainnya</option>
            </select>
          </DataRow>
          <DataRow text="Tahun berdiri perusahaan">
            <input
              type="number"
              min={1967}
              max={2021}
              className="w-24 mt-1"
              disabled={!isOwner}
              value={model.tahunUsaha}
              onChange={e => setModel(m => ({...m, tahunUsaha: (e.target.value) }))}
            />
          </DataRow>
          <DataRow text="Pendapatan usaha per bulan">
            <select
              className=""
              disabled={!isOwner}
              value={model.pendapatanUsahaPerBulan}
              onChange={e => setModel(m => ({...m, pendapatanUsahaPerBulan: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.PendapatanUsaha.map(p => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </DataRow>
          <DataRow text="Order dari PTFI/Kontraktor">
            <div className="flex space-x-3">
              <select
                className="w-48"
                disabled={!isOwner}
                value={model.pernahKerjasama}
                onChange={e => setModel(m => ({...m, pernahKerjasama: (e.target.value) }))}
              >
                <option value="">-</option>
                <option value="Belum pernah">Belum pernah</option>
                <option value="Sudah pernah">Sudah pernah</option>
              </select>
              <input
                type="text"
                className="w-full mt-1"
                disabled={!isOwner}
                placeholder="Jelaskan..."
                value={model.bidangKerjasama}
                onChange={e => setModel(m => ({...m, bidangKerjasama: (e.target.value) }))}
              />
            </div>
          </DataRow>
          <DataRow text="Minat bekerjasama dg PTFI/Kontraktor">
            <div className="flex space-x-3">
              <select
                className="w-48"
                disabled={!isOwner}
                value={model.minatKerjasama}
                onChange={e => setModel(m => ({...m, minatKerjasama: (e.target.value) }))}
              >
                <option value="">-</option>
                <option value="Berminat">Berminat</option>
                <option value="Tidak berminat">Tidak berminat</option>
                <option value="Tidak tahu">Tidak tahu</option>
              </select>
              <input
                type="text"
                className="w-full mt-1"
                placeholder="Alasan..."
                disabled={!isOwner}
                value={model.alasanMinatKerjasama}
                onChange={e => setModel(m => ({...m, alasanMinatKerjasama: (e.target.value) }))}
              />
            </div>
          </DataRow>
          <DataRow text="Kemampuan perusahaan">
            <select
              className=""
              disabled={!isOwner}
              value={model.kemampuanKerjasama}
              onChange={e => setModel(m => ({...m, kemampuanKerjasama: (e.target.value) }))}
            >
              <option value="">-</option>
              <option value="Mampu">Mampu</option>
              <option value="Tidak mampu">Tidak mampu</option>
            </select>
          </DataRow>
          <DataRow text="Penawaran kerjasama ke PTFI/Kontraktor">
            <select
              className="max-w-xs"
              disabled={!isOwner}
              value={model.pernahKirimProposal}
              onChange={e => setModel(m => ({...m, pernahKirimProposal: (e.target.value) }))}
            >
              <option value="">-</option>
              <option value="Pernah dan diterima">Pernah dan diterima</option>
              <option value="Pernah tapi tidak diterima">Pernah tapi tidak diterima</option>
              <option value="Belum pernah">Belum pernah</option>
            </select>
          </DataRow>
          <DataRow text="Kendala kerjasama dg PTFI/Kontraktor">
            <div className="flex flex-col pt-2">
              {constants.KendalaUsaha.map(m => (
                <div key={m} className="">
                  <label className="inline-flex items-center space-x-1 my-1">
                    <input
                      type="checkbox"
                      value={m}
                      disabled={!isOwner}
                      checked={model.kendalaProposal.includes(m)}
                      onChange={e => {
                        const val = e.target.value;
                        const array = model.kendalaProposal;
                        if (e.target.checked) {
                          if (!array.includes[val]) {
                            setModel(prev => ({...prev,
                              kendalaProposal: [...array, val]
                            }))
                          }
                        } else {
                          setModel(prev => ({...prev,
                            kendalaProposal: array.filter(item => item != val)
                          }))
                        }
                      }}
                    />
                    <span>{m}</span>
                  </label>
                </div>
              ))}
              <input
                type="text"
                className="w-full mt-1"
                disabled={!isOwner}
                defaultValue={model.kendalaProposal.filter(i => !constants.KendalaUsaha.includes(i))[0] || ""}
                onBlur={e => {
                  const val = e.target.value.trim();
                  const array = model.kendalaProposal;
                  if (val) {
                    setModel(prev => ({...prev,
                      kendalaProposal: [...array, val]
                    }))
                  }
                }}
              />
            </div>
          </DataRow>
          <DataRow text="Minat untuk pelatihan usaha">
            <div className="flex flex-col pt-2">
              {constants.PelatihanUsaha.map(m => (
                <div key={m} className="">
                  <label className="inline-flex items-center space-x-1 my-1">
                    <input
                      type="checkbox"
                      value={m}
                      disabled={!isOwner}
                      checked={model.minatPelatihanUsaha.includes(m)}
                      onChange={e => {
                        const val = e.target.value;
                        const array = model.minatPelatihanUsaha;
                        if (e.target.checked) {
                          if (!array.includes[val]) {
                            setModel(prev => ({...prev,
                              minatPelatihanUsaha: [...array, val]
                            }))
                          }
                        } else {
                          setModel(prev => ({...prev,
                            minatPelatihanUsaha: array.filter(item => item != val)
                          }))
                        }
                      }}
                    />
                    <span>{m}</span>
                  </label>
                </div>
              ))}
              <input
                type="text"
                className="w-full mt-1"
                disabled={!isOwner}
                defaultValue={model.minatPelatihanUsaha.filter(i => !constants.PelatihanUsaha.includes(i))[0] || ""}
                onBlur={e => {
                  const val = e.target.value.trim();
                  const array = model.minatPelatihanUsaha;
                  if (val) {
                    setModel(prev => ({...prev,
                      minatPelatihanUsaha: [...array, val]
                    }))
                  }
                }}
              />
            </div>
          </DataRow>
          </>)}
          {isOwner && (
            <DataRow text="&nbsp;">
              {!dirty5() && <button className="btnSubSectionDisabled">Save</button>}
              {dirty5() && <button onClick={saveData} className="btnSubSection">Save</button>}
            </DataRow>
          )}
        </tbody>
      </table>
    </div>
  )
}

/*

"Gaji/upah tetap",
"Hasil kerja sampingan",
"Hasil berjualan",
"Hasil berkebun",
"Hasil berburu",
"Hasil kerajinan",
"Bantuan kerabat",
"Bantuan sosial pemerintan",
"Bantuan non-pemerintah",

"Maksimum Rp 500.000",
"Rp 500.000 s.d. Rp 2.000.000",
"Rp 2.000.000 s.d. Rp 4.000.000",
"Rp 4.000.000 s.d. Rp 6.000.000",
"Rp 6.000.000 s.d. Rp 8.000.000",
"Rp 8.000.000 s.d. Rp 10.000.000",
"Lebih dari Rp 10.000.000",


"Perdagangan",
"Pemborong bangunan",
"Pembersihan",
"Pengangkutan",
"Pertukangan",


"Kurang dari Rp 2.000.000",
"2 juta – 4 juta rupiah",
"4 juta – 6 juta rupiah",
"6 juta – 8 juta rupiah",
"8 juta – 10 juta rupiah",
"Di atas Rp 10.000.000",



"Pernah, dan diterima",
"Pernah, tapi belum diterima",
"Belum pernah mengirimkan penawaran",

"Izin usaha belum ada",
"Kemampuan perusahaan belum mencukupi",
"Modal belum tersedia",
"Belum punya NPWP",


"Pelatihan teknis pekerjaan",
"Pelatihan pelaporan keuangan",
"Pelatihan pemasaran",
"Pelatihan manajemen proyek",


*/