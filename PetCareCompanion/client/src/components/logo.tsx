import { Heart } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl"
  };

  const iconSizeClasses = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8"
  };

  return (
    <div className={`flex items-center space-x-3 ${className}`}>
      <div className={`${sizeClasses[size]} bg-gradient-to-br from-primary-blue to-primary-green rounded-2xl flex items-center justify-center shadow-lg`}>
        <Heart className={`text-white ${iconSizeClasses[size]}`} />
      </div>
      {showText && (
        <span className={`font-bold bg-gradient-to-r from-primary-blue via-primary-green to-primary-orange bg-clip-text text-transparent ${textSizeClasses[size]}`}>
          PawPal
        </span>
      )}
    </div>
  );
}