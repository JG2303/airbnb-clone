export default function SkeletonCard({ favorito = false }) {
  return (
    <div className="animate-pulse">
      <div
        className={`relative bg-gray-300 rounded-3xl w-[150px] h-[150px] ${
          favorito
            ? "w-full h-[300px] md:w-[440px] md:h-[400px]"
            : "md:w-[300px] md:h-[300px]"
        }`}
      ></div>
      <div className="mt-2 space-y-1">
        <div className="h-4 bg-gray-300 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded w-1/2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/3"></div>
      </div>
    </div>
  )
}
