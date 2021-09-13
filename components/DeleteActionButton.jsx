export default function DeleteActionButton({ onDelete, onCancel }) {
  return (
    <div className="">
      <button
        onClick={onDelete}
        className="rounded focus:outline-none text-sm font-medium h-9 w-24 bg-red-500 hover:bg-red-600 text-white mr-4"
      >Delete</button>
      <button
        onClick={onCancel}
        className="rounded focus:outline-none text-sm text-red-600 font-medium h-9 w-24 border border-red-500 hover:border-red-600"
      >Cancel</button>
    </div>
  )
}