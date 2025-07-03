import { useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import type { Pet } from "@shared/schema";

interface ThreePetCardProps {
  pet: Pet;
  className?: string;
}

export default function ThreePetCard({ pet, className = "" }: ThreePetCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 10;
    const rotateY = (centerX - x) / 10;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(${rotateX}deg) 
      rotateY(${rotateY}deg) 
      translateZ(20px)
    `;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    
    cardRef.current.style.transform = `
      perspective(1000px) 
      rotateX(0deg) 
      rotateY(0deg) 
      translateZ(0px)
    `;
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div className={`three-pet-card ${className}`}>
      <Card
        ref={cardRef}
        className="bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-300 cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseEnter={handleMouseEnter}
        style={{
          transformStyle: "preserve-3d",
          transition: isHovered ? "none" : "transform 0.3s ease-out",
        }}
      >
        <div className="relative">
          <img 
            src={pet.photoUrl || "/api/placeholder/400/300"} 
            alt={pet.name}
            className="w-full h-48 object-cover"
            style={{
              transform: isHovered ? "translateZ(30px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out",
            }}
          />
          <div 
            className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"
            style={{
              transform: isHovered ? "translateZ(25px)" : "translateZ(0px)",
              transition: "transform 0.3s ease-out",
            }}
          />
        </div>
        
        <CardContent 
          className="p-6"
          style={{
            transform: isHovered ? "translateZ(40px)" : "translateZ(0px)",
            transition: "transform 0.3s ease-out",
          }}
        >
          <h3 className="text-xl font-bold text-charcoal mb-2">{pet.name}</h3>
          <p className="text-charcoal/60 mb-4">
            {pet.breed} • {pet.age} year{pet.age !== 1 ? 's' : ''} old
          </p>
          <div className="flex items-center">
            <div className={`w-3 h-3 rounded-full mr-2 ${
              pet.healthStatus === 'healthy' ? 'bg-primary-green' : 
              pet.healthStatus === 'needs_attention' ? 'bg-primary-orange' : 'bg-red-500'
            }`}></div>
            <span className={`text-sm ${
              pet.healthStatus === 'healthy' ? 'text-primary-green' : 
              pet.healthStatus === 'needs_attention' ? 'text-primary-orange' : 'text-red-500'
            }`}>
              {pet.healthStatus === 'healthy' ? 'Healthy' : 
               pet.healthStatus === 'needs_attention' ? 'Check-up' : 'Sick'}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
