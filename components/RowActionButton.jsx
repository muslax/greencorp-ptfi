export default function RowActionButton({ ready, onSave, onCancel }) {
  return (
    <div className="my-6">
        {!ready && <button className="btnSubSectionDisabled">Save</button>}
        {ready && <button className="btnSubSection"onClick={onSave}>Save</button>}
        <button className="btnSubSectionDisabled ml-4" onClick={onCancel}>Cancel</button>
    </div>
  )
}