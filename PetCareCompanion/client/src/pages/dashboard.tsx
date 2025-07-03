import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import PetCard from "@/components/pet-card";
import StatsCard from "@/components/stats-card";
import { usePets } from "@/hooks/use-pets";
import { useCareActivities } from "@/hooks/use-care-activities";
import { useQuery } from "@tanstack/react-query";
import { 
  Plus, 
  Heart, 
  Activity, 
  CheckCircle, 
  Calendar,
  TrendingUp,
  Target,
  Award
} from "lucide-react";

export default function Dashboard() {
  const { data: pets = [], isLoading: petsLoading } = usePets();
  const { data: activities = [], isLoading: activitiesLoading } = useCareActivities();
  
  const { data: dashboardStats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const pendingActivities = activities.filter(a => !a.completed);
  const completedToday = activities.filter(a => 
    a.completed && 
    a.completedDate && 
    new Date(a.completedDate).toDateString() === new Date().toDateString()
  );

  if (petsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/4 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-32 bg-muted rounded-2xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-charcoal mb-2">
            Welcome back! 👋
          </h1>
          <p className="text-muted-foreground">
            {pets.length > 0 
              ? `You have ${pets.length} pet${pets.length !== 1 ? 's' : ''} and ${pendingActivities.length} pending task${pendingActivities.length !== 1 ? 's' : ''}`
              : "Start by adding your first pet"
            }
          </p>
        </div>
        <Link href="/add-pet">
          <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
            <Plus className="mr-2 h-4 w-4" />
            Add Pet
          </Button>
        </Link>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <StatsCard
          title="Daily Steps"
          value={dashboardStats?.dailySteps?.toLocaleString() || "0"}
          subtitle={`${dashboardStats?.stepGoalProgress || 0}% of daily goal`}
          icon={<Activity className="h-6 w-6" />}
          color="blue"
          progress={dashboardStats?.stepGoalProgress || 0}
        />
        
        <StatsCard
          title="Health Score"
          value={`${dashboardStats?.healthScore || 0}%`}
          subtitle="Excellent condition"
          icon={<Heart className="h-6 w-6" />}
          color="green"
          showPulse
        />
        
        <StatsCard
          title="Care Tasks"
          value={pendingActivities.length.toString()}
          subtitle="Pending reminders"
          icon={<CheckCircle className="h-6 w-6" />}
          color="orange"
          actionButton={
            <Button 
              size="sm" 
              variant="secondary" 
              className="mt-3 bg-white/20 text-white hover:bg-white/30 border-0"
            >
              View All
            </Button>
          }
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pets Section */}
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-charcoal">Your Pets</h2>
            <Link href="/add-pet">
              <Button variant="outline" size="sm" className="interactive-button">
                <Plus className="mr-2 h-4 w-4" />
                Add Pet
              </Button>
            </Link>
          </div>
          
          {pets.length === 0 ? (
            <Card className="p-12 text-center">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-charcoal mb-2">No pets yet</h3>
              <p className="text-muted-foreground mb-4">
                Start your pet care journey by adding your first furry friend!
              </p>
              <Link href="/add-pet">
                <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Your First Pet
                </Button>
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pets.map((pet) => (
                <PetCard key={pet.id} pet={pet} showActions />
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <Calendar className="mr-2 h-5 w-5" />
                Recent Activities
              </CardTitle>
            </CardHeader>
            <CardContent>
              {completedToday.length > 0 ? (
                <div className="space-y-3">
                  {completedToday.slice(0, 3).map((activity) => (
                    <div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                      <CheckCircle className="h-4 w-4 text-primary-green" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-charcoal truncate">
                          {activity.title}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Completed today
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    No activities completed today
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Tasks */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <Target className="mr-2 h-5 w-5" />
                Upcoming Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {pendingActivities.length > 0 ? (
                <div className="space-y-3">
                  {pendingActivities.slice(0, 3).map((activity) => {
                    const pet = pets.find(p => p.id === activity.petId);
                    return (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-primary-blue/5 border border-primary-blue/10 rounded-lg">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'medical' ? 'bg-red-500' :
                          activity.type === 'grooming' ? 'bg-purple-500' :
                          activity.type === 'exercise' ? 'bg-primary-orange' :
                          'bg-primary-green'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {pet?.name} • {new Date(activity.scheduledDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="text-center py-4">
                  <Award className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    All caught up! Great job!
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-charcoal">
                <TrendingUp className="mr-2 h-5 w-5" />
                Quick Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Pets</span>
                <span className="text-lg font-semibold text-charcoal">{pets.length}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Healthy Pets</span>
                <span className="text-lg font-semibold text-primary-green">
                  {pets.filter(p => p.healthStatus === 'healthy').length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Completed Today</span>
                <span className="text-lg font-semibold text-primary-blue">
                  {completedToday.length}
                </span>
              </div>
              <div className="pt-2">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Weekly Progress</span>
                  <span className="text-sm font-medium text-charcoal">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
