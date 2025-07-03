import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertPetSchema, insertCareActivitySchema, insertHealthRecordSchema } from "@shared/schema";
import multer from "multer";
import path from "path";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|webp/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only image files are allowed"));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Pet routes
  app.get("/api/pets", async (req, res) => {
    try {
      const pets = await storage.getPets();
      res.json(pets);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pets" });
    }
  });

  app.get("/api/pets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pet = await storage.getPet(id);
      
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      
      res.json(pet);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch pet" });
    }
  });

  app.post("/api/pets", async (req, res) => {
    try {
      const validatedData = insertPetSchema.parse(req.body);
      const pet = await storage.createPet(validatedData);
      res.status(201).json(pet);
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid pet data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.put("/api/pets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertPetSchema.partial().parse(req.body);
      const pet = await storage.updatePet(id, validatedData);
      
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }
      
      res.json(pet);
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid pet data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.delete("/api/pets/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const deleted = await storage.deletePet(id);
      
      if (!deleted) {
        return res.status(404).json({ message: "Pet not found" });
      }
      
      res.json({ message: "Pet deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete pet" });
    }
  });

  // Photo upload route
  app.post("/api/pets/:id/photo", upload.single("photo"), async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const pet = await storage.getPet(id);
      
      if (!pet) {
        return res.status(404).json({ message: "Pet not found" });
      }

      if (!req.file) {
        return res.status(400).json({ message: "No photo uploaded" });
      }

      // In a real app, you would upload to a cloud service like AWS S3
      // For this demo, we'll create a data URL
      const base64Data = req.file.buffer.toString('base64');
      const photoUrl = `data:${req.file.mimetype};base64,${base64Data}`;

      const updatedPet = await storage.updatePet(id, { photoUrl });
      res.json(updatedPet);
    } catch (error) {
      res.status(500).json({ message: "Failed to upload photo" });
    }
  });

  // Care activity routes
  app.get("/api/care-activities", async (req, res) => {
    try {
      const petId = req.query.petId ? parseInt(req.query.petId as string) : undefined;
      const activities = await storage.getCareActivities(petId);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch care activities" });
    }
  });

  app.post("/api/care-activities", async (req, res) => {
    try {
      const validatedData = insertCareActivitySchema.parse(req.body);
      const activity = await storage.createCareActivity(validatedData);
      res.status(201).json(activity);
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid care activity data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  app.put("/api/care-activities/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const validatedData = insertCareActivitySchema.partial().parse(req.body);
      
      // If marking as completed, add completion date
      if (validatedData.completed && !req.body.completedDate) {
        (validatedData as any).completedDate = new Date();
      }
      
      const activity = await storage.updateCareActivity(id, validatedData);
      
      if (!activity) {
        return res.status(404).json({ message: "Care activity not found" });
      }
      
      res.json(activity);
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid care activity data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Health records routes
  app.get("/api/pets/:petId/health-records", async (req, res) => {
    try {
      const petId = parseInt(req.params.petId);
      const records = await storage.getHealthRecords(petId);
      res.json(records);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch health records" });
    }
  });

  app.post("/api/health-records", async (req, res) => {
    try {
      const validatedData = insertHealthRecordSchema.parse(req.body);
      const record = await storage.createHealthRecord(validatedData);
      res.status(201).json(record);
    } catch (error) {
      res.status(400).json({ 
        message: "Invalid health record data",
        error: error instanceof Error ? error.message : "Unknown error"
      });
    }
  });

  // Daily stats routes
  app.get("/api/pets/:petId/stats", async (req, res) => {
    try {
      const petId = parseInt(req.params.petId);
      const date = req.query.date ? new Date(req.query.date as string) : undefined;
      const stats = await storage.getDailyStats(petId, date);
      res.json(stats);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch daily stats" });
    }
  });

  // Dashboard stats route
  app.get("/api/dashboard/stats", async (req, res) => {
    try {
      const pets = await storage.getPets();
      const activities = await storage.getCareActivities();
      const pendingActivities = activities.filter(a => !a.completed);
      
      // Calculate aggregate stats
      const totalPets = pets.length;
      const healthyPets = pets.filter(p => p.healthStatus === "healthy").length;
      const pendingTasks = pendingActivities.length;
      
      // Mock daily steps for demo
      const dailySteps = 12847;
      const healthScore = Math.round((healthyPets / totalPets) * 100);
      
      res.json({
        totalPets,
        healthyPets,
        pendingTasks,
        dailySteps,
        healthScore,
        stepGoalProgress: 75,
      });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch dashboard stats" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
