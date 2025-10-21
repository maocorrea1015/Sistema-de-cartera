export function Logo({ className = "", size = "default" }: { className?: string; size?: "small" | "default" | "large" }) {
  const sizes = {
    small: "h-6",
    default: "h-8",
    large: "h-10"
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizes[size]} aspect-square bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center shadow-md`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className="w-3/5 h-3/5"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7L9 3L15 7L21 3V17L15 21L9 17L3 21V7Z"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className={`${size === 'small' ? 'text-sm' : size === 'large' ? 'text-xl' : 'text-base'} text-gray-900 tracking-tight`}>
          <span className="font-semibold">Cartera</span>
          <span className="text-blue-600 font-semibold">Pro</span>
        </span>
      </div>
    </div>
  );
}
