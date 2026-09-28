import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black/80 fixed inset-0 z-50">
      <div className="relative w-32 h-32 mb-4">
        <Image
          src="/videos/download.gif"
          alt="Loading..."
          fill
          className="object-contain"
        />
      </div>
      <p className="text-white text-xl font-bold animate-pulse">
        Loading...
      </p>
    </div>
  );
}
