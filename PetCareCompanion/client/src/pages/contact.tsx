import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  HeadphonesIcon,
  Users
} from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    priority: "medium"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        priority: "medium"
      });
      setIsSubmitting(false);
    }, 1000);
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const contactInfo = [
    {
      icon: <Mail className="h-6 w-6" />,
      title: "Email Support",
      details: "hello@pawpal.com",
      description: "Get help via email within 24 hours"
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: "Phone Support",
      details: "1-800-PAWPAL-1",
      description: "Mon-Fri 9AM-6PM PST"
    },
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Live Chat",
      details: "Available 24/7",
      description: "Instant help when you need it"
    },
    {
      icon: <MapPin className="h-6 w-6" />,
      title: "Office",
      details: "San Francisco, CA",
      description: "123 Pet Care Avenue, Suite 100"
    }
  ];

  const faqItems = [
    {
      question: "How do I add my first pet?",
      answer: "Click the 'Add Pet' button in your dashboard and fill out the pet information form."
    },
    {
      question: "Can I track multiple pets?",
      answer: "Yes! PawPal supports unlimited pets in your account."
    },
    {
      question: "Is my pet's data secure?",
      answer: "Absolutely. We use enterprise-grade encryption and never share your data."
    },
    {
      question: "Do you offer veterinary consultations?",
      answer: "We partner with licensed veterinarians for virtual consultations through the app."
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-charcoal mb-6">
            Contact 
            <span className="bg-gradient-to-r from-primary-blue via-primary-green to-primary-orange bg-clip-text text-transparent">
              Us
            </span>
          </h1>
          <p className="text-xl text-charcoal/70 max-w-2xl mx-auto mb-8">
            Have questions about PawPal? Need help with your pet's care? We're here to help you and your furry friends.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-10 py-16 bg-white/80 backdrop-blur-md">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => (
              <Card key={index} className="card-hover-effect text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-blue to-primary-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="text-white">
                      {info.icon}
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-charcoal mb-2">
                    {info.title}
                  </h3>
                  <p className="text-primary-blue font-semibold mb-2">
                    {info.details}
                  </p>
                  <p className="text-sm text-charcoal/70">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-2xl text-charcoal">
                  <Send className="mr-3 h-6 w-6 text-primary-blue" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleChange("name", e.target.value)}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => handleChange("subject", e.target.value)}
                      placeholder="How can we help?"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="priority">Priority</Label>
                    <Select onValueChange={(value) => handleChange("priority", value)} defaultValue={formData.priority}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low - General inquiry</SelectItem>
                        <SelectItem value="medium">Medium - Account help</SelectItem>
                        <SelectItem value="high">High - Urgent issue</SelectItem>
                        <SelectItem value="critical">Critical - Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleChange("message", e.target.value)}
                      placeholder="Tell us more about your question or concern..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="mr-2 h-4 w-4" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* FAQ Section */}
            <div>
              <Card className="mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center text-2xl text-charcoal">
                    <HeadphonesIcon className="mr-3 h-6 w-6 text-primary-green" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {faqItems.map((faq, index) => (
                    <div key={index} className="border-b border-border/20 pb-4 last:border-0">
                      <h4 className="font-semibold text-charcoal mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-charcoal/70 text-sm">
                        {faq.answer}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Support Hours */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-xl text-charcoal">
                    <Clock className="mr-3 h-5 w-5 text-primary-orange" />
                    Support Hours
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-charcoal">Monday - Friday</span>
                      <span className="text-charcoal font-medium">9:00 AM - 6:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal">Saturday</span>
                      <span className="text-charcoal font-medium">10:00 AM - 4:00 PM PST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-charcoal">Sunday</span>
                      <span className="text-charcoal font-medium">Emergency only</span>
                    </div>
                    <div className="mt-4 p-3 bg-primary-blue/10 rounded-lg">
                      <p className="text-sm text-primary-blue">
                        For pet emergencies, please contact your local veterinarian immediately.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Team Support Section */}
      <section className="relative z-10 py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center">
              <Users className="h-10 w-10 text-primary-blue" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-charcoal mb-6">
            Our Support Team is Here for You
          </h2>
          <p className="text-xl text-charcoal/70 mb-8 max-w-2xl mx-auto">
            Every member of our support team is a pet parent themselves. We understand your concerns and are committed to helping you provide the best care for your furry family members.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="interactive-button bg-white text-primary-blue hover:bg-gray-50">
              <MessageCircle className="mr-2 h-5 w-5" />
              Start Live Chat
            </Button>
            <Button size="lg" variant="outline" className="interactive-button border-2 border-white text-charcoal hover:bg-white/10">
              <Phone className="mr-2 h-5 w-5" />
              Call Support
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}