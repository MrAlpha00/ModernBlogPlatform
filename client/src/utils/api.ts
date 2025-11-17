import { type InsertTeam, type Certificate } from "@/shared/schema";

// Google Apps Script Web App URL
export const API_BASE = "https://script.google.com/macros/s/AKfycbwKUOtlARMRSHI3heT14t9PJwITDidg9BxU0W_erXTQ4iY-d6supxH9d_shUdXijf0W4w/exec";

export interface TeamRegistrationResponse {
  success: boolean;
  message: string;
  teamId?: string;
  certificates?: Array<{ name: string; email: string; url: string }>;
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
  const response = await fetch(API_BASE + "?method=register", {
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
    API_BASE + "?method=certificate&email=" + encodeURIComponent(email),
    { method: "GET" }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch certificates");
  }

  return response.json();
}
