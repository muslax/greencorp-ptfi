import DataRow, { DataRowInput, DataRowMultiline, DataRowSelect } from "components/DataRow";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import PersepsiModel from "lib/persepsi";
import usePersepsi from "hooks/usePersepsi";
import KesmasModel from "lib/kesmas";

export default function Persepsi({ user, constants, responden, isOwner }) {
  const { persepsi, loadingPersepsi, mutatePersepsi } = usePersepsi(responden._id);

  const [model, setModel] = useState(PersepsiModel);

  useEffect(() => {
    if (persepsi) setModel(persepsi);
  }, [persepsi])

  if (loadingPersepsi) return null;

  async function saveData(e) {
    try {
      await fetchJson("/api/post?q=save-persepsi", generatePOSTData(model))
      mutatePersepsi()
    } catch (error) {
      console.log("ERROR")
    }
  }

  function isDirty() {
    const a = {...model};
    delete a._id; delete a._rid;
    const b = {...persepsi};
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
          <DataRowSelect
            text="Tentang rencana kegiatan PTFI"
            isOwner={isOwner}
            value={model.tahuRencana}
            options={constants.Mengetahui}
            onChange={e => setModel(m => ({...m, tahuRencana: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, tahuRencana: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, sumberInformasi: "" }))
              }
            }}
          />
          {model?.tahuRencana?.includes("Sudah") &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Dari mana sumbernya</p>}
            isOwner={isOwner}
            value={model.sumberInformasi}
            placeholder=""
            onChange={e => setModel(m => ({...m, sumberInformasi: (e.target.value) }))}
          />}
          {/*  */}
          <DataRow text="Dampak umum 50 tahun PTFI">
            <div className="pt-2">
            {constants.DampakUmum.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.dampakUmum?.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.dampakUmum;
                      if (e.target.checked) {
                        if (!array.includes[val]) {
                          setModel(prev => ({...prev,
                            dampakUmum: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          dampakUmum: array.filter(item => item != val)
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
              defaultValue={model.dampakUmum.filter(i => !constants.DampakUmum.includes(i))[0] || ""}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = model.dampakUmum;
                if (val) {
                  setModel(prev => ({...prev,
                    dampakUmum: [...array, val]
                  }))
                } else {
                  const legalItems = model.dampakUmum
                    .filter(item => constants.DampakUmum.includes(item));
                  setModel(prev => ({...prev,
                    dampakUmum: legalItems
                  }))
                }
              }}
            />
          </DataRow>
          {/* */}
          <DataRowSelect
            text="Proyek menjadi peluang yang ..."
            isOwner={isOwner}
            value={model.peluangDanMinat}
            options={constants.Diminati}
            onChange={e => setModel(m => ({...m, peluangDanMinat: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, peluangDanMinat: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infoPeluangDanMinat: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Alasannya</p>}
            isOwner={isOwner}
            value={model.infoPeluangDanMinat}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoPeluangDanMinat: (e.target.value) }))}
          />
          {/* */}
          <DataRowSelect
            text="Bila ada peluang, mana yang dipilih"
            isOwner={isOwner}
            value={model.pilihanKerja}
            options={constants.PilihanLapanganPekerjaan}
            onChange={e => setModel(m => ({...m, pilihanKerja: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, pilihanKerja: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infoPilihanKerja: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Alasannya</p>}
            isOwner={isOwner}
            value={model.infoPilihanKerja}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoPilihanKerja: (e.target.value) }))}
          />
          {/* */}
          <DataRowSelect
            text="Dampak-dampak lingkungan PTFI"
            isOwner={isOwner}
            value={model.dampakLingkungan}
            options={constants.DampakLingkungan}
            onChange={e => setModel(m => ({...m, dampakLingkungan: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, dampakLingkungan: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infoDampakLingkungan: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoDampakLingkungan}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoDampakLingkungan: (e.target.value) }))}
          />
          {/* */}
          <DataRowSelect
            text="Dampak-dampak kesehatan PTFI"
            isOwner={isOwner}
            value={model.dampakKesehatan}
            options={constants.DampakKesehatan}
            onChange={e => setModel(m => ({...m, dampakKesehatan: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, dampakKesehatan: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infoDampakKesehatan: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoDampakKesehatan}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoDampakKesehatan: (e.target.value) }))}
          />
          {/* */}
          <DataRowSelect
            text="Dampak infrastruktur & layanan publik"
            isOwner={isOwner}
            value={model.dampakLayananPublik}
            options={constants.DampakLayananPublik}
            onChange={e => setModel(m => ({...m, dampakLayananPublik: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, dampakLayananPublik: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infoLampakLayananPublik: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoLampakLayananPublik}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoLampakLayananPublik: (e.target.value) }))}
          />
          {/* */}
          <DataRowSelect
            text="Dampak terhadap adat istiadat"
            isOwner={isOwner}
            value={model.dampakAdat}
            options={constants.DampakAdat}
            onChange={e => setModel(m => ({...m, dampakAdat: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, dampakAdat: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infoDampakAdat: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoDampakAdat}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoDampakAdat: (e.target.value) }))}
          />
          {/* */}
          <DataRowSelect
            text="Pertemuan, gotong-royong dsb."
            isOwner={isOwner}
            value={model.gotongRoyong}
            options={constants.GotongRoyong}
            onChange={e => setModel(m => ({...m, gotongRoyong: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, gotongRoyong: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infoGotongRoyong: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoGotongRoyong}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoGotongRoyong: (e.target.value) }))}
          />
          {/* */}
          <DataRowSelect
            text="Sikap terhadap rencana PTFI"
            isOwner={isOwner}
            value={model.sikap}
            options={constants.Sikap}
            onChange={e => setModel(m => ({...m, sikap: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, sikap: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infosikap: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoSikap}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoSikap: (e.target.value) }))}
          />
          {/* */}
          <DataRowSelect
            text="Dampak kesulitan sehari-hari"
            isOwner={isOwner}
            value={model.dampakKesulitan}
            options={constants.DampakKesulitan}
            onChange={e => setModel(m => ({...m, dampakKesulitan: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, dampakKesulitan: (v) }))
              if (v.includes("Belum")) {
                setModel(m => ({...m, infoDampakKesulitan: "" }))
              }
            }}
          />
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Penjelasannya</p>}
            isOwner={isOwner}
            value={model.infoDampakKesulitan}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoDampakKesulitan: (e.target.value) }))}
          />
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
      <pre>{JSON.stringify(model, null, 2)}</pre>
    </div>
  )
}
/*

"Mengetahui": [],
"DampakPTFI": [],
"Diminati": [],
"PilihanLapanganPekerjaan": [],
"DampakLingkungan": [],
"DampakKesehatan": [],
"DampakLayananPublik": [],
"DampakAdat": [],
"GotongRoyong": [],
"Dukungan": [],
"DampakKesulitan": []


*/