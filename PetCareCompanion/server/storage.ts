import { 
  pets, 
  careActivities, 
  healthRecords, 
  dailyStats,
  type Pet, 
  type InsertPet,
  type CareActivity,
  type InsertCareActivity,
  type HealthRecord,
  type InsertHealthRecord,
  type DailyStats,
  type InsertDailyStats
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // Pet operations
  getPets(): Promise<Pet[]>;
  getPet(id: number): Promise<Pet | undefined>;
  createPet(pet: InsertPet): Promise<Pet>;
  updatePet(id: number, pet: Partial<InsertPet>): Promise<Pet | undefined>;
  deletePet(id: number): Promise<boolean>;

  // Care activity operations
  getCareActivities(petId?: number): Promise<CareActivity[]>;
  getCareActivity(id: number): Promise<CareActivity | undefined>;
  createCareActivity(activity: InsertCareActivity): Promise<CareActivity>;
  updateCareActivity(id: number, activity: Partial<InsertCareActivity>): Promise<CareActivity | undefined>;
  deleteCareActivity(id: number): Promise<boolean>;

  // Health record operations
  getHealthRecords(petId: number): Promise<HealthRecord[]>;
  createHealthRecord(record: InsertHealthRecord): Promise<HealthRecord>;

  // Daily stats operations
  getDailyStats(petId: number, date?: Date): Promise<DailyStats[]>;
  createDailyStats(stats: InsertDailyStats): Promise<DailyStats>;
  updateDailyStats(id: number, stats: Partial<InsertDailyStats>): Promise<DailyStats | undefined>;
}

// Initialize database with sample data
async function initializeSampleData() {
  try {
    // Check if data already exists
    const existingPets = await db.select().from(pets);
    if (existingPets.length > 0) {
      return; // Data already exists
    }

    // Sample pets
    const samplePets: InsertPet[] = [
      {
        name: "Bella",
        species: "dog",
        breed: "Border Collie",
        age: 3,
        weight: 23,
        healthStatus: "healthy",
        photoUrl: "https://images.unsplash.com/photo-1551717743-49959800b1f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Whiskers",
        species: "cat",
        breed: "Maine Coon",
        age: 5,
        weight: 7,
        healthStatus: "healthy",
        photoUrl: "https://images.unsplash.com/photo-1574158622682-e40e69881006?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      },
      {
        name: "Rocky",
        species: "dog",
        breed: "German Shepherd",
        age: 7,
        weight: 35,
        healthStatus: "needs_attention",
        photoUrl: "https://images.unsplash.com/photo-1589941013453-ec89f33b5e95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300"
      }
    ];

    const insertedPets = await db.insert(pets).values(samplePets).returning();

    // Sample care activities
    const sampleActivities: InsertCareActivity[] = [
      {
        petId: insertedPets[0].id,
        type: "exercise",
        title: "Morning Walk",
        scheduledDate: new Date("2024-12-16T08:00:00"),
        description: "Daily 30-minute walk in the park",
        completed: false
      },
      {
        petId: insertedPets[0].id,
        type: "feeding",
        title: "Breakfast",
        scheduledDate: new Date("2024-12-16T07:00:00"),
        description: "High-quality dry food with supplements",
        completed: true
      },
      {
        petId: insertedPets[1].id,
        type: "grooming",
        title: "Weekly Brushing",
        scheduledDate: new Date("2024-12-17T10:00:00"),
        description: "Brush coat to prevent matting",
        completed: false
      },
      {
        petId: insertedPets[2].id,
        type: "medical",
        title: "Joint Supplement",
        scheduledDate: new Date("2024-12-16T19:00:00"),
        description: "Daily glucosamine supplement",
        completed: false
      }
    ];

    await db.insert(careActivities).values(sampleActivities);

    // Sample health records
    const sampleHealthRecords: InsertHealthRecord[] = [
      {
        petId: insertedPets[0].id,
        type: "checkup",
        title: "Annual Checkup",
        date: new Date("2024-11-15"),
        veterinarian: "Dr. Sarah Johnson",
        notes: "Perfect health, all vitals normal"
      },
      {
        petId: insertedPets[1].id,
        type: "vaccination",
        title: "Annual Vaccines",
        date: new Date("2024-10-20"),
        veterinarian: "Dr. Mike Chen",
        notes: "No adverse reactions, next due in 2025"
      },
      {
        petId: insertedPets[2].id,
        type: "treatment",
        title: "Joint Treatment Plan",
        date: new Date("2024-12-01"),
        veterinarian: "Dr. Emily Rodriguez",
        notes: "Monitor mobility and adjust dosage as needed"
      }
    ];

    await db.insert(healthRecords).values(sampleHealthRecords);

    // Sample daily stats
    const sampleDailyStats: InsertDailyStats[] = [
      {
        petId: insertedPets[0].id,
        date: new Date("2024-12-15"),
        steps: 8500,
        exerciseMinutes: 45,
        sleepHours: 12,
        meals: 2
      },
      {
        petId: insertedPets[1].id,
        date: new Date("2024-12-15"),
        steps: 2100,
        exerciseMinutes: 15,
        sleepHours: 16,
        meals: 3
      },
      {
        petId: insertedPets[2].id,
        date: new Date("2024-12-15"),
        steps: 3200,
        exerciseMinutes: 20,
        sleepHours: 14,
        meals: 2
      }
    ];

    await db.insert(dailyStats).values(sampleDailyStats);
    console.log("Sample data initialized successfully");
  } catch (error) {
    console.error("Error initializing sample data:", error);
  }
}

export class DatabaseStorage implements IStorage {
  async getPets(): Promise<Pet[]> {
    return await db.select().from(pets);
  }

  async getPet(id: number): Promise<Pet | undefined> {
    const [pet] = await db.select().from(pets).where(eq(pets.id, id));
    return pet || undefined;
  }

  async createPet(insertPet: InsertPet): Promise<Pet> {
    const [pet] = await db
      .insert(pets)
      .values(insertPet)
      .returning();
    return pet;
  }

  async updatePet(id: number, updateData: Partial<InsertPet>): Promise<Pet | undefined> {
    const [pet] = await db
      .update(pets)
      .set(updateData)
      .where(eq(pets.id, id))
      .returning();
    return pet || undefined;
  }

  async deletePet(id: number): Promise<boolean> {
    const result = await db.delete(pets).where(eq(pets.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getCareActivities(petId?: number): Promise<CareActivity[]> {
    if (petId) {
      return await db.select().from(careActivities).where(eq(careActivities.petId, petId));
    }
    return await db.select().from(careActivities);
  }

  async getCareActivity(id: number): Promise<CareActivity | undefined> {
    const [activity] = await db.select().from(careActivities).where(eq(careActivities.id, id));
    return activity || undefined;
  }

  async createCareActivity(insertActivity: InsertCareActivity): Promise<CareActivity> {
    const [activity] = await db
      .insert(careActivities)
      .values(insertActivity)
      .returning();
    return activity;
  }

  async updateCareActivity(id: number, updateData: Partial<InsertCareActivity>): Promise<CareActivity | undefined> {
    const [activity] = await db
      .update(careActivities)
      .set(updateData)
      .where(eq(careActivities.id, id))
      .returning();
    return activity || undefined;
  }

  async deleteCareActivity(id: number): Promise<boolean> {
    const result = await db.delete(careActivities).where(eq(careActivities.id, id));
    return (result.rowCount ?? 0) > 0;
  }

  async getHealthRecords(petId: number): Promise<HealthRecord[]> {
    return await db.select().from(healthRecords).where(eq(healthRecords.petId, petId));
  }

  async createHealthRecord(insertRecord: InsertHealthRecord): Promise<HealthRecord> {
    const [record] = await db
      .insert(healthRecords)
      .values(insertRecord)
      .returning();
    return record;
  }

  async getDailyStats(petId: number, date?: Date): Promise<DailyStats[]> {
    if (date) {
      return await db.select().from(dailyStats)
        .where(and(eq(dailyStats.petId, petId), eq(dailyStats.date, date)));
    }
    
    return await db.select().from(dailyStats).where(eq(dailyStats.petId, petId));
  }

  async createDailyStats(insertStats: InsertDailyStats): Promise<DailyStats> {
    const [stats] = await db
      .insert(dailyStats)
      .values(insertStats)
      .returning();
    return stats;
  }

  async updateDailyStats(id: number, updateData: Partial<InsertDailyStats>): Promise<DailyStats | undefined> {
    const [stats] = await db
      .update(dailyStats)
      .set(updateData)
      .where(eq(dailyStats.id, id))
      .returning();
    return stats || undefined;
  }
}

export const storage = new DatabaseStorage();

// Initialize sample data when the module is imported
initializeSampleData();