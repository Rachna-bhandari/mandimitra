export default function Input({ label, placeholder, type = 'text', value, onChange, error }) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm font-medium text-green-900">{label}</label>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`border rounded px-3 py-2 text-sm outline-none transition-all duration-200 focus:ring-2 focus:ring-green-700 ${error ? 'border-red-500' : 'border-gray-300'}`}
      />
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  )
}