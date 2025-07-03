import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ReactNode } from "react";

interface StatsCardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: ReactNode;
  color: "blue" | "green" | "orange";
  progress?: number;
  showPulse?: boolean;
  actionButton?: ReactNode;
}

export default function StatsCard({
  title,
  value,
  subtitle,
  icon,
  color,
  progress,
  showPulse = false,
  actionButton,
}: StatsCardProps) {
  const colorClass = `stats-card ${color}`;

  return (
    <Card className={colorClass}>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-white/80 text-sm font-medium">{title}</p>
            <p className="text-4xl font-bold text-white">{value}</p>
          </div>
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
            <div className="text-white text-2xl">
              {icon}
            </div>
          </div>
        </div>
        
        {progress !== undefined && (
          <div className="w-full bg-white/20 rounded-full h-2 mb-2">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-300" 
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <p className="text-white/80 text-sm">{subtitle}</p>
          {showPulse && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
            </div>
          )}
        </div>
        
        {actionButton && actionButton}
      </CardContent>
    </Card>
  );
}
