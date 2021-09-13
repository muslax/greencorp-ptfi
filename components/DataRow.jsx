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