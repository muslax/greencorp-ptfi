import { useState } from "react";
import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";

import DataRow from "components/DataRow";
import DeleteButton from "components/DeleteButton";
import DeleteActionButton from "components/DeleteActionButton";

export default function HasilHutan({ responden, isOwner, daftar, mutate }) {
  const [model, setModel] = useState(newModel());
  const [form, setForm] = useState(false);
  const [selected, setSelected] = useState(null);

  function newModel() {
    return {
      _id: null,
      _rid: responden._id,
      tipe: "hasilhutan",
      jenis: "",
      satuan: "", // Kg/minggu Ekor/mingg etc.
      dikonsumsi: 0,
      dijual: 0,
      nilaiJual: 0,
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
    return model.jenis && model.satuan
    && (model.dikonsumsi || model.dijual || model.nilaiJual);
  }

  return (
    <div>
      <h3 className="text-base mt-4 mb-2">Pemanfaatan hasil hutan</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full border-t border-blue-200">
          <tbody>
            <tr className="border-b border-blue-200 bg-blue-200 bg-opacity-60 font-medium whitespace-nowrap">
              <td className="p-2 w-10">#</td>
              <td className="p-2">Jenis hasil hutan</td>
              <td className="w-28 p-2">Satuan/waktu</td>
              <td className="w-28 p-2 text-right">Dikonsumsi</td>
              <td className="w-28 p-2 text-right">Dijual</td>
              <td className="w-28 p-2 text-right">Nilai jual</td>
              <td className="w-16 p-2 pr-4 text-center">...</td>
            </tr>
          </tbody>
          {daftar.filter((d) => { return d.tipe == "hasilhutan" }).map((d, i) => (
            <tbody key={d._id}>
              <tr className="border-b border-blue-200 whitespace-nowrap">
                <td className="p-2 w-10">{i +1}</td>
                <td className="p-2">{d.jenis}</td>
                <td className="p-2">{d.satuan}</td>
                <td className="p-2 text-right">{d.dikonsumsi}</td>
                <td className="p-2 text-right">{d.dijual}</td>
                <td className="p-2 text-right">{d.nilaiJual}</td>
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
              <DataRow text="Jenis hasil hutan">
                <input
                  type="text"
                  className="mt-1"
                  autoFocus={true}
                  value={model.jenis}
                  onChange={e => setModel(m => ({...m, jenis: e.target.value}))}
                />
              </DataRow>
              <DataRow text="Satuan/waktu">
                <select
                  value={model.satuan}
                  onChange={e => setModel(m => ({...m, satuan: e.target.value}))}
                >
                  <option value="">-</option>
                  <option value="Kg/minggu">Kg/minggu</option>
                  <option value="Kg/bulan">Kg/bulan</option>
                  <option value="Ekor/minggu">Ekor/minggu</option>
                  <option value="Ekor/bulan">Ekor/bulan</option>
                </select>
              </DataRow>
              <DataRow text="Jumlah dikonsumsi">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-20 mt-1"
                    disabled={!model.satuan}
                    value={model.dikonsumsi}
                    onChange={e => setModel(m => ({...m, dikonsumsi: parseInt(e.target.value)}))}
                  />
                  <span className="ml-2">{model.satuan ? model.satuan : "..."}</span>
                </div>
              </DataRow>
              <DataRow text="Jumlah dijual">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-20 mt-1"
                    disabled={!model.satuan}
                    value={model.dijual}
                    onChange={e => setModel(m => ({...m, dijual: parseInt(e.target.value)}))}
                  />
                  <span className="ml-2">{model.satuan ? model.satuan : "..."}</span>
                </div>
              </DataRow>
              <DataRow text="Nilai penjualan">
                <div className="flex items-center">
                  <input
                    type="number"
                    className="w-40 mt-1"
                    disabled={!model.satuan}
                    value={model.nilaiJual}
                    onChange={e => setModel(m => ({...m, nilaiJual: parseInt(e.target.value)}))}
                  />
                  <span className="ml-2">{model.satuan ? model.satuan : "..."}</span>
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