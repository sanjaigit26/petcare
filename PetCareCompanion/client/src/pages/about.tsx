import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Heart, 
  Users, 
  Shield, 
  Award, 
  Star,
  CheckCircle,
  ArrowRight,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

export default function About() {
  const features = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Pet-First Approach",
      description: "Every feature is designed with your pet's wellbeing as the top priority."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Secure & Private",
      description: "Your pet's data is protected with enterprise-grade security and privacy measures."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Expert Team",
      description: "Built by veterinarians, pet behaviorists, and experienced pet parents."
    },
    {
      icon: <Award className="h-6 w-6" />,
      title: "Award Winning",
      description: "Recognized as the #1 pet care app by Pet Care Magazine 2024."
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Pet Parents" },
    { number: "200K+", label: "Pets Cared For" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9★", label: "App Store Rating" }
  ];

  const team = [
    {
      name: "Dr. Sarah Johnson",
      role: "Veterinarian & Co-Founder",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Mike Chen",
      role: "Pet Behaviorist & Co-Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    },
    {
      name: "Emma Rodriguez",
      role: "Lead Product Designer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b865?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6">
            About 
            <span className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-orange bg-clip-text text-transparent">
              PawPal
            </span>
          </h1>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto mb-8">
            We're on a mission to revolutionize pet care through technology, making it easier for pet parents to give their furry friends the best life possible.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 py-16 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold text-primary-blue mb-2">
                  {stat.number}
                </div>
                <div className="text-charcoal/70 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-charcoal mb-6">
                Our Story
              </h2>
              <p className="text-lg text-charcoal/70 mb-6">
                PawPal was born from a simple frustration: keeping track of our pets' health, activities, and care schedules was scattered across sticky notes, multiple apps, and our memory.
              </p>
              <p className="text-lg text-charcoal/70 mb-6">
                As veterinarians and devoted pet parents ourselves, we knew there had to be a better way. So we built PawPal - a comprehensive platform that brings everything together in one beautiful, easy-to-use app.
              </p>
              <p className="text-lg text-charcoal/70 mb-8">
                Today, PawPal helps thousands of pet parents provide better care for their beloved companions while reducing stress and never missing important moments.
              </p>
              <Link href="/dashboard">
                <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400"
                alt="Happy pet with owner"
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 gradient-bg">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">
              Why Choose PawPal?
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              We're not just another app - we're your partner in providing the best care for your pets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="card-hover-effect bg-white/90 backdrop-blur-md">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-green rounded-full flex items-center justify-center mb-6">
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-charcoal mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-charcoal/70">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 py-20 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-charcoal mb-6">
              Meet Our Team
            </h2>
            <p className="text-xl text-charcoal/70 max-w-2xl mx-auto">
              Passionate pet lovers and experts dedicated to improving pet care worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="card-hover-effect text-center">
                <CardContent className="p-8">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-6 object-cover"
                  />
                  <h3 className="text-xl font-bold text-charcoal mb-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-blue font-medium">
                    {member.role}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="relative z-10 py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-charcoal mb-6">
            Get in Touch
          </h2>
          <p className="text-xl text-charcoal/70 mb-12">
            Have questions or feedback? We'd love to hear from you!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-blue rounded-full flex items-center justify-center mb-4">
                <Mail className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Email</h3>
              <p className="text-charcoal/70">hello@pawpal.com</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-green rounded-full flex items-center justify-center mb-4">
                <Phone className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Phone</h3>
              <p className="text-charcoal/70">1-800-PAWPAL-1</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 bg-primary-orange rounded-full flex items-center justify-center mb-4">
                <MapPin className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-charcoal mb-2">Office</h3>
              <p className="text-charcoal/70">San Francisco, CA</p>
            </div>
          </div>

          <Link href="/dashboard">
            <Button size="lg" className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
              Start Caring Better Today
              <Heart className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}