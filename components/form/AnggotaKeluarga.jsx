import { useState } from "react";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import useConstants from 'hooks/useConstants'
import useDaftarAnggota from "hooks/useDaftarAnggota";
import DeleteActionButton from "components/DeleteActionButton";
import RowActionButton from "components/RowActionButton";
import DeleteButton from "components/DeleteButton";


const AnggotaKeluarga = ({ user, responden }) => {
  const { constants, loadingConstants } = useConstants();
  const { dfAnggota, loadingDfAnggota, mutateDfAnggota } = useDaftarAnggota(responden._id);

  function newModel() {
    return {
      _id: null,
      _rid: responden._id,
      isResponden: false,
      nama: "",
      hubungan: "",
      gender: "",
      umur: 0,
      marital: "",
      melekHuruf: "",
      pendidikan: "",
      pekerjaanUtama: "",
      pekerjaanLain: [],
    }
  }

  const [form, setForm] = useState(false);
  const [model, setModel] = useState(newModel());
  const [selected, setSelected] = useState(null);

  if (loadingConstants || loadingDfAnggota) return null;

  const userIsOwner = responden.dataEntri == user.fullname;

  async function saveAnggota(e) {
    // Check reqs
    try {
      await fetchJson("/api/post?q=save-anggota", generatePOSTData(model))
      mutateDfAnggota();
    } catch (error) {
      alert("ERROR")
    }

    setForm(false);
  }

  async function deleteAnggota(e) {
    try {
      await fetchJson("/api/post?q=delete-anggota", generatePOSTData({ id: selected._id }))
      mutateDfAnggota();
    } catch (error) {
      alert("ERROR")
    }

    setForm(false);
    setSelected(null);
  }

  function isReady() {
    return model.nama && model.hubungan && model.gender && model.umur > 0;
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-t border-blue-200" style={{ }}>
            <thead>
              <tr className="border-b border-blue-200 bg-blue-200 bg-opacity-60 text--sm font-medium whitespace-nowrap">
                <td className="p-2 w-12">#</td>
                <td className="p-2">Nama&nbsp;lengkap</td>
                <td className="p-2">Hubungan</td>
                <td className="p-2">L/P</td>
                <td className="p-2">Status</td>
                <td className="p-2">Umur</td>
                <td className="p-2">MH</td>
                <td className="p-2">Pendidikan</td>
                <td className="p-2">P Formal</td>
                <td className="p-2">P Informal</td>
                <td className="p-2 w-12">...</td>
              </tr>
            </thead>
            {dfAnggota.map((a, i) => (
            <tbody key={a._id}>
              {/* {(!selected || selected?._id != a._id) && ( */}
              <tr key={a._id} className={i == 0
              ? "bg-blue-200 bg-opacity-30 border-b border-blue-200 whitespace-nowrap"
              : "border-b border-blue-200 whitespace-nowrap"
              }>
                <td className="p-2 w-12">{i + 1}</td>
                <td className="p-2 font-medium">
                  {i == 0 && <>{a.nama}</>}
                  {i > 0 && <span
                    className="cursor-pointer hover:text-blue-500"
                    onClick={e => {
                      if (!form && userIsOwner) {
                        setModel(a);
                        setForm(true);
                      }
                    }}
                  >{a.nama}</span>}
                </td>
                <td className="p-2">{a.hubungan == "Kepala Keluarga" ? "KK" : a.hubungan}</td>
                <td className="p-2">{a.gender}</td>
                <td className="p-2">{a.marital}</td>
                <td className="p-2">{a.umur}</td>
                <td className="p-2">{a.melekHuruf}</td>
                <td className="p-2">{a.pendidikan}</td>
                <td className="p-2">{a.pekerjaanUtama}</td>
                <td className="p-2">{a.pekerjaanLain.length}</td>
                <td className="p-1 w-12">
                  {i > 0 && <DeleteButton
                    onClick={e => {
                      if (!userIsOwner) return;
                      setForm(false);
                      setSelected(a);
                    }}
                  />}
                </td>
              </tr>
              {/* )} */}
              {selected?._id == a._id && (
              <tr className="border-b border-blue-200">
                <td colSpan="11" className="py-2 text-center">
                  <DeleteActionButton
                    onCancel={e => setSelected(null)}
                    onDelete={deleteAnggota}
                  />
                </td>
              </tr>
              )}
            </tbody>
            ))}
          </table>
      </div>
      {!form && !selected && userIsOwner && (
        <div className="my-6">
          <button
            className="btnSubSection"
            onClick={e => {
              setModel(newModel());
              setForm(true);
            }}
          >Add</button>
        </div>
      )}
      {form && (
        <div className="my-6">
          <div className="flex items-center space-x-4 my-4">
            <label className="flex-grow max-w-sm">
              <span className="block">Nama Lengkap</span>
              <input
                type="text"
                value={model.nama}
                className="w-full mt-1"
                onChange={e => setModel(prev => ({...prev, nama: e.target.value }))}
              />
            </label>
            <label className="">
              <span className="block">Hubungan</span>
              <select
                className="max-w-xs"
                value={model.hubungan}
                onChange={e => setModel(prev => ({...prev, hubungan: e.target.value }))}
              >
                <option value="">-</option>
                {constants.Hubungan.map((e, i) => (
                  <option key={`KEY-${i}`} value={e}>{e}</option>
                ))}
              </select>
            </label>
          </div>
          {/*  */}
          <div className="flex items-center space-x-4 my-4">
            <label className="">
              <span className="block">Jenis Kelamin</span>
              <select
                className="max-w-xs"
                value={model.gender}
                onChange={e => setModel(prev => ({...prev, gender: e.target.value }))}
              >
                <option value="">-</option>
                <option value="Laki-laki">Laki-laki</option>
                <option value="Perempuan">Perempuan</option>
              </select>
            </label>
            <label className="">
              <span className="block">Umur</span>
              <input
                type="number"
                min="1"
                className="w-20 mt-1"
                value={model.umur}
                onChange={e => setModel(prev => ({...prev, umur: parseInt(e.target.value) }))}
              />
            </label>
            <label className="">
              <span className="block">Status perkawinan</span>
              <select
                className="max-w-xs"
                value={model.marital}
                onChange={e => setModel(prev => ({...prev, marital: e.target.value }))}
              >
                <option value="">-</option>
                <option value="Menikah">Menikah</option>
                <option value="Cerai hidup">Cerai hidup</option>
                <option value="Cerai mati">Cerai mati</option>
                <option value="Belum menikah">Belum menikah</option>
              </select>
            </label>
            <label className="">
              <span className="block">Melek huruf</span>
              <select
                className="max-w-xs"
                value={model.melekHuruf}
                onChange={e => setModel(prev => ({...prev, melekHuruf: e.target.value }))}
              >
                <option value="">-</option>
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </select>
            </label>
          </div>
          <div className="flex items-center space-x-4 my-4">
            <label className="">
              <span className="block">Pendidikan</span>
              <select
                className="max-w-xs"
                value={model.pendidikan}
                onChange={e => setModel(prev => ({...prev, pendidikan: e.target.value }))}
              >
                <option value="">-</option>
                {constants.Pendidikan.map((e, i) => (
                  <option key={`KEY-${i}`} value={e}>{e}</option>
                ))}
              </select>
            </label>
            <label className="">
              <span className="block">Pekerjaan formal</span>
              <select
                className="max-w-xs"
                value={model.pekerjaanUtama}
                onChange={e => setModel(prev => ({...prev, pekerjaanUtama: e.target.value }))}
              >
                <option value="">-</option>
                {constants.Pekerjaan.map((e, i) => (
                  <option key={`KEY-${i}`} value={e}>{e}</option>
                ))}
              </select>
            </label>
          </div>
          {/*  */}
          <div className="my-4">
            <span className="block">Pekerjaan informal</span>
            <div className="flex flex-wrap">
              {constants.PekerjaanLain.map((p, i) => (
                <label key={p} className="w-60 flex items-center space-x-1 mr-4 mt-1">
                  <input
                    type="checkbox"
                    value={p}
                    checked={model.pekerjaanLain.includes(p)}
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
          </div>

          <RowActionButton
            ready={isReady()}
            onSave={saveAnggota}
            onCancel={e => setForm(false)}
          />
        </div>
      )}

      {/* <pre>{responden.dataEntri} {JSON.stringify(user, null, 2)}</pre> */}
    </div>
  )
}

export default AnggotaKeluarga;

/*
"Bertukang","Berburu","Bertani","Beternak","Mencari ikan","Mangkur sagu","Mematung","Membuat ukiran","Membuat noken atau kerajinan tangan","Budidaya ikan","Membuat perahu tradisional","Membuat jala","Pengrajin alat berburu","Lainnya"
*/
