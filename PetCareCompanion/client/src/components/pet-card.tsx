import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Calendar, Weight, Eye } from "lucide-react";
import type { Pet } from "@shared/schema";

interface PetCardProps {
  pet: Pet;
  showActions?: boolean;
}

export default function PetCard({ pet, showActions = false }: PetCardProps) {
  const healthStatusColor = 
    pet.healthStatus === 'healthy' ? 'bg-primary-green' : 
    pet.healthStatus === 'needs_attention' ? 'bg-primary-orange' : 'bg-red-500';

  const healthStatusText = 
    pet.healthStatus === 'healthy' ? 'Healthy' : 
    pet.healthStatus === 'needs_attention' ? 'Check-up' : 'Sick';

  return (
    <Card className="pet-card bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform-gpu">
      <div className="relative overflow-hidden">
        <img 
          src={pet.photoUrl || "/api/placeholder/400/300"} 
          alt={pet.name}
          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-3 right-3">
          <div className={`w-3 h-3 ${healthStatusColor} rounded-full border-2 border-white shadow-lg`}></div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-charcoal">{pet.name}</h3>
          <Badge 
            className={`${healthStatusColor} text-white border-0 text-xs`}
          >
            {healthStatusText}
          </Badge>
        </div>
        
        <p className="text-charcoal/60 mb-4">
          {pet.breed} • {pet.age} year{pet.age !== 1 ? 's' : ''} old
        </p>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-charcoal/70">
            <Weight className="text-primary-blue mr-2 h-4 w-4" />
            <span>{pet.weight} lbs</span>
          </div>
          <div className="flex items-center text-sm text-charcoal/70">
            <Calendar className="text-primary-green mr-2 h-4 w-4" />
            <span>
              {pet.nextCheckup 
                ? `Next checkup: ${new Date(pet.nextCheckup).toLocaleDateString()}`
                : 'No checkup scheduled'
              }
            </span>
          </div>
        </div>
        
        <Link href={`/pet/${pet.id}`}>
          <Button 
            className="interactive-button w-full bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white"
          >
            <Eye className="mr-2 h-4 w-4" />
            View Profile
          </Button>
        </Link>
        
        {showActions && (
          <div className="mt-3 flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1">
              <Heart className="mr-1 h-3 w-3" />
              Care
            </Button>
            <Button size="sm" variant="outline" className="flex-1">
              <Calendar className="mr-1 h-3 w-3" />
              Schedule
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
