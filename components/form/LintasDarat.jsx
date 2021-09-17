import DataRow, { DataRowInput, DataRowMultiline, DataRowSelect } from "components/DataRow";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import useLintasDarat from "hooks/useLintasDarat";
import { ModelLintasDarat } from "lib/models";

export default function LintasDarat({ user, constants, responden, isOwner }) {
  const { lintasDarat, loadingLintasDarat, mutateLintasDarat } = useLintasDarat(responden._id);

  const [model, setModel] = useState(ModelLintasDarat);

  useEffect(() => {
    if (lintasDarat) setModel(lintasDarat);
  }, [lintasDarat])

  if (loadingLintasDarat) return null;

  async function saveData(e) {
    try {
      await fetchJson("/api/post?q=save-lintas-darat", generatePOSTData(model))
      mutateLintasDarat()
    } catch (error) {
      console.log("ERROR")
    }
  }

  function isDirty() {
    const a = {...model};
    delete a._id; delete a._rid;
    const b = {...lintasDarat};
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
            text="Frekuensi menggunakan bus PTFI"
            isOwner={isOwner}
            value={model.menggunakanBusPTFI}
            options={constants.FrekuensiPerjalananDarat}
            onChange={e => {
              setModel(m => ({...m, menggunakanBusPTFI: (e.target.value) }))
              if (e.target.value == "") {
                setModel(m => ({
                  ...m,
                  selainBusPTFI: "",
                  infoTanpaBusPTFI: "",
                }))
              }
            }}
          />
          {(model.menggunakanBusPTFI != "" && !model.menggunakanBusPTFI?.includes("Tidak")) && <DataRowInput
            text={<p className="text-blue-500">&#10148; Kendaraan selain bus PTFI</p>}
            isOwner={isOwner}
            value={model.selainBusPTFI}
            placeholder=""
            onChange={e => setModel(m => ({...m, selainBusPTFI: (e.target.value) }))}
          />}
          {(model.menggunakanBusPTFI != "" && model.menggunakanBusPTFI?.includes("Tidak")) && <DataRowInput
            text={<p className="text-blue-500">&#10148; Biasanya menggunakan angkutan apa?</p>}
            isOwner={isOwner}
            value={model.infoTanpaBusPTFI}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoTanpaBusPTFI: (e.target.value) }))}
          />}
          <DataRowInput
            text="Bantuan PYFI (terkait transportasi darat)"
            isOwner={isOwner}
            value={model.bantuanPTFI}
            placeholder=""
            onChange={e => setModel(m => ({...m, bantuanPTFI: (e.target.value) }))}
          />
          <DataRowSelect
            text="Sudah tepatkah bantuan PTFI"
            isOwner={isOwner}
            value={model.ketepatanBantuan}
            options={constants.KetepatanBatuanDarat}
            onChange={e => {
              setModel(m => ({...m, ketepatanBantuan: (e.target.value) }))
            }}
          />
          <DataRowSelect
            text="Sikap thd rencana perpanjangan tanggul"
            isOwner={isOwner}
            value={model.tanggapanTanggul}
            options={constants.SikapTanggul}
            onChange={e => {
              setModel(m => ({...m, tanggapanTanggul: (e.target.value) }))
            }}
          />
          <DataRow text="Harapan untuk PTFI">
            <textarea
              rows={3}
              value={model.harapanUntukPTFI}
              className="w-full mt-1"
              onChange={e => {
                setModel(m => ({...m, harapanUntukPTFI: (e.target.value) }))
              }}
            ></textarea>
          </DataRow>
          <DataRow text="Harapan untuk Pemda">
            <div className="pt-2">
            {constants.HarapanUntukPemdaSoalPerjalanan.map(m => (
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
              defaultValue={model.harapanUntukPemda?.filter(i => !constants.HarapanUntukPemdaSoalPerjalanan?.includes(i))[0] || ""}
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
                  const legalItems = model.harapanUntukPemda?.filter(item => constants.HarapanUntukPemdaSoalPerjalanan?.includes(item));
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
      {/* <pre>{JSON.stringify(model, null, 2)}</pre> */}
    </div>
  )
}

/*
"FrekuensiPerjalananDarat": [],
"KetepatanBatuanDarat": [],
"SikapTanggul": [],
"HarapanUntukPemdaSoalPerjalanan": [],
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