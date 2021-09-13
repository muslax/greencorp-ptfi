import { useState } from "react";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";

import DataRow from "components/DataRow";
import DeleteButton from "components/DeleteButton";
import DeleteActionButton from "components/DeleteActionButton";

export default function Ternak({ responden, isOwner, daftar, mutate }) {
  const [model, setModel] = useState(newModel());
  const [form, setForm] = useState(false);
  const [selected, setSelected] = useState(null);

  function newModel() {
    return {
      _id: null,
      _rid: responden._id,
      tipe: "ternak",
      jenis: "",
      jumlah: 0,
      kgDikonsumsiPerMinggu: 0,
      kgDijualPerMinggu: 0,
      nilaiJualPerMinggu: 0,
    }
  }

  async function saveAset(e) {
    try {
      await fetchJson("/api/post?q=save-aset", generatePOSTData(model));
      mutate();
      setForm(false);
    } catch (error) {
      alert("ERROR");
      setForm(false);
    }
  }

  async function deleteAset(e) {
    try {
      await fetchJson("/api/post?q=delete-aset", generatePOSTData({ id: selected._id }))
      mutate()
    } catch (error) {
      alert("ERROR")
    }

    setSelected(null);
  }

  function isReady() {
    return model.jenis
    && (model.jumlah > 0
    || model.kgDikonsumsiPerMinggu > 0
    || model.kgDijualPerMinggu > 0
    || model.nilaiJualPerMinggu > 0);
  }

  return (
    <div>
      <div className="flex text-base mt-4 mb-2">
        <p className="flex-grow">Hewan ternak</p>
        <p>Satuan: <span className="text-red-600 font-bold">ekor/minggu</span></p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full border-t border-blue-200">
          <tbody>
            <tr className="border-b border-blue-200 bg-blue-200 bg-opacity-60 font-medium whitespace-nowrap">
              <td className="p-2 w-10">#</td>
              <td className="p-2">Jenis hewan ternak</td>
              <td className="w-28 p-2 text-right">Jumlah dimiliki</td>
              <td className="w-28 p-2 text-right">Dikonsumsi</td>
              <td className="w-28 p-2 text-right">Dijual</td>
              <td className="w-28 p-2 text-right">Nilai</td>
              <td className="w-16 p-2 pr-4 text-center">...</td>
            </tr>
          </tbody>
          {daftar.filter((d) => { return d.tipe == "ternak" }).map((d, i) => (
            <tbody key={d._id}>
              <tr className="border-b border-blue-200 whitespace-nowrap">
                <td className="p-2 w-10">{i +1}</td>
                <td className="p-2">{d.jenis}</td>
                <td className="p-2 text-right">{d.jumlah}</td>
                <td className="p-2 text-right">{d.kgDikonsumsiPerMinggu}</td>
                <td className="p-2 text-right">{d.kgDijualPerMinggu}</td>
                <td className="p-2 text-right">{d.nilaiJualPerMinggu}</td>
                <td className="p-2 pr-4 text-center">
                  <DeleteButton
                    onClick={e => {
                      setSelected(d);
                    }}
                  />
                </td>
              </tr>
              {isOwner && selected?._id == d._id && (
                <tr className="border-b border-blue-200 whitespace-nowrap">
                  <td colSpan="7" className="py-2 text-center">
                    <DeleteActionButton
                      onCancel={e => setSelected(null)}
                      onDelete={deleteAset}
                    />
                  </td>
                </tr>
              )}
            </tbody>
          ))}
        </table>
      </div>
      {isOwner && !form && (
        <div className="text-center pt-4">
          <button
            onClick={e => {
              setModel(newModel());
              setForm(true);
            }}
            className="btnSubSection"
          >Add</button>
        </div>
      )}
      {form && (
        <div className="p-3 pt-1 mt-4 border border-blue-200">
          <table className="w-full">
            <tbody>
              <tr className="align-top">
                <td className="w-1/4 h-1"></td>
                <td className=""></td>
              </tr>
              <DataRow text="Jenis hewan ternak">
                <input
                  type="text"
                  className="mt-1"
                  autoFocus={true}
                  value={model.jenis}
                  onChange={e => setModel(m => ({...m, jenis: e.target.value}))}
                />
              </DataRow>
              <DataRow text="Jumlah dimiliki">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-20 mt-1"
                    value={model.jumlah}
                    onChange={e => setModel(m => ({...m, jumlah: parseInt(e.target.value)}))}
                  />
                  <span className="ml-2">ekor</span>
                </div>
              </DataRow>
              <DataRow text="Jumlah dikonsumsi">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-20 mt-1"
                    value={model.kgDikonsumsiPerMinggu}
                    onChange={e => setModel(m => ({...m, kgDikonsumsiPerMinggu: parseInt(e.target.value)}))}
                  />
                  <span className="ml-2">kg/minggu</span>
                </div>
              </DataRow>
              <DataRow text="Jumlah dijual">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-20 mt-1"
                    value={model.kgDijualPerMinggu}
                    onChange={e => setModel(m => ({...m, kgDijualPerMinggu: parseInt(e.target.value)}))}
                  />
                  <span className="ml-2">kg/minggu</span>
                </div>
              </DataRow>
              <DataRow text="Nilai penjualan">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-40 mt-1"
                    value={model.nilaiJualPerMinggu}
                    onChange={e => setModel(m => ({...m, nilaiJualPerMinggu: parseInt(e.target.value)}))}
                  />
                  <span className="ml-2">Rp/minggu</span>
                </div>
              </DataRow>
              <DataRow text="&nbsp;">
                {!isReady() && <button className="btnSubSectionDisabled mr-3">Save</button>}
                {isReady() && <button className="btnSubSection mr-3" onClick={saveAset}>Save</button>}
                <button
                  className="btnSubSectionCancel"
                  onClick={e => setForm(false)}
                >Cancel</button>
              </DataRow>
              {/* <DataRow text="&nbsp;">
                <br/>
                <pre>{JSON.stringify(model, null, 2)}</pre>
              </DataRow> */}
            </tbody>
          </table>
        </div>
      )}
      {/* <pre>DAFTAR {JSON.stringify(daftar, null, 2)}</pre> */}
    </div>
  )
}