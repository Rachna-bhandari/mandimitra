export default function Button({ children, variant = 'primary', size = 'md', disabled = false, onClick }) {
  const base = 'font-semibold rounded transition-all duration-200 cursor-pointer'
  const variants = {
    primary: 'bg-green-800 text-white hover:bg-green-700',
    secondary: 'bg-yellow-500 text-white hover:bg-yellow-400',
    outline: 'border-2 border-green-800 text-green-800 hover:bg-green-50',
  }
  const sizes = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-5 py-2 text-base',
    lg: 'px-8 py-3 text-lg',
  }
  return (
    <button onClick={onClick} disabled={disabled} className={`${base} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
      {children}
    </button>
  )
}