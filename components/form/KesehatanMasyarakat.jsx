import DataRow, { DataRowInput, DataRowMultiline, DataRowSelect } from "components/DataRow";
import useKlaimAdat from "hooks/useKlaimAdat";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import { useEffect, useState } from "react";
import { isEqual } from "lodash";
import useKesmas from "hooks/useKesmas";
import KesmasModel from "lib/kesmas";

function getKesmasFields(o) {
  return {
    respondenSakit: o ? o.respondenSakit : "",
    penyakitResponden: o ? o.penyakitResponden : "", // [] line array
    anggotaSakit: o ? o.anggotaSakit : "",
    penyakitAnggota: o ? o.penyakitAnggota : "", // [] line array
    stunting: o ? o.stunting : "",
    sebabStunting: o ? o.sebabStunting : "", // [] line array
    wabah: o ? o.wabah : "",
    infoWabah: o ? o.infoWabah : "", // [] line array
    //
    tempatBerobat: o ? o.tempatBerobat : [],
    alasanKeDukun: o ? o.alasanKeDukun : "", // [] line array
    aksesBerobat: o ? o.aksesBerobat : "",
    infoAksesBerobat: o ? o.infoAksesBerobat : "",
    asuransiKesehatan: o ? o.asuransiKesehatan : "",
    infoAsuransiKesehatan: o ? o.infoAsuransiKesehatan : "",
    kelayakanFaskes: o ? o.kelayakanFaskes : "",
    infoKelayakanFaskes: o ? o.infoKelayakanFaskes : "",
    layananPTFI: o ? o.layananPTFI : "",
    pernahLayananPTFI: o ? o.pernahLayananPTFI : "",
    infoLayananPTFI: o ? o.infoLayananPTFI : "",
    sumberAirMinum: o ? o.sumberAirMinum : [],
    merebusAir: o ? o.merebusAir : "",
    konsumsiAir: o ? o.konsumsiAir : "",
    sumberAirBersih: o ? o.sumberAirBersih : [],
    masalahAir: o ? o.masalahAir : [],
    solusiMasalahAir: o ? o.solusiMasalahAir : "",
    saranaBAB: o ? o.saranaBAB : "",
    infoSaranaBAB: o ? o.infoSaranaBAB : "",
    saranaAirLimbah: o ? o.saranaAirLimbah : "",
    kelolaSampah: o ? o.kelolaSampah : "",
    //
    genanganAir: o ? o.genanganAir : "",
    nyamukDiGenangan: o ? o.nyamukDiGenangan : "",
    indikasiVektor: o ? o.indikasiVektor : "",
    kebersihanRumah: o ? o.kebersihanRumah : "",
    komunitasSampah: o ? o.komunitasSampah : "", // [] line array
    //
    plafon: o ? o.plafon : "",
    dinding: o ? o.dinding : "",
    lantai: o ? o.lantai : "",
    jendelaKamar: o ? o.jendelaKamar : "",
    jendelaRuang: o ? o.jendelaRuang : "",
    ventilasi: o ? o.ventilasi : "",
    pencahayaan: o ? o.pencahayaan : "",
    //
    caraCegahMalaria: o ? o.caraCegahMalaria : [],
    konsumsiSayur: o ? o.konsumsiSayur : "",
    olahraga: o ? o.olahraga : "",
    menjagaKebersihanDiri: o ? o.menjagaKebersihanDiri : [],
    perokok: o ? o.perokok : "",
    tempatMerokok: o ? o.tempatMerokok : "",
    konsumsiMiras: o ? o.konsumsiMiras : "",
    frekuensiMiras: o ? o.frekuensiMiras : "",
    dampakMiras: o ? o.dampakMiras : [],
  }
}

export default function KesehatanMasyarakat({ user, constants, responden, isOwner }) {
  const { kesmas, loadingKesmas, mutateKesmas } = useKesmas(responden._id)

  const [model, setModel] = useState(KesmasModel)
  const [sumberAirMinum, setSumberAirMinum] = useState("")
  const [sumberAirBersih, setSumberAirBersih] = useState("")
  const [saranaBAB, setSaranaBAB] = useState("")
  const [pembuanganAirLimbah, setPembuanganAirLimbah] = useState("")
  const [pengelolaanSampah, setPengelolaanSampah] = useState("")

  useEffect(() => {
    if (kesmas) setModel(kesmas);
  }, [kesmas])

  async function saveData(e) {
    try {
      await fetchJson("/api/post?q=save-kesmas", generatePOSTData(model))
      mutateKesmas()
    } catch (error) {
      console.log("ERROR")
    }
  }

  function isDirty() {
    return !isEqual(getKesmasFields(model), getKesmasFields(kesmas));
  }

  if (loadingKesmas) return null;

  return (
    <div>
      <table className="w-full border-t border-blue-200">
        <tbody>
          <tr className="align-top">
            <td className="w-1/4 h-3"></td>
            <td className=""></td>
          </tr>
          <DataRowSelect
            text="Responden pernah sakit"
            isOwner={isOwner}
            value={model.respondenSakit}
            options={constants.Pernah}
            onChange={e => setModel(m => ({...m, respondenSakit: (e.target.value) }))}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, respondenSakit: (v) }))
              if (v != "Ada") {
                setModel(m => ({...m, penyakitResponden: "" }))
              }
            }}
          />
          {model.respondenSakit == "Pernah" &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Bila pernah, sebutkan</p>}
            isOwner={isOwner}
            value={model.penyakitResponden}
            placeholder="Pisahkan dengan tanda koma"
            onChange={e => setModel(m => ({...m, penyakitResponden: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Anggota keluarga sakit"
            isOwner={isOwner}
            value={model.anggotaSakit}
            options={constants.Pernah}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, anggotaSakit: (v) }))
              if (v != "Ada") {
                setModel(m => ({...m, penyakitAnggota: "" }))
              }
            }}
          />
          {model.anggotaSakit == "Pernah" &&
            <DataRowInput
            text={<p className="text-blue-500">&#10148; Bila pernah, sebutkan</p>}
            isOwner={isOwner}
            value={model.penyakitAnggota}
            placeholder="Pisahkan dengan tanda koma"
            onChange={e => setModel(m => ({...m, penyakitAnggota: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Anggota yang menderita stunting"
            isOwner={isOwner}
            value={model.stunting}
            options={constants.Ada}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, stunting: (v) }))
              if (v != "Ada") {
                setModel(m => ({...m, sebabStunting: "" }))
              }
            }}
          />
          {model.stunting == "Ada" &&
          <DataRowMultiline
            text={<p className="text-blue-500">&#10148; Bila ada, sebutkan</p>}
            isOwner={isOwner}
            value={model.sebabStunting}
            placeholder="Satu sebab satu baris"
            onChange={e => setModel(m => ({...m, sebabStunting: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Wabah 5 tahun terakhir"
            isOwner={isOwner}
            value={model.wabah}
            options={constants.Pernah}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, wabah: (v) }))
              if (v != "Ada") {
                setModel(m => ({...m, infoWabah: "" }))
              }
            }}
          />
          {model.wabah == "Pernah" &&
          <DataRowMultiline
            text={<p className="text-blue-500">&#10148; Bila pernah, sebutkan</p>}
            isOwner={isOwner}
            value={model.infoWabah}
            placeholder="Satu sebab satu baris"
            onChange={e => setModel(m => ({...m, infoWabah: (e.target.value) }))}
          />}

          <tr className="align-top">
            <td colSpan="2" className="pb-2">
              <p className="text-base font-bold pt-4 pb-1">
                Sarana kesehatan
              </p>
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRowSelect
            text="Kemana biasa berobat"
            isOwner={isOwner}
            value={model.tempatBerobat}
            options={constants.KebiasaanBerobat}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, tempatBerobat: (v) }))
              // if (v != "Ada") {
              //   setModel(m => ({...m, tempatBerobat: "" }))
              // }
            }}
          />
          {model.tempatBerobat.includes("dukun") &&
          <DataRowMultiline
            text={<p className="text-blue-500">&#10148; Alasan ke dukun</p>}
            isOwner={isOwner}
            value={model.alasanKeDukun}
            placeholder="Satu sebab satu baris"
            onChange={e => setModel(m => ({...m, alasanKeDukun: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Tempat berobat terjangkau"
            isOwner={isOwner}
            value={model.aksesBerobat}
            options={constants.YaTidak}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, aksesBerobat: (v) }))
              // if (v != "Ada") {
              //   setModel(m => ({...m, aksesBerobat: "" }))
              // }
            }}
          />
          {model.aksesBerobat == "Tidak" &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Kenapa?</p>}
            isOwner={isOwner}
            value={model.infoAksesBerobat}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoAksesBerobat: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Memiliki KIS, BPJS, dan semacamnya?"
            isOwner={isOwner}
            value={model.asuransiKesehatan}
            options={constants.YaTidak}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, asuransiKesehatan: (v) }))
              if (v != "Ada") {
                setModel(m => ({...m, infoAsuransiKesehatan: "" }))
              }
            }}
          />
          {model.asuransiKesehatan == "Ya" &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Tolong sebutkan</p>}
            isOwner={isOwner}
            value={model.infoAsuransiKesehatan}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoAsuransiKesehatan: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Kualitas faskes di desa/kecamatan"
            isOwner={isOwner}
            value={model.kelayakanFaskes}
            options={constants.KondisiFaskes}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, kelayakanFaskes: (v) }))
              if (v != "Ada") {
                setModel(m => ({...m, infoKelayakanFaskes: "" }))
              }
            }}
          />
          {(model.kelayakanFaskes.includes("Kurang") || model.kelayakanFaskes.includes("Tidak")) &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Apa sebabnya?</p>}
            isOwner={isOwner}
            value={model.infoKelayakanFaskes}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoKelayakanFaskes: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Tentang layanan kesehatan PTFI"
            isOwner={isOwner}
            value={model.layananPTFI}
            options={constants.Tahu}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, layananPTFI: (v) }))
              if (v != "Ada") {
                setModel(m => ({...m, pernahLayananPTFI: "" }))
              }
            }}
          />
          {(model.layananPTFI == "Tahu") &&
          <DataRowSelect
            text="Pernah memanfaatkan layanan tsb?"
            isOwner={isOwner}
            value={model.pernahLayananPTFI}
            options={constants.Pernah}
            onChange={e => {
              const v = e.target.value
              setModel(m => ({...m, pernahLayananPTFI: (v) }))
              if (v != "Ada") {
                setModel(m => ({...m, infoLayananPTFI: "" }))
              }
            }}
          />}
          {(model.pernahLayananPTFI == "Pernah") &&
          <DataRowMultiline
            text={<p className="text-blue-500">&#10148; Sebutkan pelayanannya</p>}
            isOwner={isOwner}
            value={model.infoLayananPTFI}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoLayananPTFI: (e.target.value) }))}
          />}

          <tr className="align-top">
            <td colSpan="2" className="pb-2">
              <p className="text-base font-bold pt-4 pb-1">
                Sanitasi, air, sampah
              </p>
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRowSelect
            text="Sumber utama air untuk makan-minum"
            isOwner={isOwner}
            value={sumberAirMinum}
            options={constants.SumberAirMinum}
            lainnya={true}
            onChange={e => {
              const v = e.target.value;
              setSumberAirMinum(v)
              if (v != "" && v != "Lainnya") {
                setModel(m => ({...m, sumberAirMinum: (v) }))
              } else {
                setModel(m => ({...m, sumberAirMinum: "" }))
              }
            }}
          />
          {sumberAirMinum == "Lainnya"  &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Tolong sebutkan</p>}
            isOwner={isOwner}
            value={model.sumberAirMinum}
            placeholder=""
            onChange={e => setModel(m => ({...m, sumberAirMinum: (e.target.value) }))}
          />}

          {(model.sumberAirMinum != "" && !model.sumberAirMinum.includes("Galon")) &&
          <DataRowSelect
            text="Merebus air minum non galon"
            isOwner={isOwner}
            value={model.merebusAir}
            options={constants.Merebus}
            lainnya={true}
            onChange={e => setModel(m => ({...m, merebusAir: e.target.value }))}
          />}

          <DataRowInput
            text="Berapa gelas minum air dalam 1 hari"
            type="number"
            isOwner={isOwner}
            value={model.konsumsiAir.split(" ").length > 0 ? model.konsumsiAir.split(" ")[0] : ""}
            placeholder=""
            className="w-24"
            onChange={e => {
              const v = e.target.value;
              setModel(m => ({
                ...m,
                konsumsiAir: `${v} gelas`
              }))
            }}
          />

          <DataRowSelect
            text="Sumber air bersih untuk MCK"
            isOwner={isOwner}
            value={sumberAirBersih}
            options={constants.SumberAirBersih}
            lainnya={true}
            onChange={e => {
              const v = e.target.value;
              setSumberAirBersih(v)
              if (v != "" && v != "Lainnya") {
                setModel(m => ({...m, sumberAirBersih: (v) }))
              } else {
                setModel(m => ({...m, sumberAirBersih: "" }))
              }
            }}
          />
          {sumberAirBersih == "Lainnya"  &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Tolong sebutkan</p>}
            isOwner={isOwner}
            value={model.sumberAirBersih}
            placeholder=""
            onChange={e => setModel(m => ({...m, sumberAirBersih: (e.target.value) }))}
          />}

          {/* Masalah */}

          <DataRow text="Persoalan air bersih sehari-hari">
            <div className="pt-2">
            {constants.PersoalanAir.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.masalahAir.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.masalahAir;
                      if (e.target.checked) {
                        if (!array.includes[val]) {
                          setModel(prev => ({...prev,
                            masalahAir: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          masalahAir: array.filter(item => item != val)
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
              defaultValue={model.masalahAir.filter(i => !constants.PersoalanAir.includes(i))[0] || ""}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = model.masalahAir;
                if (val) {
                  setModel(prev => ({...prev,
                    masalahAir: [...array, val]
                  }))
                } else {
                  const legalItems = model.masalahAir
                    .filter(item => constants.PersoalanAir.includes(item));
                  setModel(prev => ({...prev,
                    masalahAir: legalItems
                  }))
                }
              }}
            />
          </DataRow>

          <DataRowSelect
            text="Bila terjadi masalah air..."
            isOwner={isOwner}
            value={model.solusiMasalahAir}
            options={constants.BilaAdaMasalahAir}
            lainnya={true}
            onChange={e => setModel(m => ({...m, solusiMasalahAir: e.target.value }))}
          />

          <DataRowSelect
            text="Sumber air bersih untuk MCK"
            isOwner={isOwner}
            value={saranaBAB}
            options={constants.SaranaBAB}
            lainnya={true}
            onChange={e => {
              const v = e.target.value;
              setSaranaBAB(v)
              if (v != "" && v != "Lainnya") {
                setModel(m => ({...m, saranaBAB: (v) }))
              } else {
                setModel(m => ({...m, saranaBAB: "" }))
              }
            }}
          />
          {saranaBAB == "Lainnya"  &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Tolong sebutkan</p>}
            isOwner={isOwner}
            value={model.saranaBAB}
            placeholder=""
            onChange={e => setModel(m => ({...m, saranaBAB: (e.target.value) }))}
          />}
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Bagiaman fungsinya?</p>}
            isOwner={isOwner}
            value={model.infoSaranaBAB}
            placeholder=""
            onChange={e => setModel(m => ({...m, infoSaranaBAB: (e.target.value) }))}
          />

          <DataRowSelect
            text="Sarana pembuangan air limbah"
            isOwner={isOwner}
            value={pembuanganAirLimbah}
            options={constants.SaluranLimbah}
            lainnya={true}
            onChange={e => {
              const v = e.target.value;
              setPembuanganAirLimbah(v)
              if (v != "" && v != "Lainnya") {
                setModel(m => ({...m, saranaAirLimbah: (v) }))
              } else {
                setModel(m => ({...m, saranaAirLimbah: "" }))
              }
            }}
          />
          {pembuanganAirLimbah == "Lainnya"  &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Tolong sebutkan</p>}
            isOwner={isOwner}
            value={model.saranaAirLimbah}
            placeholder=""
            onChange={e => setModel(m => ({...m, saranaAirLimbah: (e.target.value) }))}
          />}

          <DataRowSelect
            text="Pengelolaan sampah rumah tangga"
            isOwner={isOwner}
            value={pengelolaanSampah}
            options={constants.KelolaSampah}
            lainnya={true}
            onChange={e => {
              const v = e.target.value;
              setPengelolaanSampah(v)
              if (v != "" && v != "Lainnya") {
                setModel(m => ({...m, kelolaSampah: (v) }))
              } else {
                setModel(m => ({...m, kelolaSampah: "" }))
              }
            }}
          />
          {pengelolaanSampah == "Lainnya"  &&
          <DataRowInput
            text={<p className="text-blue-500">&#10148; Tolong sebutkan</p>}
            isOwner={isOwner}
            value={model.kelolaSampah}
            placeholder=""
            onChange={e => setModel(m => ({...m, kelolaSampah: (e.target.value) }))}
          />}

          <tr className="align-top">
            <td colSpan="2" className="pb-2">
              <p className="text-base font-bold pt-4 pb-1">
                Observasi lingkungan sekitar rumah
              </p>
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRowSelect
            text="Genangan di sekitar rumah"
            isOwner={isOwner}
            value={model.genanganAir}
            options={constants.YaTidak}
            onChange={e => setModel(m => ({...m, genanganAir: (e.target.value) }))}
          />
          <DataRowSelect
            text="Keberadaan jentik nyamuk di genangan"
            isOwner={isOwner}
            value={model.nyamukDiGenangan}
            options={constants.YaTidak}
            onChange={e => setModel(m => ({...m, nyamukDiGenangan: (e.target.value) }))}
          />
          <DataRowSelect
            text="Indikasi keberadaan vektor"
            isOwner={isOwner}
            value={model.indikasiVektor}
            options={constants.YaTidak}
            onChange={e => setModel(m => ({...m, indikasiVektor: (e.target.value) }))}
          />
          <DataRowSelect
            text="Kondisi kebersihan rumah"
            isOwner={isOwner}
            value={model.kebersihanRumah}
            options={constants.KebersihanRumah}
            onChange={e => setModel(m => ({...m, kebersihanRumah: (e.target.value) }))}
          />
          <DataRowMultiline
            text="Info ttg KSM pengelola sampah"
            isOwner={isOwner}
            value={model.komunitasSampah}
            placeholder=""
            onChange={e => setModel(m => ({...m, komunitasSampah: (e.target.value) }))}
          />

          <tr className="align-top">
            <td colSpan="2" className="pb-2">
              <p className="text-base font-bold pt-3 pb-1">Observasi rumah sehat</p>
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRowSelect
            text="Langit-langit (plafon) rumah"
            isOwner={isOwner}
            value={model.plafon}
            options={constants.Plafon}
            onChange={e => setModel(m => ({...m, plafon: (e.target.value) }))}
          />
          <DataRowSelect
            text="Dinding rumah"
            isOwner={isOwner}
            value={model.dinding}
            options={constants.Dinding}
            onChange={e => setModel(m => ({...m, dinding: (e.target.value) }))}
          />
          <DataRowSelect
            text="Lantai rumah"
            isOwner={isOwner}
            value={model.lantai}
            options={constants.Lantai}
            onChange={e => setModel(m => ({...m, lantai: (e.target.value) }))}
          />
          <DataRowSelect
            text="Jendela kamar"
            isOwner={isOwner}
            value={model.jendelaKamar}
            options={constants.Ada}
            onChange={e => setModel(m => ({...m, jendelaKamar: (e.target.value) }))}
          />
          <DataRowSelect
            text="Jendela ruang keluarga"
            isOwner={isOwner}
            value={model.jendelaRuang}
            options={constants.Ada}
            onChange={e => setModel(m => ({...m, jendelaRuang: (e.target.value) }))}
          />
          <DataRowSelect
            text="Ventilasi"
            isOwner={isOwner}
            value={model.ventilasi}
            options={constants.Ventilasi}
            onChange={e => setModel(m => ({...m, ventilasi: (e.target.value) }))}
          />
          <DataRowSelect
            text="Pencahayaan"
            isOwner={isOwner}
            value={model.pencahayaan}
            options={constants.Pencahayaan}
            onChange={e => setModel(m => ({...m, pencahayaan: (e.target.value) }))}
          />

          <tr className="align-top">
            <td colSpan="2" className="pb-2">
              <p className="text-base font-bold pt-3 pb-1">Perilaku hidup bersih dan sehat</p>
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRow text="Pencegahan penyakit malaria">
            <div className="pt-2">
            {constants.MencegahMalaria.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.caraCegahMalaria.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.caraCegahMalaria;
                      if (e.target.checked) {
                        if (val == "Tidak tahu") {
                          setModel(prev => ({...prev,
                            caraCegahMalaria: [val]
                          }))
                        } else {
                          const i = array.indexOf("Tidak tahu");
                          if (i >= 0) array.splice(i, 1)
                          if (!array.includes[val]) {
                            setModel(prev => ({...prev,
                              caraCegahMalaria: [...array, val]
                            }))
                          }
                        }
                      } else {
                        setModel(prev => ({...prev,
                          caraCegahMalaria: array.filter(item => item != val)
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

          <DataRow text="Konsumsi buah dan sayur">
            <div className="pt-2">
            {constants.BuahDanSayur.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.konsumsiSayur == m}
                    onChange={e => {
                      const val = e.target.value;
                      if (e.target.checked) {
                        setModel(prev => ({...prev, konsumsiSayur: val }))
                      } else {
                        setModel(prev => ({...prev, konsumsiSayur: "" }))
                      }
                    }}
                  />
                  <span>{m}</span>
                </label>
              </div>
            ))}
            </div>
          </DataRow>

          <DataRow text="Frekuensi berolahraga">
            <div className="pt-2">
            {constants.FrekuensiOlahraga.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.olahraga == m}
                    onChange={e => {
                      const val = e.target.value;
                      if (e.target.checked) {
                        setModel(prev => ({...prev, olahraga: val }))
                      } else {
                        setModel(prev => ({...prev, olahraga: "" }))
                      }
                    }}
                  />
                  <span>{m}</span>
                </label>
              </div>
            ))}
            </div>
          </DataRow>

          <DataRow text="Menjaga kebersihan diri">
            <div className="pt-2">
            {constants.KebersihanDiri.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.menjagaKebersihanDiri.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.menjagaKebersihanDiri;
                      if (e.target.checked) {
                        if (!array.includes[val]) {
                          setModel(prev => ({...prev,
                            menjagaKebersihanDiri: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          menjagaKebersihanDiri: array.filter(item => item != val)
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

          <DataRowSelect
            text="Ada/tidak yang merokok"
            isOwner={isOwner}
            value={model.perokok}
            options={constants.Ada}
            onChange={e => setModel(m => ({...m, perokok: (e.target.value) }))}
          />

          <DataRow text="Merokok sebaiknya di ...">
            <div className="pt-2">
            {constants.TempatMerokok.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.tempatMerokok == m}
                    onChange={e => {
                      const val = e.target.value;
                      if (e.target.checked) {
                        setModel(prev => ({...prev, tempatMerokok: val }))
                      } else {
                        setModel(prev => ({...prev, tempatMerokok: "" }))
                      }
                    }}
                  />
                  <span>{m}</span>
                </label>
              </div>
            ))}
            </div>
          </DataRow>

          <DataRowSelect
            text="Ada/tidak yang mengkonsumsi miras"
            isOwner={isOwner}
            value={model.konsumsiMiras}
            options={constants.Ada}
            onChange={e => setModel(m => ({...m, konsumsiMiras: (e.target.value) }))}
          />
          {model.konsumsiMiras == "Ada" && <DataRowInput
            text={<p className="text-blue-500">&#10148; Berapa kali dalam satu minggu?</p>}
            type="number"
            isOwner={isOwner}
            value={model.frekuensiMiras}
            className="w-20"
            placeholder=""
            onChange={e => setModel(m => ({...m, frekuensiMiras: (e.target.value) }))}
          />}

          <DataRow text="Persoalan air bersih sehari-hari">
            <div className="pt-2">
            {constants.DampakMiras.map(m => (
              <div key={m} className="">
                <label key={m} className="inline-flex items-top space-x-2 my-1">
                  <input
                    type="checkbox"
                    value={m}
                    disabled={!isOwner}
                    checked={model.dampakMiras.includes(m)}
                    onChange={e => {
                      const val = e.target.value;
                      const array = model.dampakMiras;
                      if (e.target.checked) {
                        if (!array.includes[val]) {
                          setModel(prev => ({...prev,
                            dampakMiras: [...array, val]
                          }))
                        }
                      } else {
                        setModel(prev => ({...prev,
                          dampakMiras: array.filter(item => item != val)
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
              defaultValue={model.dampakMiras.filter(i => !constants.DampakMiras.includes(i))[0] || ""}
              onBlur={e => {
                const val = e.target.value.trim();
                const array = model.dampakMiras;
                if (val) {
                  setModel(prev => ({...prev,
                    dampakMiras: [...array, val]
                  }))
                } else {
                  const legalItems = model.dampakMiras
                    .filter(item => constants.DampakMiras.includes(item));
                  setModel(prev => ({...prev,
                    dampakMiras: legalItems
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
      {/* <pre className="my-10 text-xs font-light">{JSON.stringify(model, null, 2)}</pre> */}
    </div>
  )
}

/* DO NOT DELETE
"TempatMerokok": ["Di luar rumah", "Di dalam kamar", "Di dalam rumah", "Dimana saja", "Tidak tahu"]

// 85 Gak jelas gimana nyimpan datanya
// 75 (3) Bersih?
// 70 71 72 78 79
// 57
// 61 single / multi? sebaiknya single
// 65


*/