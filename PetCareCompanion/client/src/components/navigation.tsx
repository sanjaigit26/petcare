import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Heart, LayoutDashboard, Plus, User, Info, Phone } from "lucide-react";
import Logo from "@/components/logo";

export default function Navigation() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home", icon: Heart },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/add-pet", label: "Add Pet", icon: Plus },
    { href: "/about", label: "About", icon: Info },
    { href: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <header className="relative z-10 bg-white/80 backdrop-blur-md shadow-lg border-b border-border/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <Link href="/">
            <div className="cursor-pointer">
              <Logo size="md" showText={true} />
            </div>
          </Link>
          
          <nav className="hidden md:flex space-x-8">
            {navItems.map(({ href, label, icon: Icon }) => (
              <Link key={href} href={href}>
                <Button
                  variant="ghost"
                  className={`nav-link ${location === href ? 'active' : ''}`}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  {label}
                </Button>
              </Link>
            ))}
          </nav>
          
          <Button className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white">
            <User className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Account</span>
          </Button>
        </div>
      </div>
      
      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border/40 px-4 py-3">
        <div className="flex justify-around">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <Button
                variant="ghost"
                size="sm"
                className={`nav-link flex-col h-auto py-2 ${location === href ? 'active' : ''}`}
              >
                <Icon className="h-4 w-4 mb-1" />
                <span className="text-xs">{label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
