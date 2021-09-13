export default function Section({ title, children }) {
  return (
    <div className="max-w-5xl mx-auto mb-28 px-6">
      {title && <h2 className="text-2xl font-bold mt-10 mb-6">{title}</h2>}
      {children}
    </div>
  )
}