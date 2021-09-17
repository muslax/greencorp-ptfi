import DataRow, { DataRowInput, DataRowMultiline, DataRowSelect } from "components/DataRow";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import useLintasAir from "hooks/useLintasAir";
import { ModelLintasAir } from "lib/models";

export default function LintasAir({ user, constants, responden, isOwner }) {
  const { lintasAir, loadingLintasAir, mutateLintasAir } = useLintasAir(responden._id);

  const [model, setModel] = useState(ModelLintasAir);

  useEffect(() => {
    if (lintasAir) setModel(lintasAir);
  }, [lintasAir])

  if (loadingLintasAir) return null;

  async function saveData(e) {
    try {
      await fetchJson("/api/post?q=save-lintas-air", generatePOSTData(model))
      mutateLintasAir()
    } catch (error) {
      console.log("ERROR")
    }
  }

  function isDirty() {
    const a = {...model};
    delete a._id; delete a._rid;
    const b = {...lintasAir};
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
            text="Frekuensi menggunakan perahu"
            isOwner={isOwner}
            value={model.frekuensiPerjalanan}
            options={constants.FrekuensiPerjalananAir}
            onChange={e => {
              setModel(m => ({...m, frekuensiPerjalanan: (e.target.value) }))
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
            text="Keperluan perjalanan"
            isOwner={isOwner}
            value={model.keperluanPerjalanan}
            placeholder=""
            onChange={e => setModel(m => ({...m, keperluanPerjalanan: (e.target.value) }))}
          />
          {(model.menggunakanBusPTFI != "" && model.menggunakanBusPTFI?.includes("Tidak")) && <DataRowInput
            text={<p className="text-blue-500">&#10148; Biasanya menggunakan angkutan apa?</p>}
            isOwner={isOwner}
            value={model.infoTanpaBusPTFI}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoTanpaBusPTFI: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Rona perbedaan akibat tailing"
            isOwner={isOwner}
            value={model.dampakTailing}
            options={constants.PerbedaanRonaPerjalanan}
            onChange={e => {
              setModel(m => ({...m, dampakTailing: (e.target.value) }))
            }}
          />

          <DataRow text="Harapan untuk PTFI">
            <div className="pt-2">
            {constants.BantuanSaranaAirPTFI?.map(m => (
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
              defaultValue={model.bantuanPTFI?.filter(i => !constants.BantuanSaranaAirPTFI?.includes(i))[0] || ""}
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
                  const legalItems = model.bantuanPTFI?.filter(item => constants.BantuanSaranaAirPTFI?.includes(item));
                  setModel(prev => ({...prev,
                    bantuanPTFI: legalItems
                  }))
                }
              }}
            />
          </DataRow>

          <DataRowSelect
            text="Frekuensi menggunakan kapal Manasari-Pomako"
            isOwner={isOwner}
            value={model.frekuensiManasariPomako}
            options={constants.FrekuensiManasariPomako}
            onChange={e => {
              setModel(m => ({...m, frekuensiManasariPomako: (e.target.value) }))
            }}
          />

          <DataRow text="Alasan tidak menggunakan kapal PTFI">
            <div className="pt-2">
            {constants.SebabNonKapalPTFI?.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.alasanTanpaKapalPTFI?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.alasanTanpaKapalPTFI;
                      if (e.target.checked) {
                        if (!array?.includes[val]) {
                          setModel(prev => ({...prev,
                            alasanTanpaKapalPTFI: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          alasanTanpaKapalPTFI: array.filter(item => item != val)
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
              defaultValue={model.alasanTanpaKapalPTFI?.filter(i => !constants.SebabNonKapalPTFI?.includes(i))[0] || ""}
              onFocus={e => {
                const array = [...model.alasanTanpaKapalPTFI];
                const index = array.indexOf(e.target.value);
                if (index >= 0) array.splice(index, 1);
                setModel(prev => ({ ...prev, alasanTanpaKapalPTFI: array }));
              }}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = [...model.alasanTanpaKapalPTFI];
                if (val) {
                  setModel(prev => ({...prev,
                    alasanTanpaKapalPTFI: [...array, val]
                  }))
                } else {
                  const legalItems = model.alasanTanpaKapalPTFI?.filter(item => constants.SebabNonKapalPTFI?.includes(item));
                  setModel(prev => ({...prev,
                    alasanTanpaKapalPTFI: legalItems
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
      {/* <pre>{JSON.stringify(model, null, 2)}</pre> */}
    </div>
  )
}

/*
"FrekuensiPerjalananAir": [],
"PerbedaanRonaPerjalanan": [],
"BantuanSaranaAirPTFI": [],
"FrekuensiManasariPomako": [],
"SebabNonKapalPTFI": []

{
  "_id": "6144e97511289945d2a56b36",
  "_rid": "614481758677c305c8cd728e",
  "menggunakanBusPTFI": "",
  "selainBusPTFI": "",
  "infoTanpaBusPTFI": "",
  "bantuanPTFI": "",
  "ketepatanBantuan": "",
  "infoKetepatanBantuan": "",
  "tanggapanTanggul": "",
  "harapanUntukPTFI": "",
  "harapanUntukPemda": []
}
{
  "_id": "6144e97511289945d2a56b37",
  "_rid": "614481758677c305c8cd728e",
  "frekuensiPerjalanan": "",
  "keperluanPerjalanan": "",
  "dampakTailing": [],
  "bantuanPTFI": [],
  "frekuensiManasariPomako": "",
  "alasanTanpaKapalPTFI": [],
  "kapalNonPTFI": "",
}

*/