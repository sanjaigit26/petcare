import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { Pet, InsertPet } from "@shared/schema";

export function usePets() {
  return useQuery<Pet[]>({
    queryKey: ["/api/pets"],
  });
}

export function usePet(id: number) {
  return useQuery<Pet>({
    queryKey: [`/api/pets/${id}`],
    enabled: !!id,
  });
}

export function useCreatePet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (pet: InsertPet) => {
      const response = await apiRequest("POST", "/api/pets", pet);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
    },
  });
}

export function useUpdatePet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, pet }: { id: number; pet: Partial<InsertPet> }) => {
      const response = await apiRequest("PUT", `/api/pets/${id}`, pet);
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      queryClient.invalidateQueries({ queryKey: [`/api/pets/${id}`] });
    },
  });
}

export function useDeletePet() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/pets/${id}`);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
    },
  });
}

export function useUploadPetPhoto() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, file }: { id: number; file: File }) => {
      const formData = new FormData();
      formData.append("photo", file);
      
      const response = await fetch(`/api/pets/${id}/photo`, {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to upload photo");
      }
      
      return response.json();
    },
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/pets"] });
      queryClient.invalidateQueries({ queryKey: [`/api/pets/${id}`] });
    },
  });
}
