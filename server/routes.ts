import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTeamSchema } from "@shared/schema";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Team registration endpoint
  app.post("/api/register", async (req, res) => {
    try {
      // Validate request body
      const validationResult = insertTeamSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        const validationError = fromZodError(validationResult.error);
        return res.status(400).json({
          success: false,
          message: validationError.message,
        });
      }

      // Create team and auto-generate certificates
      const team = await storage.createTeam(validationResult.data);

      return res.status(201).json({
        success: true,
        message: "Team registered successfully",
        teamId: team.id,
      });
    } catch (error) {
      console.error("Registration error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred during registration",
      });
    }
  });

  // Certificate retrieval endpoint
  app.get("/api/certificate", async (req, res) => {
    try {
      const email = req.query.email as string;

      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Email parameter is required",
          certificates: [],
        });
      }

      // Validate email format
      const emailSchema = z.string().email();
      const emailValidation = emailSchema.safeParse(email);

      if (!emailValidation.success) {
        return res.status(400).json({
          success: false,
          message: "Invalid email format",
          certificates: [],
        });
      }

      // Get certificates for the email
      const certificates = await storage.getCertificatesByEmail(email);

      return res.status(200).json({
        success: true,
        certificates,
        message: certificates.length === 0 
          ? "No certificates found for this email" 
          : `Found ${certificates.length} certificate(s)`,
      });
    } catch (error) {
      console.error("Certificate retrieval error:", error);
      return res.status(500).json({
        success: false,
        message: "An error occurred while retrieving certificates",
        certificates: [],
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
