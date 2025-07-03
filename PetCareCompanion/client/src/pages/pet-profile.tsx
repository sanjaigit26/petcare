import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { usePets } from "@/hooks/use-pets";
import { useCareActivities } from "@/hooks/use-care-activities";
import { useQuery } from "@tanstack/react-query";
import { 
  ArrowLeft, 
  Heart, 
  Calendar, 
  Weight, 
  Activity, 
  Stethoscope,
  Camera,
  Edit,
  Plus,
  CheckCircle,
  Clock,
  TrendingUp
} from "lucide-react";

export default function PetProfile() {
  const { id } = useParams<{ id: string }>();
  const petId = parseInt(id || "0");
  
  const { data: pets = [] } = usePets();
  const { data: activities = [] } = useCareActivities();
  
  const { data: healthRecords = [] } = useQuery({
    queryKey: [`/api/pets/${petId}/health-records`],
    enabled: !!petId,
  });

  const { data: dailyStats = [] } = useQuery({
    queryKey: [`/api/pets/${petId}/stats`],
    enabled: !!petId,
  });

  const pet = pets.find(p => p.id === petId);
  const petActivities = activities.filter(a => a.petId === petId);
  const completedActivities = petActivities.filter(a => a.completed);
  const pendingActivities = petActivities.filter(a => !a.completed);

  if (!pet) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-charcoal mb-2">Pet Not Found</h1>
          <p className="text-muted-foreground mb-4">The pet you're looking for doesn't exist.</p>
          <Link href="/dashboard">
            <Button variant="outline">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const healthStatusColor = 
    pet.healthStatus === 'healthy' ? 'bg-primary-green' : 
    pet.healthStatus === 'needs_attention' ? 'bg-primary-orange' : 'bg-red-500';

  const healthStatusText = 
    pet.healthStatus === 'healthy' ? 'Healthy' : 
    pet.healthStatus === 'needs_attention' ? 'Needs Attention' : 'Sick';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-charcoal">Pet Profile</h1>
      </div>

      {/* Pet Header Card */}
      <Card className="mb-8 overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/3">
            <div className="relative aspect-square md:aspect-[4/3]">
              <img 
                src={pet.photoUrl || "/api/placeholder/400/400"} 
                alt={pet.name}
                className="w-full h-full object-cover"
              />
              <Button 
                size="sm" 
                className="absolute bottom-4 right-4 bg-white/90 text-charcoal hover:bg-white"
              >
                <Camera className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h2 className="text-4xl font-bold text-charcoal mb-2">{pet.name}</h2>
                <p className="text-xl text-muted-foreground mb-4">
                  {pet.breed} • {pet.age} year{pet.age !== 1 ? 's' : ''} old
                </p>
                <Badge 
                  className={`${healthStatusColor} text-white border-0`}
                >
                  {healthStatusText}
                </Badge>
              </div>
              <Button variant="outline" size="sm" className="interactive-button">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Weight className="h-6 w-6 text-primary-blue mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Weight</p>
                <p className="text-lg font-semibold text-charcoal">{pet.weight} lbs</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Calendar className="h-6 w-6 text-primary-green mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Next Checkup</p>
                <p className="text-lg font-semibold text-charcoal">
                  {pet.nextCheckup ? new Date(pet.nextCheckup).toLocaleDateString() : 'Not scheduled'}
                </p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Activity className="h-6 w-6 text-primary-orange mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Activities</p>
                <p className="text-lg font-semibold text-charcoal">{petActivities.length}</p>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <Heart className="h-6 w-6 text-red-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Species</p>
                <p className="text-lg font-semibold text-charcoal capitalize">{pet.species}</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="health">Health</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pending Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Clock className="mr-2 h-5 w-5" />
                    Pending Tasks
                  </span>
                  <Badge variant="secondary">{pendingActivities.length}</Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {pendingActivities.length > 0 ? (
                  <div className="space-y-3">
                    {pendingActivities.slice(0, 3).map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
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
                            {new Date(activity.scheduledDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <CheckCircle className="h-8 w-8 text-primary-green mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">All caught up!</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Recent Health Records */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center">
                    <Stethoscope className="mr-2 h-5 w-5" />
                    Recent Health
                  </span>
                  <Button variant="ghost" size="sm">
                    <Plus className="h-4 w-4" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {healthRecords.length > 0 ? (
                  <div className="space-y-3">
                    {healthRecords.slice(0, 3).map((record) => (
                      <div key={record.id} className="flex items-center space-x-3 p-3 bg-muted/50 rounded-lg">
                        <Stethoscope className="h-4 w-4 text-primary-blue" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">
                            {record.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(record.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-4">
                    <Stethoscope className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No health records yet</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-charcoal">Care Activities</h3>
            <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Activity
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Completed ({completedActivities.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {completedActivities.length > 0 ? (
                  <div className="space-y-3">
                    {completedActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-primary-green/5 border border-primary-green/10 rounded-lg">
                        <CheckCircle className="h-4 w-4 text-primary-green" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Completed {activity.completedDate ? new Date(activity.completedDate).toLocaleDateString() : 'recently'}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Activity className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">No completed activities yet</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending ({pendingActivities.length})</CardTitle>
              </CardHeader>
              <CardContent>
                {pendingActivities.length > 0 ? (
                  <div className="space-y-3">
                    {pendingActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center space-x-3 p-3 bg-primary-blue/5 border border-primary-blue/10 rounded-lg">
                        <Clock className="h-4 w-4 text-primary-blue" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-charcoal truncate">
                            {activity.title}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Due {new Date(activity.scheduledDate).toLocaleDateString()}
                          </p>
                        </div>
                        <Button size="sm" variant="outline">
                          Complete
                        </Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <CheckCircle className="h-8 w-8 text-primary-green mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">All activities completed!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="health" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-charcoal">Health Records</h3>
            <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
              <Plus className="mr-2 h-4 w-4" />
              Add Record
            </Button>
          </div>

          <Card>
            <CardContent className="pt-6">
              {healthRecords.length > 0 ? (
                <div className="space-y-4">
                  {healthRecords.map((record) => (
                    <div key={record.id} className="border border-border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-charcoal">{record.title}</h4>
                        <Badge variant="outline" className="capitalize">
                          {record.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        {new Date(record.date).toLocaleDateString()}
                      </p>
                      {record.veterinarian && (
                        <p className="text-sm text-muted-foreground mb-2">
                          Dr. {record.veterinarian}
                        </p>
                      )}
                      {record.notes && (
                        <p className="text-sm text-charcoal">{record.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Stethoscope className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-charcoal mb-2">No health records yet</h4>
                  <p className="text-muted-foreground mb-4">
                    Start tracking {pet.name}'s health by adding their first record.
                  </p>
                  <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
                    <Plus className="mr-2 h-4 w-4" />
                    Add First Record
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Activity Level
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Daily Average</span>
                    <span className="text-lg font-semibold text-charcoal">High</span>
                  </div>
                  <Progress value={85} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {pet.name} is very active compared to other {pet.breed}s
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Heart className="mr-2 h-5 w-5" />
                  Health Trend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Overall Score</span>
                    <span className="text-lg font-semibold text-primary-green">Excellent</span>
                  </div>
                  <Progress value={95} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Maintaining excellent health status
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Care Completion
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">This Month</span>
                    <span className="text-lg font-semibold text-charcoal">90%</span>
                  </div>
                  <Progress value={90} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    Great job keeping up with care tasks!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
