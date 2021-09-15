import DeleteButton from "components/DeleteButton";
import fetchJson from "lib/fetchJson";
import useDaftarAset from "hooks/useDaftarAset";
import useDaftarTanaman from "hooks/useDaftarTanaman";
import useRumah from "hooks/useRumah";
import useTanahRumah from "hooks/useRumah";
import { generatePOSTData } from "lib/utils";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import DataRow from "../DataRow";
import DeleteActionButton from "../DeleteActionButton";
import HasilHutan from "./HasilHutan";
import Ikan from "./Ikan";
import Tanaman from "./Tanaman";
import Ternak from "./Ternak";

export default function AsetSumberdaya({ user, isOwner, responden, constants, mutate }) {
  const { rumah, loadingRumah, mutateRumah } = useRumah(responden._id);
  const { daftarTanaman, loadingDaftarTanaman, mutateDaftarTanaman } = useDaftarTanaman(responden._id);
  const { daftar, loadingDaftar, mutateDaftar } = useDaftarAset(responden._id);

  const [model, setModel] = useState(newRumah());
  const [modelTanaman, setModelTanaman] = useState(null);
  const [modelTernak, setModelTernak] = useState(null);
  const [modelIkan, setModelIkan] = useState(null);

  const [formTanaman, setFormTanaman] = useState(false);
  const [formTernak, setFormTernak] = useState(false);
  const [formIkan, setFormIkan] = useState(false);
  const [formHasilHutan, setFormHasilHutan] = useState(false);

  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (rumah) setModel(rumah);
  }, [rumah])

  function newRumah() {
    return {
      _id: null,
      _rid: responden._id,
      jenisRumah: "",
      jumlahRuang: "",
      statusRumah: "",
      buktiKepemilikan: "",
      luasTanah: 0,
      luasBangunan: 0,
      luasLahanProduktif: 0,
      luasLahanNonProduktif: 0,
      luasLahanLain: 0,
      sumberListrik: "",
      // kendaraan: [],
      sepeda: 0,
      sepedaMotor: 0,
      mobil: 0,
      traktor: 0,
      perahuTradisional: 0,
      perahuMesinTempel: 0,
    }
  }

  async function saveRumah(e) {
    try {
      await fetchJson("/api/post?q=save-rumah", generatePOSTData(model));
      mutateRumah();
      // setFormTanaman(false);
    } catch (error) {
      alert("ERROR");
      // setFormTanaman(false);
    }
  }

  function rumahReady() {
    return model.jenisRumah
    && model.jumlahRuang
    && model.statusRumah
    // && model.buktiKepemilikan
    // && model.luasTanah
    // && model.luasBangunan
    // && model.luasLahanProduktif
    // && model.luasLahanNonProduktif
    // && model.luasLahanLain
    && model.sumberListrik
    // && model.sepeda
    // && model.sepedaMotor
    // && model.mobil
    // && model.traktor
    // && model.perahuTradisional
    // && model.perahuMesinTempel
  }

  function rumahDirty() {
    if (rumah) return !isEqual(model, rumah);
    return !isEqual(model, newRumah());
  }

  if(loadingDaftar || loadingDaftarTanaman) return null;

  return (
    <div>
      <table className="w-full border-t border-blue-200">
        <tbody>
          <tr className="align-top">
            <td className="w-1/4 h-3"></td>
            <td className=""></td>
          </tr>
          <DataRow text="Jenis rumah tinggal">
            <select
              className=""
              disabled={!isOwner}
              value={model.jenisRumah}
              onChange={e => setModel(m => ({...m, jenisRumah: (e.target.value) }))}
            >
              <option value="">-</option>
              <option value="Permanen">Permanen</option>
              <option value="Semi permanen">Semi permanen</option>
              <option value="Honai">Honai</option>
            </select>
          </DataRow>
          <DataRow text="Jumlah ruang">
            <select
              className=""
              disabled={!isOwner}
              value={model.jumlahRuang}
              onChange={e => setModel(m => ({...m, jumlahRuang: (e.target.value) }))}
            >
              <option value="">-</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5+">5 atau lebih</option>
            </select>
          </DataRow>
          <DataRow text="Status & Bukti kepemilikan">
            <div className="flex items-center">
              <select
                className="mr-3"
                disabled={!isOwner}
                value={model.statusRumah}
                onChange={e => setModel(m => ({...m, statusRumah: (e.target.value) }))}
              >
                <option value="">-</option>
                <option value="Milik sendiri">Milik sendiri</option>
                <option value="Menyewa">Menyewa</option>
                <option value="Milik orang tua">Milik orang tua</option>
                <option value="Milik teman/famili">Milik teman/famili</option>
                <option value="Rumah dinas">Rumah dinas</option>
              </select>
              <select
                className="mr-3"
                disabled={!isOwner}
                value={model.buktiKepemilikan}
                onChange={e => setModel(m => ({...m, buktiKepemilikan: (e.target.value) }))}
              >
                <option value="">-</option>
                <option value="Sertifikat">Sertifikat</option>
                <option value="Akta jual-beli">Akta jual-beli</option>
                <option value="IMB">IMB</option>
                <option value="Girik / Surat Desa">Girik / Surat Desa</option>
                <option value="Lainnya">Lainnya</option>
              </select>
            </div>
          </DataRow>
          <DataRow text="Luas tanah">
            <div className="flex items-center">
              <input
                type="number"
                className="w-24 mt-1 mr-2"
                disabled={!isOwner}
                value={model.luasTanah}
                onChange={e => setModel(m => ({...m, luasTanah: parseInt(e.target.value) }))}
              />
              <span className="mr-2">m2</span>
            </div>
          </DataRow>
          <DataRow text="Luas bangungan">
            <div className="flex items-center">
              <input
                type="number"
                className="w-24 mt-1 mr-2"
                disabled={!isOwner}
                value={model.luasBangunan}
                onChange={e => setModel(m => ({...m, luasBangunan: parseInt(e.target.value) }))}
              />
              <span className="mr-2">m2</span>
            </div>
          </DataRow>
          <DataRow text="Luas lahan produktif">
            <div className="flex items-center">
              <input
                type="number"
                className="w-24 mt-1 mr-2"
                disabled={!isOwner}
                value={model.luasLahanProduktif}
                onChange={e => setModel(m => ({...m, luasLahanProduktif: parseInt(e.target.value) }))}
              />
              <span className="mr-2">m2</span>
            </div>
          </DataRow>
          <DataRow text="Luas lahan tidak produktif">
            <div className="flex items-center">
              <input
                type="number"
                className="w-24 mt-1 mr-2"
                disabled={!isOwner}
                value={model.luasLahanNonProduktif}
                onChange={e => setModel(m => ({...m, luasLahanNonProduktif: parseInt(e.target.value) }))}
              />
              <span className="mr-2">m2</span>
            </div>
          </DataRow>
          <DataRow text="Luas lahan lainnya">
            <div className="flex items-center">
              <input
                type="number"
                className="w-24 mt-1 mr-2"
                disabled={!isOwner}
                value={model.luasLahanLain}
                onChange={e => setModel(m => ({...m, luasLahanLain: parseInt(e.target.value) }))}
              />
              <span className="mr-2">m2</span>
            </div>
          </DataRow>
          <DataRow text="Sumber listrik/penerangan">
            <select
              className="mr-3"
              disabled={!isOwner}
              value={model.sumberListrik}
              onChange={e => setModel(m => ({...m, sumberListrik: (e.target.value) }))}
            >
              <option value="">-</option>
              <option value="PLN">PLN</option>
              <option value="Genset komunal">Genset komunal</option>
              <option value="Genset pribadi">Genset pribadi</option>
              <option value="Panel surya">Panel surya</option>
              <option value="Mikro hidro">Mikro hidro</option>
              <option value="Lainnya">Lainnya</option>
            </select>
          </DataRow>

          <tr className="align-top">
            <td colSpan="2" className="py-3">
              <hr className="border-blue-200"/>
            </td>
          </tr>

          <DataRow text="Sepeda">
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 mt-1 mr-2"
                disabled={!isOwner}
                value={model.sepeda}
                onChange={e => setModel(m => ({...m, sepeda: parseInt(e.target.value) }))}
              />
              <span className="mr-2">unit</span>
            </div>
          </DataRow>
          <DataRow text="Sepeda motor">
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 mt-1 mr-2"
                disabled={!isOwner}
                value={model.sepedaMotor}
                onChange={e => setModel(m => ({...m, sepedaMotor: parseInt(e.target.value) }))}
              />
              <span className="mr-2">unit</span>
            </div>
          </DataRow>
          <DataRow text="Mobil (roda 4 atau lebih)">
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 mt-1 mr-2"
                disabled={!isOwner}
                value={model.mobil}
                onChange={e => setModel(m => ({...m, mobil: parseInt(e.target.value) }))}
              />
              <span className="mr-2">unit</span>
            </div>
          </DataRow>
          <DataRow text="Traktor">
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 mt-1 mr-2"
                disabled={!isOwner}
                value={model.traktor}
                onChange={e => setModel(m => ({...m, traktor: parseInt(e.target.value) }))}
              />
              <span className="mr-2">unit</span>
            </div>
          </DataRow>
          <DataRow text="Perahu/sampan tradisional">
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 mt-1 mr-2"
                disabled={!isOwner}
                value={model.perahuTradisional}
                onChange={e => setModel(m => ({...m, perahuTradisional: parseInt(e.target.value) }))}
              />
              <span className="mr-2">unit</span>
            </div>
          </DataRow>
          <DataRow text="Perahu mesin tempel">
            <div className="flex items-center">
              <input
                type="number"
                className="w-16 mt-1 mr-2"
                disabled={!isOwner}
                value={model.perahuMesinTempel}
                onChange={e => setModel(m => ({...m, perahuMesinTempel: parseInt(e.target.value) }))}
              />
              <span className="mr-2">unit</span>
            </div>
          </DataRow>

          {isOwner && <DataRow text="&nbsp;">
            {(!rumahReady() || !rumahDirty()) && <button className="btnSubSectionDisabled">Save</button>}
            {rumahReady() && rumahDirty() && <button onClick={saveRumah} className="btnSubSection">Save</button>}
          </DataRow>}

          <tr className="align-top">
            <td colSpan="2" className="py-3">
              <hr className="border-blue-200"/>
            </td>
          </tr>
          {/* <DataRow text="-">
            <pre>{JSON.stringify(model, null, 2)}</pre>
          </DataRow> */}
        </tbody>
      </table>
      {/*  */}

      {/* <pre>{JSON.stringify(daftar, null, 2)}</pre> */}
      <Tanaman
        responden={responden}
        isOwner={isOwner}
        daftar={daftar}
        mutate={mutateDaftar}
      />
      <Ternak
        responden={responden}
        isOwner={isOwner}
        daftar={daftar}
        mutate={mutateDaftar}
      />
      <Ikan
        responden={responden}
        isOwner={isOwner}
        daftar={daftar}
        mutate={mutateDaftar}
      />
      <HasilHutan
        responden={responden}
        isOwner={isOwner}
        daftar={daftar}
        mutate={mutateDaftar}
      />
    </div>
  )
}