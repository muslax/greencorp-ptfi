import DataRow, { DataRowInput, DataRowMultiline, DataRowSelect } from "components/DataRow";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import { ModelNelayan } from "lib/models";
import useNelayan from "hooks/useNelayan";

export default function Nelayan({ user, constants, responden, mutateResponden, isOwner }) {
  const { nelayan, loadingNelayan, mutateNelayan } = useNelayan(responden._id);

  const [model, setModel] = useState(ModelNelayan);

  useEffect(() => {
    if (nelayan) setModel(nelayan);
  }, [nelayan])

  if (loadingNelayan) return null;

  async function saveData(e) {
    try {
      await fetchJson("/api/post?q=save-nelayan", generatePOSTData(model))
      mutateNelayan()
    } catch (error) {
      console.log("ERROR")
    }
  }

  function isDirty() {
    const a = {...model};
    delete a._id; delete a._rid;
    const b = {...nelayan};
    delete b._id; delete b._rid;
    return !isEqual(a, b);
  }

  return (
    <div>
      <table className="w-full border-t border-blue-200">
        <tbody>
          <tr className="align-top">
            <td className="w-1/4 h-3"></td>
            <td className=""></td>
          </tr>
          {/*  */}
          <DataRow text="Apa saja fungsi badan air">
            <div className="pt-2">
            {constants.FungsiBadanAir.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.fungsiBadanAir?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.fungsiBadanAir;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            fungsiBadanAir: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          fungsiBadanAir: array.filter(item => item != val)
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
              defaultValue={model.fungsiBadanAir?.filter(i => !constants.FungsiBadanAir?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.fungsiBadanAir];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, fungsiBadanAir: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.fungsiBadanAir];
                if (val) {
                  setModel(prev => ({...prev,
                    fungsiBadanAir: [...array, val]
                  }))
                } else {
                  const legalItems = model.fungsiBadanAir?.filter(item => constants.FungsiBadanAir?.includes(item));
                  setModel(prev => ({...prev,
                    fungsiBadanAir: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          {/*  */}
          <DataRow text="Pola kegiatan tangkap ikan">
            <div className="pt-2">
            {constants.PolaKegiatan.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.polaKegiatan?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.polaKegiatan;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            polaKegiatan: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          polaKegiatan: array.filter(item => item != val)
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
          {/*  */}
          <DataRow text="Alat tangkap ikan yang biasa dipakai">
            <div className="pt-2">
            {constants.AlatTangkapIkan.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.alatTangkapIkan?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.alatTangkapIkan;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            alatTangkapIkan: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          alatTangkapIkan: array.filter(item => item != val)
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
              defaultValue={model.alatTangkapIkan?.filter(i => !constants.AlatTangkapIkan?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.alatTangkapIkan];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, alatTangkapIkan: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.alatTangkapIkan];
                if (val) {
                  setModel(prev => ({...prev,
                    alatTangkapIkan: [...array, val]
                  }))
                } else {
                  const legalItems = model.alatTangkapIkan?.filter(item => constants.AlatTangkapIkan?.includes(item));
                  setModel(prev => ({...prev,
                    alatTangkapIkan: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          {/*  */}
          <DataRowSelect
            text="Frekuensi tangkap ikan"
            isOwner={isOwner}
            value={model.frekuensiTangkapIkan}
            options={constants.FrekuensiTangkapIkan}
            onChange={e => setModel(m => ({...m, frekuensiTangkapIkan: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, frekuensiTangkapIkan: (v) }))
              if (v?.includes("Belum")) {
                setModel(m => ({...m, infofrekuensiTangkapIkan: "" }))
              }
            }}
          />
          {/*  */}
          <DataRowSelect
            text="Hasil tangkapan sekali pergi"
            isOwner={isOwner}
            value={model.hasilTangkapIkan}
            options={constants.HasilTangkapIkan}
            onChange={e => setModel(m => ({...m, hasilTangkapIkan: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, hasilTangkapIkan: (v) }))
              if (v?.includes("Belum")) {
                setModel(m => ({...m, infohasilTangkapIkan: "" }))
              }
            }}
          />
          {/*  */}
          <DataRowSelect
            text="Dampak pengendapan tailing"
            isOwner={isOwner}
            value={model.dampakTailing}
            options={constants.DampakTailing}
            onChange={e => setModel(m => ({...m, dampakTailing: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, dampakTailing: (v) }))
              if (v?.includes("Belum")) {
                setModel(m => ({...m, infodampakTailing: "" }))
              }
            }}
          />
          {(model.dampakTailing?.includes("cukup")
          || model.dampakTailing?.includes("sangat"))
          && <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasan gangguan</p>}
            isOwner={isOwner}
            value={model.infoDampakTailing}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoDampakTailing: (e.target.value) }))}
          />}
          {/*  */}
          <DataRowSelect
            text="Perbedaan hasil tangkapan"
            isOwner={isOwner}
            value={model.perbedaanHasil}
            options={constants.PerbedaanHasil}
            onChange={e => setModel(m => ({...m, perbedaanHasil: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, perbedaanHasil: (v) }))
              if (v?.includes("Belum")) {
                setModel(m => ({...m, infoperbedaanHasil: "" }))
              }
            }}
          />
          {(model.perbedaanHasil?.includes("Ada"))
          && <DataRowInput
            text={<p className="text-blue-500">&#10148; Jelaskan perbedaannya</p>}
            isOwner={isOwner}
            value={model.infoPerbedaanHasil}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoPerbedaanHasil: (e.target.value) }))}
          />}
          {/*  */}
          <DataRow text="Bantuan PTFI yang pernah diterima">
            <div className="pt-2">
            {constants.BantuanPTFI.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.bantuanPTFI?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.bantuanPTFI;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            bantuanPTFI: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          bantuanPTFI: array.filter(item => item != val)
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
              defaultValue={model.bantuanPTFI?.filter(i => !constants.BantuanPTFI?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.bantuanPTFI];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, bantuanPTFI: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.bantuanPTFI];
                if (val) {
                  setModel(prev => ({...prev,
                    bantuanPTFI: [...array, val]
                  }))
                } else {
                  const legalItems = model.bantuanPTFI?.filter(item => constants.BantuanPTFI?.includes(item));
                  setModel(prev => ({...prev,
                    bantuanPTFI: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          {/*  */}
          <DataRowSelect
            text="Apakah hasil tangkapan dijual?"
            isOwner={isOwner}
            value={model.menjualHasilTangkapan}
            options={constants.YaTidak}
            onChange={e => setModel(m => ({...m, menjualHasilTangkapan: (e.target.value) }))}
          />
          {/*  */}
          {model.menjualHasilTangkapan == "Ya" && <DataRow text={<p className="text-blue-500">&#10148; Kemana menjualnya?</p>}>
            <div className="pt-2">
            {constants.PembeliHasilTangkapan.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.pembeliHasilTangkapan?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.pembeliHasilTangkapan;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            pembeliHasilTangkapan: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          pembeliHasilTangkapan: array.filter(item => item != val)
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
              defaultValue={model.pembeliHasilTangkapan?.filter(i => !constants.PembeliHasilTangkapan?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.pembeliHasilTangkapan];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, pembeliHasilTangkapan: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.pembeliHasilTangkapan];
                if (val) {
                  setModel(prev => ({...prev,
                    pembeliHasilTangkapan: [...array, val]
                  }))
                } else {
                  const legalItems = model.pembeliHasilTangkapan?.filter(item => constants.PembeliHasilTangkapan?.includes(item));
                  setModel(prev => ({...prev,
                    pembeliHasilTangkapan: legalItems
                  }))
                }
              }}
            />
          </DataRow>}
          {/*  */}
          <DataRow text="Harapan untuk PTFI">
            <div className="pt-2">
            {constants.HarapanUntukPTFI.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.harapanUntukPTFI?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.harapanUntukPTFI;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            harapanUntukPTFI: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          harapanUntukPTFI: array.filter(item => item != val)
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
              defaultValue={model.harapanUntukPTFI?.filter(i => !constants.HarapanUntukPTFI?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.harapanUntukPTFI];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, harapanUntukPTFI: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.harapanUntukPTFI];
                if (val) {
                  setModel(prev => ({...prev,
                    harapanUntukPTFI: [...array, val]
                  }))
                } else {
                  const legalItems = model.harapanUntukPTFI?.filter(item => constants.HarapanUntukPTFI?.includes(item));
                  setModel(prev => ({...prev,
                    harapanUntukPTFI: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          {/*  */}
          {isOwner &&
          <DataRow text={<></>}>
            <div className="pt-4">
              {!isDirty() && <button className="btnSubSectionDisabled">Save</button>}
              {isDirty() && <button onClick={saveData} className="btnSubSection">Save</button>}
            </div>
          </DataRow>}
        </tbody>
      </table>
      {/* <pre>{JSON.stringify(model, null, 2)}</pre> */}
    </div>
  )
}
