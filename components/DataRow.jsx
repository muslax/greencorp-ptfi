export default function DataRow({ text, leftSmall, children }) {
  return (
    <tr className="align-top">
      <td className={`pt-[10px] pr-4`}>
        <div className="w-full max-w-[300px] truncate">
          {text || "Field descriptor"}
        </div>
      </td>
      <td className="">
        {children}
      </td>
    </tr>
  )
}

// <td className={`${leftSmall ? 'w-1/4' : 'w-1/3'} pt-[10px] pr-4`}>

export function DataRowSelect({
  text,
  isOwner,
  value,
  onChange,
  className = "",
  options,
  lainnya
}) {
  return (
    <tr className="align-top">
      <td className={`pt-[10px] pr-4`}>
        <div className="w-full max-w-[300px] truncate">
          {text || "Field descriptor"}
        </div>
      </td>
      <td className="">
        <select
          className={className}
          disabled={!isOwner}
          value={value}
          onChange={onChange}
        >
          <option value="">-</option>
          {options?.map((e, i) => (
            <option key={`KEY-${i}`} value={e}>{e}</option>
          ))}
          {lainnya && <option value="Lainnya">Lainnya</option>}
        </select>
      </td>
    </tr>
  )
}

export function DataRowInput({
  text,
  type = "text",
  placeholder = "",
  className,
  isOwner,
  value,
  onChange,
}) {
  return (
    <tr className="align-top">
      <td className={`pt-[10px] pr-4`}>
        <div className="w-full max-w-[300px] truncate">
          {text || "Field descriptor"}
        </div>
      </td>
      <td className="">
      <input
        type={type}
        readOnly={!isOwner}
        value={value}
        placeholder={placeholder}
        className={className ? `${className} mt-1` : "w-full mt-1"}
        onChange={onChange}
      />
      </td>
    </tr>
  )
}

export function DataRowMultiline({
  text,
  placeholder = "",
  isOwner,
  value,
  onChange,
}) {
  return (
    <tr className="align-top">
      <td className={`pt-[10px] pr-4`}>
        <div className="w-full max-w-[300px] truncate">
          {text || "Field descriptor"}
        </div>
      </td>
      <td className="">
        <textarea
          rows={3}
          readOnly={!isOwner}
          value={value}
          placeholder={placeholder}
          className="w-full mt-1"
          onChange={onChange}
        ></textarea>
      </td>
    </tr>
  )
}