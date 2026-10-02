import Image from "next/image";

interface LoadingIndicatorProps {
  className?: string;
}

export default function LoadingIndicator({ className = "" }: LoadingIndicatorProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-4 ${className}`}>
      <div className="relative w-16 h-16 mb-2">
        <Image
          src="/videos/download.gif"
          alt="Loading..."
          fill
          className="object-contain"
        />
      </div>
      <p className="text-[#526456] text-sm font-semibold animate-pulse">
        Loading...
      </p>
    </div>
  );
}
