import { sql } from "drizzle-orm";
import { pgTable, text, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Team registration schema
export const teams = pgTable("teams", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  teamName: text("team_name").notNull(),
  projectTitle: text("project_title").notNull(),
  member1Name: text("member1_name").notNull(),
  member1Email: text("member1_email").notNull(),
  member2Name: text("member2_name").notNull(),
  member2Email: text("member2_email").notNull(),
  member3Name: text("member3_name"),
  member3Email: text("member3_email"),
  member4Name: text("member4_name"),
  member4Email: text("member4_email"),
});

// Certificate schema
export const certificates = pgTable("certificates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: text("email").notNull(),
  name: text("name").notNull(),
  certificateUrl: text("certificate_url").notNull(),
  teamId: varchar("team_id").references(() => teams.id),
});

// Insert schemas with validation
export const insertTeamSchema = createInsertSchema(teams)
  .omit({
    id: true,
  })
  .extend({
    member1Email: z.string().email("Invalid email format"),
    member2Email: z.string().email("Invalid email format"),
    member3Email: z.union([z.string().email("Invalid email format"), z.literal("")]).optional(),
    member4Email: z.union([z.string().email("Invalid email format"), z.literal("")]).optional(),
  });

export const insertCertificateSchema = createInsertSchema(certificates)
  .omit({
    id: true,
  })
  .extend({
    email: z.string().email("Invalid email format"),
  });

// TypeScript types
export type InsertTeam = z.infer<typeof insertTeamSchema>;
export type Team = typeof teams.$inferSelect;
export type InsertCertificate = z.infer<typeof insertCertificateSchema>;
export type Certificate = typeof certificates.$inferSelect;
