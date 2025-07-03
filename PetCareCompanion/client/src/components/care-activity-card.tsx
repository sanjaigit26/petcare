import { Card, CardContent } from "@/components/ui/card";
import { ReactNode } from "react";

interface CareActivityCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color: "blue" | "green" | "orange" | "purple";
  image: string;
}

export default function CareActivityCard({ 
  icon, 
  title, 
  description, 
  color, 
  image 
}: CareActivityCardProps) {
  const colorClasses = {
    blue: "bg-primary-blue",
    green: "bg-primary-green", 
    orange: "bg-primary-orange",
    purple: "bg-purple-500"
  };

  return (
    <Card className="card-hover-effect bg-white/90 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <img 
          src={image} 
          alt={title}
          className="w-full h-32 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>
      
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 ${colorClasses[color]} rounded-full flex items-center justify-center mx-auto mb-4`}>
          <div className="text-white text-xl">
            {icon}
          </div>
        </div>
        <h3 className="text-xl font-bold text-charcoal mb-2">{title}</h3>
        <p className="text-charcoal/70 text-sm">{description}</p>
      </CardContent>
    </Card>
  );
}
