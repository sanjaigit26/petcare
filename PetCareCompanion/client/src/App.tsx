import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import Dashboard from "@/pages/dashboard";
import PetProfile from "@/pages/pet-profile";
import AddPet from "@/pages/add-pet";
import About from "@/pages/about";
import Contact from "@/pages/contact";
import NotFound from "@/pages/not-found";
import Navigation from "@/components/navigation";
import FloatingElements from "@/components/floating-elements";

function Router() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-blue via-mint-green to-soft-peach">
      <FloatingElements />
      <Navigation />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/pet/:id" component={PetProfile} />
        <Route path="/add-pet" component={AddPet} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
