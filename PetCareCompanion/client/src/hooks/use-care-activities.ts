import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import type { CareActivity, InsertCareActivity } from "@shared/schema";

export function useCareActivities(petId?: number) {
  return useQuery<CareActivity[]>({
    queryKey: petId ? ["/api/care-activities", petId] : ["/api/care-activities"],
    queryFn: async () => {
      const url = petId ? `/api/care-activities?petId=${petId}` : "/api/care-activities";
      const response = await fetch(url, { credentials: "include" });
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    },
  });
}

export function useCareActivity(id: number) {
  return useQuery<CareActivity>({
    queryKey: [`/api/care-activities/${id}`],
    enabled: !!id,
  });
}

export function useCreateCareActivity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (activity: InsertCareActivity) => {
      const response = await apiRequest("POST", "/api/care-activities", activity);
      return response.json();
    },
    onSuccess: (newActivity) => {
      queryClient.invalidateQueries({ queryKey: ["/api/care-activities"] });
      queryClient.invalidateQueries({ queryKey: ["/api/care-activities", newActivity.petId] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });
}

export function useUpdateCareActivity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, activity }: { id: number; activity: Partial<InsertCareActivity> }) => {
      const response = await apiRequest("PUT", `/api/care-activities/${id}`, activity);
      return response.json();
    },
    onSuccess: (updatedActivity, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["/api/care-activities"] });
      queryClient.invalidateQueries({ queryKey: ["/api/care-activities", updatedActivity.petId] });
      queryClient.invalidateQueries({ queryKey: [`/api/care-activities/${id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });
}

export function useDeleteCareActivity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("DELETE", `/api/care-activities/${id}`);
      return response.json();
    },
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["/api/care-activities"] });
      queryClient.invalidateQueries({ queryKey: [`/api/care-activities/${id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });
}

export function useCompleteCareActivity() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: number) => {
      const response = await apiRequest("PUT", `/api/care-activities/${id}`, {
        completed: true,
        completedDate: new Date().toISOString(),
      });
      return response.json();
    },
    onSuccess: (updatedActivity, id) => {
      queryClient.invalidateQueries({ queryKey: ["/api/care-activities"] });
      queryClient.invalidateQueries({ queryKey: ["/api/care-activities", updatedActivity.petId] });
      queryClient.invalidateQueries({ queryKey: [`/api/care-activities/${id}`] });
      queryClient.invalidateQueries({ queryKey: ["/api/dashboard/stats"] });
    },
  });
}
