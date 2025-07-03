import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import PetCard from "@/components/pet-card";
import CareActivityCard from "@/components/care-activity-card";
import Logo from "@/components/logo";
import { usePets } from "@/hooks/use-pets";
import { useCareActivities } from "@/hooks/use-care-activities";
import { 
  Heart, 
  Camera, 
  Calendar, 
  Stethoscope, 
  Utensils, 
  Dumbbell, 
  Scissors,
  Download,
  Play,
  Smartphone
} from "lucide-react";

export default function Home() {
  const { data: pets = [], isLoading: petsLoading } = usePets();
  const { data: activities = [], isLoading: activitiesLoading } = useCareActivities();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-7xl font-bold text-charcoal mb-6">
              Premium Pet Care
              <span className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-orange bg-clip-text text-transparent block">
                Made Simple
              </span>
            </h1>
            <p className="text-xl text-charcoal/70 max-w-3xl mx-auto mb-12">
              Track, manage, and care for your beloved pets with our ultra-modern, AI-powered platform designed for the modern pet parent.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/dashboard">
                <Button size="lg" className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white px-8 py-4 text-lg">
                  <Heart className="mr-2 h-5 w-5" />
                  Get Started
                </Button>
              </Link>
              <Link href="/about">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="interactive-button border-2 border-charcoal/20 text-charcoal hover:bg-charcoal/5 px-8 py-4 text-lg"
                >
                  <Play className="mr-2 h-5 w-5" />
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Device Mockups */}
          <div className="flex justify-center items-center mb-20 relative">
            <div className="device-mockup mr-8 hidden md:block">
              {/* Tablet Mockup */}
              <div className="relative w-80 h-96 bg-charcoal rounded-3xl p-4 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="h-full gradient-bg p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-2xl font-bold text-charcoal">Dashboard</h3>
                      <div className="w-12 h-12 bg-primary-green rounded-full flex items-center justify-center">
                        <Heart className="text-white h-6 w-6" />
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      {pets.slice(0, 2).map((pet) => (
                        <Card key={pet.id} className="pet-card">
                          <CardContent className="p-4">
                            <img 
                              src={pet.photoUrl || "/api/placeholder/300/200"} 
                              alt={pet.name}
                              className="w-full h-24 object-cover rounded-lg mb-3"
                            />
                            <h4 className="font-semibold text-charcoal text-sm">{pet.name}</h4>
                            <p className="text-xs text-charcoal/60">{pet.breed}</p>
                            <div className="flex items-center mt-2">
                              <div className={`w-2 h-2 rounded-full mr-2 ${
                                pet.healthStatus === 'healthy' ? 'bg-primary-green' : 
                                pet.healthStatus === 'needs_attention' ? 'bg-primary-orange' : 'bg-red-500'
                              }`}></div>
                              <span className={`text-xs ${
                                pet.healthStatus === 'healthy' ? 'text-primary-green' : 
                                pet.healthStatus === 'needs_attention' ? 'text-primary-orange' : 'text-red-500'
                              }`}>
                                {pet.healthStatus === 'healthy' ? 'Healthy' : 
                                 pet.healthStatus === 'needs_attention' ? 'Check-up' : 'Sick'}
                              </span>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="device-mockup">
              {/* Phone Mockup */}
              <div className="relative w-72 h-96 bg-charcoal rounded-3xl p-3 shadow-2xl">
                <div className="w-full h-full bg-white rounded-2xl overflow-hidden">
                  <div className="h-full bg-gradient-to-br from-soft-peach to-soft-blue">
                    <div className="bg-white px-6 py-4 flex items-center justify-between">
                      <Logo size="sm" showText={true} />
                      <div className="w-6 h-6 bg-primary-orange rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">3</span>
                      </div>
                    </div>

                    <div className="p-4">
                      <Card className="mb-4 shadow-lg">
                        <CardContent className="p-4">
                          <h3 className="font-bold text-charcoal mb-2">Good Morning! 🌅</h3>
                          <p className="text-sm text-charcoal/70">
                            {pets.length > 0 ? `${pets[0].name} needs attention` : 'Your pets miss you!'}
                          </p>
                        </CardContent>
                      </Card>

                      {pets.length > 0 && (
                        <Card className="pet-card mb-4 shadow-lg">
                          <CardContent className="p-4">
                            <img 
                              src={pets[0].photoUrl || "/api/placeholder/400/300"} 
                              alt={pets[0].name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-charcoal">{pets[0].name}</h4>
                                <p className="text-xs text-charcoal/60">{pets[0].breed}</p>
                              </div>
                              <Button 
                                size="sm" 
                                className="interactive-button bg-primary-green hover:bg-primary-green/90 text-white"
                              >
                                <Heart className="mr-1 h-3 w-3" />
                                Care
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      )}

                      <div className="grid grid-cols-2 gap-3">
                        <Button className="interactive-button bg-primary-blue hover:bg-primary-blue/90 text-white p-4 h-auto flex-col">
                          <Camera className="h-6 w-6 mb-2" />
                          <span className="text-sm font-medium">Add Photo</span>
                        </Button>
                        <Button className="interactive-button bg-primary-orange hover:bg-primary-orange/90 text-white p-4 h-auto flex-col">
                          <Calendar className="h-6 w-6 mb-2" />
                          <span className="text-sm font-medium">Schedule</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pet Profiles Section */}
      <section className="relative z-10 py-20 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Meet Your Favorite Companions
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Create detailed profiles for each of your pets with photos, health records, and personalized care plans.
            </p>
          </div>

          {petsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-lg">
                  <div className="w-full h-48 bg-muted animate-pulse"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-muted animate-pulse rounded"></div>
                    <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
                    <div className="h-8 bg-muted animate-pulse rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} />
              ))}
              {pets.length === 0 && (
                <div className="col-span-full text-center py-12">
                  <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-charcoal mb-2">No pets yet</h3>
                  <p className="text-muted-foreground mb-4">Start by adding your first furry friend!</p>
                  <Link href="/add-pet">
                    <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
                      Add Your First Pet
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Care Activities Section */}
      <section className="relative z-10 py-20 gradient-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
              Premium Care Activities
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Track and manage all aspects of your pet's health and wellness with our comprehensive care system.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <CareActivityCard
              icon={<Stethoscope className="h-5 w-5" />}
              title="Health Checkups"
              description="Schedule and track veterinary visits and health records"
              color="blue"
              image="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
            />
            <CareActivityCard
              icon={<Utensils className="h-5 w-5" />}
              title="Feeding Schedule"
              description="Monitor diet, nutrition, and feeding times"
              color="green"
              image="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
            />
            <CareActivityCard
              icon={<Dumbbell className="h-5 w-5" />}
              title="Exercise Tracking"
              description="Log walks, playtime, and physical activities"
              color="orange"
              image="https://images.unsplash.com/photo-1544717297-fa95b6ee9643?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
            />
            <CareActivityCard
              icon={<Scissors className="h-5 w-5" />}
              title="Grooming Care"
              description="Schedule baths, brushing, and grooming appointments"
              color="purple"
              image="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250"
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 py-20 gradient-bg">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl md:text-5xl font-bold text-charcoal mb-6">
            Ready to Transform Pet Care?
          </h2>
          <p className="text-xl text-charcoal/70 mb-10 max-w-2xl mx-auto">
            Join thousands of happy pet parents who trust PawPal to keep their furry friends healthy and happy.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/dashboard">
              <Button size="lg" className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white px-8 py-4 text-lg">
                <Smartphone className="mr-2 h-5 w-5" />
                Get Started
              </Button>
            </Link>
            <Link href="/contact">
              <Button 
                size="lg" 
                variant="outline" 
                className="interactive-button bg-white text-charcoal hover:bg-gray-50 border-2 border-charcoal/20 px-8 py-4 text-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                Get Support
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
