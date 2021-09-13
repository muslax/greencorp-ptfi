import fetchJson from "lib/fetchJson";
import { generatePOSTData } from "lib/utils";
import { useState } from "react"

export default function ConstantsEditor({
  constants,
  localConstants,
  setLocalConstants,
  selected,
  setSelected,
  keyName,
  handleClick,
  updateConstants,
  mutate
}) {
  const [form, setForm] = useState(null);
  const [model, setModel] = useState({})

  async function addConstant(e) {
    const array = [...constants[keyName]];
    array.push(model.value);
    console.log(array);
    try {
      await fetchJson("/api/post?q=update-constants", generatePOSTData({
        key: keyName,
        value: array
      }));
      setForm(false);
      setModel(null);
      mutate();
    } catch (error) {
      alert("ERROR");
    }
  }

  return (
    <div className="border-l-4 border-blue-500 pl-4">
      {localConstants[keyName].map((d, i) => (
        <div key={d.nama}>
          {(selected?.key != keyName || selected?.index != i) && (
          <div className="flex items-center mb-2">
            <button
              className="h-5 w-10 mr-3 rounded bg-yellow-400 text-xs text-white"
              onClick={e => handleClick(e, keyName, i, d)}
            >
              EDIT
            </button>
            <p className="">{d}</p>
          </div>
          )}
          {(selected?.key == keyName && selected?.index == i) && (
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={selected.value}
              className="py-1 px-2 h-8 mr-2"
              onChange={e => {
                setSelected(sel => ({
                  ...sel,
                  value: e.target.value
                }))
              }}
            />
            <button
              className="h-7 w-16 rounded bg-blue-400 text-xs text-white mr-2"
              onClick={updateConstants}
            >
              SAVE
            </button>
            <button
              className="h-7 w-16 rounded bg-white border border-red-400 text-xs text-red-500"
              onClick={e => {
                setLocalConstants(constants)
                setSelected(null)
              }}
            >
              CANCEL
            </button>
          </div>
          )}
        </div>
      ))}
      <div className="">
        {!form && (
          <button
            className="h-5 w-10 mr-3 rounded bg-blue-400 text-xs text-white"
            onClick={e => {
              setModel({ key: keyName, value: "" })
              setForm(true)
            }}
          >
            ADD
          </button>
          )}
        {form && (
          <div className="flex items-center mb-2">
            <input
              type="text"
              value={model.value}
              className="py-1 px-2 h-8 mr-2"
              onChange={e => {
                setModel(sel => ({
                  ...sel,
                  value: e.target.value
                }))
              }}
            />
            <button
              className="h-7 w-16 rounded bg-blue-400 text-xs text-white mr-2"
              onClick={addConstant}
            >
              SAVE
            </button>
            <button
              className="h-7 w-16 rounded bg-white border border-red-400 text-xs text-red-500"
              onClick={e => {
                // setLocalConstants(constants)
                setForm(false)
                setModel(null)
              }}
            >
              CANCEL
            </button>
          </div>
        )}
      </div>
      {/* <pre className="pt-3">
        MODEL {JSON.stringify(model, null, 2)}<br/>
        MASTER {JSON.stringify(constants[keyName], null, 2)}<br/>
      </pre> */}
    </div>
  )
}