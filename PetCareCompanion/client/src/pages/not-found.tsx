import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";
import Logo from "@/components/logo";

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={true} />
          </div>
          <div className="text-8xl font-bold text-primary-blue mb-4">404</div>
          <h1 className="text-3xl font-bold text-charcoal mb-4">
            Oops! Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            It looks like the page you're looking for has wandered off like a curious puppy. 
            Let's get you back on track!
          </p>
        </div>
        
        <div className="space-y-4">
          <Link href="/">
            <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white w-full">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Button>
          </Link>
          
          <Link href="/dashboard">
            <Button variant="outline" className="interactive-button w-full">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Button>
          </Link>

          <Link href="/about">
            <Button variant="outline" className="interactive-button w-full">
              <Search className="mr-2 h-4 w-4" />
              Learn About PawPal
            </Button>
          </Link>
        </div>
        
        <div className="mt-8">
          <img 
            src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
            alt="Cute lost puppy"
            className="rounded-lg mx-auto opacity-80"
          />
        </div>
      </div>
    </div>
  );
}
