import DataRow from "components/DataRow";
import useKlaimAdat from "hooks/useKlaimAdat";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";

export default function KlaimAdat({ user, constants, responden, isOwner, mutate }) {
  const { klaim, loadingKlaim, mutateKlaim } = useKlaimAdat(responden._id);

  const [model, setModel] = useState(newModel());

  const [permintaanLain, setPermintaanLain] = useState("");

  useEffect(() => {
    if (klaim) setModel(klaim)
  }, [klaim])

  function modelFields(obj = null) {
    return {
      hakUlayat: obj ? obj.hakUlayat : "",
      infoHakUlayat: obj ? obj.infoHakUlayat : "",
      peningkatanHakUlayat: obj ? obj.peningkatanHakUlayat : "",
      permintaanPeningkatanHakUlayat: obj ? obj.permintaanPeningkatanHakUlayat : [],
      danaKemitraan: obj ? obj.danaKemitraan : "",
      manfaatDanaKemitraan: obj ? obj.manfaatDanaKemitraan : [],
      danaPerwalian: obj ? obj.danaPerwalian : "",
      infoDanaPerwalian: obj ? obj.infoDanaPerwalian : "",
      penghargaanPTFI: obj ? obj.penghargaanPTFI : "",
      infoPenghargaanPTFI: obj ? obj.infoPenghargaanPTFI : "",
      perjanjian1974: obj ? obj.perjanjian1974 : "",
      infoPerjanjian1974: obj ? obj.infoPerjanjian1974 : "",
      mou2000: obj ? obj.mou2000 : "",
      infoMou2000: obj ? obj.infoMou2000 : "",
    }
  }

  function newModel() {
    const fields = modelFields();
    return {
      _id: null,
      _rid: responden._id,
      ...fields,
    }
  }

  async function saveData(e) {
    try {
      await fetchJson("/api/post?q=save-klaim-adat", generatePOSTData(model))
      mutateKlaim()
    } catch (error) {
      console.log("ERROR")
    }
  }

  function isDirty() {
    return !isEqual(modelFields(model), modelFields(klaim));
  }

  return (
    <div>
      <table className="w-full border-t border-blue-200">
        <tbody>
          <tr className="align-top">
            <td className="w-1/4 h-3"></td>
            <td className=""></td>
          </tr>
          <DataRow text="Tentang hak ulayat">
            <select
              className=""
              disabled={!isOwner}
              value={model.hakUlayat}
              onChange={e => setModel(m => ({...m, hakUlayat: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.Tahu.map((e, i) => (
                <option key={`KEY-${i}`} value={e}>{e}</option>
              ))}
            </select>
          </DataRow>
          <DataRow
            text={<p className="text-blue-500">
              &#10148; Penjelasan tentang hak ulayat
            </p>}
          >
            <input
              type="text"
              value={model.infoHakUlayat}
              className="w-full mt-1"
              onChange={e => setModel(prev => ({...prev, infoHakUlayat: e.target.value }))}
            />
          </DataRow>
          <DataRow text="Pernah/tidak meminta manfaat lebih">
            <select
              className=""
              disabled={!isOwner}
              value={model.peningkatanHakUlayat}
              onChange={e => setModel(m => ({...m, peningkatanHakUlayat: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.Pernah.map((e, i) => (
                <option key={`KEY-${i}`} value={e}>{e}</option>
              ))}
            </select>
          </DataRow>
          <DataRow
            text={<p className="text-blue-500">
              &#10148; Jenis manfaat yang dimintakan
            </p>}
          >
            <div className="pt-2">
            {constants.PermintaanManfaatHakUlayat.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.permintaanPeningkatanHakUlayat.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.permintaanPeningkatanHakUlayat;
                      if (e.target.checked) {
                        if (!array.includes[val]) {
                          setModel(prev => ({...prev,
                            permintaanPeningkatanHakUlayat: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          permintaanPeningkatanHakUlayat: array.filter(item => item != val)
                        }))
                      }
                    }}
                  />
                  <span>{m}</span>
                </label>
              </div>
            ))}
            </div>
            {/*  */}
            <input
              type="text"
              className="w-full mt-1"
              disabled={!isOwner}
              defaultValue={model.permintaanPeningkatanHakUlayat.filter(i => !constants.PermintaanManfaatHakUlayat.includes(i))[0] || ""}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = model.permintaanPeningkatanHakUlayat;
                if (val) {
                  setModel(prev => ({...prev,
                    permintaanPeningkatanHakUlayat: [...array, val]
                  }))
                } else {
                  const legalItems = model.permintaanPeningkatanHakUlayat
                    .filter(item => constants.PermintaanManfaatHakUlayat.includes(item));
                  setModel(prev => ({...prev,
                    permintaanPeningkatanHakUlayat: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          <DataRow text="Tentang Dana Kemitraan">
            <select
              className=""
              disabled={!isOwner}
              value={model.danaKemitraan}
              onChange={e => setModel(m => ({...m, danaKemitraan: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.Tahu.map((e, i) => (
                <option key={`KEY-${i}`} value={e}>{e}</option>
              ))}
            </select>
          </DataRow>
          {/* manfaatDanaKemitraan */}
          <DataRow
            text={<p className="text-blue-500">&#10148; Manfaat yang pernah ditermia</p>}
          >
          <div className="pt-2">
            {constants.ManfaatDKPernahDiterima.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.manfaatDanaKemitraan.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.manfaatDanaKemitraan;
                      if (e.target.checked) {
                        if (!array.includes[val]) {
                          setModel(prev => ({...prev,
                            manfaatDanaKemitraan: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          manfaatDanaKemitraan: array.filter(item => item != val)
                        }))
                      }
                    }}
                  />
                  <span>{m}</span>
                </label>
              </div>
            ))}
            </div>
            {/*  */}
            <input
              type="text"
              className="w-full mt-1"
              disabled={!isOwner}
              defaultValue={model.manfaatDanaKemitraan.filter(i => !constants.ManfaatDKPernahDiterima.includes(i))[0] || ""}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = model.manfaatDanaKemitraan;
                if (val) {
                  setModel(prev => ({...prev,
                    manfaatDanaKemitraan: [...array, val]
                  }))
                } else {
                  const legalItems = model.manfaatDanaKemitraan
                    .filter(item => constants.ManfaatDKPernahDiterima.includes(item));
                  setModel(prev => ({...prev,
                    manfaatDanaKemitraan: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          <DataRow text="Tentang Dana Perwalian">
            <select
              className=""
              disabled={!isOwner}
              value={model.danaPerwalian}
              onChange={e => setModel(m => ({...m, danaPerwalian: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.TentangDanaPerwalian.map((e, i) => (
                <option key={`KEY-${i}`} value={e}>{e}</option>
              ))}
            </select>
          </DataRow>
          <DataRow
            text={<p className="text-blue-500">&#10148; Penjelasan lebih lanjut</p>}
          >
            <input
              type="text"
              className="w-full mt-1"
              disabled={!isOwner}
              defaultValue={model.infoDanaPerwalian}
              onChange={e => setModel(prev => ({
                ...prev,
                infoDanaPerwalian: e.target.value.trim()
              }))}
            />
          </DataRow>
          <DataRow text="Sudah layakkah penghargaan dari PTFI?">
            <select
              className=""
              disabled={!isOwner}
              value={model.penghargaanPTFI}
              onChange={e => setModel(m => ({...m, penghargaanPTFI: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.Layak.map((e, i) => (
                <option key={`KEY-${i}`} value={e}>{e}</option>
              ))}
            </select>
          </DataRow>
          <DataRow
            text={<p className="text-blue-500">&#10148; Penjelasan lebih lanjut</p>}
          >
            <input
              type="text"
              className="w-full mt-1"
              disabled={!isOwner}
              defaultValue={model.infoPenghargaanPTFI}
              onChange={e => setModel(prev => ({
                ...prev,
                infoPenghargaanPTFI: e.target.value.trim()
              }))}
            />
          </DataRow>
          <DataRow text="Tentang Perjanjian 1974">
            <select
              className=""
              disabled={!isOwner}
              value={model.perjanjian1974}
              onChange={e => setModel(m => ({...m, perjanjian1974: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.TentangPerjanjian1974.map((e, i) => (
                <option key={`KEY-${i}`} value={e}>{e}</option>
              ))}
            </select>
          </DataRow>
          <DataRow
            text={<p className="text-blue-500">&#10148; Penjelasan lebih lanjut</p>}
          >
            <input
              type="text"
              className="w-full mt-1"
              disabled={!isOwner}
              defaultValue={model.infoPerjanjian1974}
              onChange={e => setModel(prev => ({
                ...prev,
                infoPerjanjian1974: e.target.value.trim()
              }))}
            />
          </DataRow>
          <DataRow text="Tentang MOU Tahun 2000">
            <select
              className=""
              disabled={!isOwner}
              value={model.mou2000}
              onChange={e => setModel(m => ({...m, mou2000: (e.target.value) }))}
            >
              <option value="">-</option>
              {constants.TentangMOU2000.map((e, i) => (
                <option key={`KEY-${i}`} value={e}>{e}</option>
              ))}
            </select>
          </DataRow>
          <DataRow
            text={<p className="text-blue-500">&#10148; Penjelasan lebih lanjut</p>}
          >
            <input
              type="text"
              className="w-full mt-1"
              disabled={!isOwner}
              defaultValue={model.infoMou2000}
              onChange={e => setModel(prev => ({
                ...prev,
                infoMou2000: e.target.value.trim()
              }))}
            />
          </DataRow>
          <DataRow text={<></>}>
            <div className="pt-4">
              {!isDirty() && <button className="btnSubSectionDisabled">Save</button>}
              {isDirty() && <button onClick={saveData} className="btnSubSection">Save</button>}
            </div>
          </DataRow>
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(modelFields(klaim), null, 2)}</pre> */}
    </div>
  )
}