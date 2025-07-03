import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { insertPetSchema } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Upload, Camera, Heart } from "lucide-react";
import { Link } from "wouter";
import type { z } from "zod";

type PetFormData = z.infer<typeof insertPetSchema>;

const popularBreeds = {
  dog: [
    "Labrador Retriever", "Golden Retriever", "German Shepherd", "French Bulldog",
    "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Siberian Husky",
    "Border Collie", "Boxer", "Dachshund", "Australian Shepherd", "Shih Tzu"
  ],
  cat: [
    "Persian", "Maine Coon", "British Shorthair", "Ragdoll", "Bengal",
    "Siamese", "Abyssinian", "Russian Blue", "Scottish Fold", "Sphynx",
    "American Shorthair", "Norwegian Forest Cat", "Oriental Shorthair", "Munchkin", "Birman"
  ]
};

export default function AddPet() {
  const [, setLocation] = useLocation();
  const [selectedSpecies, setSelectedSpecies] = useState<string>("");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<PetFormData>({
    resolver: zodResolver(insertPetSchema),
    defaultValues: {
      name: "",
      species: "",
      breed: "",
      age: 1,
      weight: 10,
      healthStatus: "healthy",
      nextCheckup: undefined,
    },
  });

  const createPetMutation = useMutation({
    mutationFn: async (data: PetFormData) => {
      const response = await apiRequest("POST", "/api/pets", data);
      return response.json();
    },
    onSuccess: async (pet) => {
      // Upload photo if provided
      if (photoFile) {
        const formData = new FormData();
        formData.append("photo", photoFile);
        
        try {
          await apiRequest("POST", `/api/pets/${pet.id}/photo`, formData);
        } catch (error) {
          console.error("Failed to upload photo:", error);
        }
      }

      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      toast({
        title: "Pet Added Successfully!",
        description: `${pet.name} has been added to your family.`,
      });
      setLocation("/dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add pet. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handlePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: PetFormData) => {
    createPetMutation.mutate(data);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex items-center mb-8">
        <Link href="/dashboard">
          <Button variant="ghost" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back
          </Button>
        </Link>
        <h1 className="text-3xl font-bold text-charcoal">Add New Pet</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Heart className="mr-2 h-5 w-5 text-primary-blue" />
            Pet Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Photo Upload */}
              <div className="space-y-2">
                <Label>Pet Photo</Label>
                <div className="flex items-center space-x-4">
                  <div className="w-24 h-24 bg-muted rounded-xl flex items-center justify-center overflow-hidden">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Pet preview" className="w-full h-full object-cover" />
                    ) : (
                      <Camera className="h-8 w-8 text-muted-foreground" />
                    )}
                  </div>
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="hidden"
                      id="photo-upload"
                    />
                    <Label htmlFor="photo-upload" className="cursor-pointer">
                      <Button type="button" variant="outline" className="interactive-button" asChild>
                        <span>
                          <Upload className="mr-2 h-4 w-4" />
                          Upload Photo
                        </span>
                      </Button>
                    </Label>
                    <p className="text-xs text-muted-foreground mt-1">
                      Max 5MB. JPG, PNG, GIF, or WebP.
                    </p>
                  </div>
                </div>
              </div>

              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Pet Name *</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter pet's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="species"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Species *</FormLabel>
                      <Select
                        onValueChange={(value) => {
                          field.onChange(value);
                          setSelectedSpecies(value);
                          form.setValue("breed", ""); // Reset breed when species changes
                        }}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select species" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="dog">Dog</SelectItem>
                          <SelectItem value="cat">Cat</SelectItem>
                          <SelectItem value="bird">Bird</SelectItem>
                          <SelectItem value="rabbit">Rabbit</SelectItem>
                          <SelectItem value="hamster">Hamster</SelectItem>
                          <SelectItem value="fish">Fish</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="breed"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Breed *</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select breed" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {selectedSpecies && popularBreeds[selectedSpecies as keyof typeof popularBreeds] ? (
                            popularBreeds[selectedSpecies as keyof typeof popularBreeds].map((breed) => (
                              <SelectItem key={breed} value={breed}>
                                {breed}
                              </SelectItem>
                            ))
                          ) : (
                            <SelectItem value="mixed">Mixed Breed</SelectItem>
                          )}
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age (years) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="30"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="weight"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weight (lbs) *</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min="0"
                          max="500"
                          {...field}
                          onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="healthStatus"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Health Status</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select health status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="healthy">Healthy</SelectItem>
                          <SelectItem value="needs_attention">Needs Attention</SelectItem>
                          <SelectItem value="sick">Sick</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Next Checkup */}
              <FormField
                control={form.control}
                name="nextCheckup"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Next Checkup (Optional)</FormLabel>
                    <FormControl>
                      <Input
                        type="date"
                        {...field}
                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                        onChange={(e) => field.onChange(e.target.value ? new Date(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Submit Button */}
              <div className="flex items-center space-x-4 pt-4">
                <Button
                  type="submit"
                  disabled={createPetMutation.isPending}
                  className="interactive-button bg-gradient-to-r from-primary-blue to-primary-green hover:from-primary-blue/90 hover:to-primary-green/90 text-white flex-1"
                >
                  {createPetMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Adding Pet...
                    </>
                  ) : (
                    <>
                      <Heart className="mr-2 h-4 w-4" />
                      Add Pet
                    </>
                  )}
                </Button>
                <Link href="/dashboard">
                  <Button type="button" variant="outline" disabled={createPetMutation.isPending}>
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
