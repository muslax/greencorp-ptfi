export default function RowActionButton({ ready, onSave, onCancel }) {
  return (
    <div className="my-6">
        {!ready && <button className="btnCancel">Save</button>}
        {ready && <button className="btnActive"onClick={onSave}>Save</button>}
        <button className="btnCancel ml-4" onClick={onCancel}>Cancel</button>
    </div>
  )
}