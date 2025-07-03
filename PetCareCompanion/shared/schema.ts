import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const pets = pgTable("pets", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  species: text("species").notNull(), // dog, cat, etc.
  breed: text("breed").notNull(),
  age: integer("age").notNull(),
  weight: integer("weight").notNull(), // in pounds
  photoUrl: text("photo_url"),
  healthStatus: text("health_status").notNull().default("healthy"), // healthy, needs_attention, sick
  nextCheckup: timestamp("next_checkup"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const careActivities = pgTable("care_activities", {
  id: serial("id").primaryKey(),
  petId: integer("pet_id").references(() => pets.id).notNull(),
  type: text("type").notNull(), // feeding, exercise, grooming, medical
  title: text("title").notNull(),
  description: text("description"),
  completed: boolean("completed").default(false),
  scheduledDate: timestamp("scheduled_date").notNull(),
  completedDate: timestamp("completed_date"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const healthRecords = pgTable("health_records", {
  id: serial("id").primaryKey(),
  petId: integer("pet_id").references(() => pets.id).notNull(),
  type: text("type").notNull(), // checkup, vaccination, treatment
  title: text("title").notNull(),
  notes: text("notes"),
  veterinarian: text("veterinarian"),
  date: timestamp("date").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const dailyStats = pgTable("daily_stats", {
  id: serial("id").primaryKey(),
  petId: integer("pet_id").references(() => pets.id).notNull(),
  date: timestamp("date").notNull(),
  steps: integer("steps").default(0),
  exerciseMinutes: integer("exercise_minutes").default(0),
  sleepHours: integer("sleep_hours").default(0),
  meals: integer("meals").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertPetSchema = createInsertSchema(pets).omit({
  id: true,
  createdAt: true,
});

export const insertCareActivitySchema = createInsertSchema(careActivities).omit({
  id: true,
  createdAt: true,
  completedDate: true,
});

export const insertHealthRecordSchema = createInsertSchema(healthRecords).omit({
  id: true,
  createdAt: true,
});

export const insertDailyStatsSchema = createInsertSchema(dailyStats).omit({
  id: true,
  createdAt: true,
});

// Types
export type Pet = typeof pets.$inferSelect;
export type InsertPet = z.infer<typeof insertPetSchema>;
export type CareActivity = typeof careActivities.$inferSelect;
export type InsertCareActivity = z.infer<typeof insertCareActivitySchema>;
export type HealthRecord = typeof healthRecords.$inferSelect;
export type InsertHealthRecord = z.infer<typeof insertHealthRecordSchema>;
export type DailyStats = typeof dailyStats.$inferSelect;
export type InsertDailyStats = z.infer<typeof insertDailyStatsSchema>;
