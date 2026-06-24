export default function Card({ icon, title, description, tag }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-green-100 p-6 hover:shadow-md transition-shadow">
      {tag && (
        <span className="inline-block bg-green-50 text-brand-green text-xs font-semibold px-3 py-1 rounded-full mb-4">
          {tag}
        </span>
      )}
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="font-display text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-500 text-sm leading-relaxed">{description}</p>
    </div>
  )
}
