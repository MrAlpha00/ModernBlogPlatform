import { 
  type Team, 
  type InsertTeam, 
  type Certificate, 
  type InsertCertificate 
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Team operations
  createTeam(team: InsertTeam): Promise<Team>;
  getTeam(id: string): Promise<Team | undefined>;
  getAllTeams(): Promise<Team[]>;
  
  // Certificate operations
  createCertificate(certificate: InsertCertificate): Promise<Certificate>;
  getCertificatesByEmail(email: string): Promise<Certificate[]>;
  getAllCertificates(): Promise<Certificate[]>;
}

export class MemStorage implements IStorage {
  private teams: Map<string, Team>;
  private certificates: Map<string, Certificate>;

  constructor() {
    this.teams = new Map();
    this.certificates = new Map();
  }

  // Team operations
  async createTeam(insertTeam: InsertTeam): Promise<Team> {
    const id = randomUUID();
    const team: Team = { ...insertTeam, id };
    this.teams.set(id, team);
    
    // Auto-generate certificates for all team members (filter out empty optional members)
    const members = [
      { name: insertTeam.member1Name, email: insertTeam.member1Email },
      { name: insertTeam.member2Name, email: insertTeam.member2Email },
      ...(insertTeam.member3Name && insertTeam.member3Email && insertTeam.member3Email.trim() !== "" 
        ? [{ name: insertTeam.member3Name, email: insertTeam.member3Email }] 
        : []
      ),
      ...(insertTeam.member4Name && insertTeam.member4Email && insertTeam.member4Email.trim() !== "" 
        ? [{ name: insertTeam.member4Name, email: insertTeam.member4Email }] 
        : []
      ),
    ];

    for (const member of members) {
      await this.createCertificate({
        name: member.name,
        email: member.email,
        certificateUrl: `https://example.com/certificates/${randomUUID()}.pdf`,
        teamId: id,
      });
    }

    return team;
  }

  async getTeam(id: string): Promise<Team | undefined> {
    return this.teams.get(id);
  }

  async getAllTeams(): Promise<Team[]> {
    return Array.from(this.teams.values());
  }

  // Certificate operations
  async createCertificate(insertCertificate: InsertCertificate): Promise<Certificate> {
    const id = randomUUID();
    const certificate: Certificate = { ...insertCertificate, id };
    this.certificates.set(id, certificate);
    return certificate;
  }

  async getCertificatesByEmail(email: string): Promise<Certificate[]> {
    return Array.from(this.certificates.values()).filter(
      (cert) => cert.email.toLowerCase() === email.toLowerCase()
    );
  }

  async getAllCertificates(): Promise<Certificate[]> {
    return Array.from(this.certificates.values());
  }
}

export const storage = new MemStorage();
