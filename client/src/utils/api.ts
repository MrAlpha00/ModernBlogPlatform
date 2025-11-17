import { type InsertTeam, type Certificate } from "@shared/schema";

// API Base URL - will point to our Express backend
// In production, this would be the Google Apps Script deployed URL
export const API_BASE = "/api";

export interface TeamRegistrationResponse {
  success: boolean;
  message: string;
  teamId?: string;
}

export interface CertificateResponse {
  success: boolean;
  certificates: Certificate[];
  message?: string;
}

/**
 * Register a new team
 */
export async function registerTeam(data: InsertTeam): Promise<TeamRegistrationResponse> {
  const response = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Registration failed");
  }

  return response.json();
}

/**
 * Get certificates by email
 */
export async function getCertificate(email: string): Promise<CertificateResponse> {
  const response = await fetch(
    `${API_BASE}/certificate?email=${encodeURIComponent(email)}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch certificates");
  }

  return response.json();
}
