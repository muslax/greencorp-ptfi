import DataRow, { DataRowInput, DataRowMultiline, DataRowSelect } from "components/DataRow";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import useNayaro from "hooks/useNayaro";
import { ModelNayaro } from "lib/models";
import useConstants from "hooks/useConstants";

export default function Nayaro({ user, responden, isOwner }) {
  const { nayaro, loadingNayaro, mutateNayaro } = useNayaro(responden._id);
  const { constants } = useConstants("NAYARO");

  const [model, setModel] = useState(ModelNayaro);

  useEffect(() => {
    if (nayaro) setModel(nayaro);
  }, [nayaro])

  if (loadingNayaro || !constants) return null;

  async function saveData(e) {
    try {
      await fetchJson("/api/post?q=save-nayaro", generatePOSTData(model))
      mutateNayaro()
    } catch (error) {
      console.log("ERROR")
    }
  }

  function isDirty() {
    const a = {...model};
    delete a._id; delete a._rid;
    const b = {...nayaro};
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
          <DataRowSelect
            text="Rona perbedaan umum"
            isOwner={isOwner}
            value={model.ronaUmum}
            options={constants.RonaUmum}
            onChange={e => {
              setModel(m => ({...m, ronaUmum: (e.target.value) }))
              // if (e.target.value == "") {
              //   setModel(m => ({
              //     ...m,
              //     selainBusPTFI: "",
              //     infoTanpaBusPTFI: "",
              //   }))
              // }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoRonaUmum}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoRonaUmum: (e.target.value) }))}
          />
          <DataRowSelect
            text="Rona hasil tangkapan"
            isOwner={isOwner}
            value={model.RonaHasilTangkapan}
            options={constants.RonaUmum}
            onChange={e => {
              setModel(m => ({...m, ronaHasilTangkapan: (e.target.value) }))
              // if (e.target.value == "") {
              //   setModel(m => ({
              //     ...m,
              //     selainBusPTFI: "",
              //     infoTanpaBusPTFI: "",
              //   }))
              // }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoRonaHasilTangkapan}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoRonaHasilTangkapan: (e.target.value) }))}
          />
          <DataRow text="Jenis-jenis kesulitan">
            <div className="pt-2">
            {constants.JenisKesulitan.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.jenisKesulitan?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.jenisKesulitan;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            jenisKesulitan: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          jenisKesulitan: array.filter(item => item != val)
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
              defaultValue={model.jenisKesulitan?.filter(i => !constants.JenisKesulitan?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.jenisKesulitan];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, jenisKesulitan: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.jenisKesulitan];
                if (val) {
                  setModel(prev => ({...prev,
                    jenisKesulitan: [...array, val]
                  }))
                } else {
                  const legalItems = model.jenisKesulitan?.filter(item => constants.JenisKesulitan?.includes(item));
                  setModel(prev => ({...prev,
                    jenisKesulitan: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoJenisKesulitan}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoJenisKesulitan: (e.target.value) }))}
          />
          <DataRow text="Jika tailing semakin meningkat">
            <div className="pt-2">
            {constants.JikaTailingMeningkat.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.jikaTailingMeningkat?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.jikaTailingMeningkat;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            jikaTailingMeningkat: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          jikaTailingMeningkat: array.filter(item => item != val)
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
              defaultValue={model.jikaTailingMeningkat?.filter(i => !constants.JikaTailingMeningkat?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.jikaTailingMeningkat];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, jikaTailingMeningkat: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.jikaTailingMeningkat];
                if (val) {
                  setModel(prev => ({...prev,
                    jikaTailingMeningkat: [...array, val]
                  }))
                } else {
                  const legalItems = model.jikaTailingMeningkat?.filter(item => constants.JikaTailingMeningkat?.includes(item));
                  setModel(prev => ({...prev,
                    jikaTailingMeningkat: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          <DataRowSelect
            text="Jika tanggul diperpanjang"
            isOwner={isOwner}
            value={model.jikaTanggulDiperpanjang}
            options={constants.JikaTanggulDiperpanjang}
            onChange={e => {
              setModel(m => ({...m, jikaTanggulDiperpanjang: (e.target.value) }))
              // if (e.target.value == "") {
              //   setModel(m => ({
              //     ...m,
              //     selainBusPTFI: "",
              //     infoTanpaBusPTFI: "",
              //   }))
              // }
            }}
          />
          <DataRowSelect
            text="Kesediaan merubah pencaharian"
            isOwner={isOwner}
            value={model.merubahPencaharian}
            options={constants.MerubahPencaharian}
            onChange={e => {
              setModel(m => ({...m, merubahPencaharian: (e.target.value) }))
              // if (e.target.value == "") {
              //   setModel(m => ({
              //     ...m,
              //     selainBusPTFI: "",
              //     infoTanpaBusPTFI: "",
              //   }))
              // }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Alasannya</p>}
            isOwner={isOwner}
            value={model.alasanMerubahPencaharian}
            placeholder=""
            onChange={e => setModel(m => ({...m, alasanMerubahPencaharian: (e.target.value) }))}
          />
          <DataRowSelect
            text="Kesediaan mengikuti pelatihan"
            isOwner={isOwner}
            value={model.mengikutiPelatihan}
            options={constants.MengikutiPelatihan}
            onChange={e => {
              setModel(m => ({...m, mengikutiPelatihan: (e.target.value) }))
              // if (e.target.value == "") {
              //   setModel(m => ({
              //     ...m,
              //     selainBusPTFI: "",
              //     infoTanpaBusPTFI: "",
              //   }))
              // }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Pelatihan apa?</p>}
            isOwner={isOwner}
            value={model.pelatihanDiinginkan}
            placeholder=""
            onChange={e => setModel(m => ({...m, pelatihanDiinginkan: (e.target.value) }))}
          />
          <DataRowSelect
            text="Mengikuti pelatihan nelayan?"
            isOwner={isOwner}
            value={model.pelatihanNelayan}
            options={constants.PelatihanNelayan}
            onChange={e => {
              setModel(m => ({...m, pelatihanNelayan: (e.target.value) }))
              // if (e.target.value == "") {
              //   setModel(m => ({
              //     ...m,
              //     selainBusPTFI: "",
              //     infoTanpaBusPTFI: "",
              //   }))
              // }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Alasannya</p>}
            isOwner={isOwner}
            value={model.infoPelatihanNelayan}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoPelatihanNelayan: (e.target.value) }))}
          />
          <DataRow text="Bantuan yg telah diberikan PTFI">
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
                  const legalItems = model.bantuanPTFI?.filter(item => constants.JikaTailingMeningkat?.includes(item));
                  setModel(prev => ({...prev,
                    bantuanPTFI: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          <DataRow text="Bantuan yg telah diberikan PTFI">
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
          <DataRow text="Bantuan yg telah diberikan Pemda">
            <div className="pt-2">
            {constants.HarapanUntukPemda.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.harapanUntukPemda?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.harapanUntukPemda;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            harapanUntukPemda: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          harapanUntukPemda: array.filter(item => item != val)
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
              defaultValue={model.harapanUntukPemda?.filter(i => !constants.HarapanUntukPemda?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.harapanUntukPemda];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, harapanUntukPemda: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.harapanUntukPemda];
                if (val) {
                  setModel(prev => ({...prev,
                    harapanUntukPemda: [...array, val]
                  }))
                } else {
                  const legalItems = model.harapanUntukPemda?.filter(item => constants.HarapanUntukPemda?.includes(item));
                  setModel(prev => ({...prev,
                    harapanUntukPemda: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          {isOwner &&
          <DataRow text={<></>}>
            <div className="pt-4">
              {!isDirty() && <button className="btnSubSectionDisabled">Save</button>}
              {isDirty() && <button onClick={saveData} className="btnSubSection">Save</button>}
            </div>
          </DataRow>}
        </tbody>
      </table>
      <pre>{JSON.stringify(model, null, 2)}</pre>
    </div>
  )
}