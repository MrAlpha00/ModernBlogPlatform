import { z } from "zod";

export const insertTeamSchema = z.object({
  teamName: z.string().min(1, "Team name is required"),
  projectTitle: z.string().min(1, "Project title is required"),
  member1Name: z.string().min(1, "Member 1 name is required"),
  member1Email: z.string().email("Invalid email for member 1"),
  member2Name: z.string().min(1, "Member 2 name is required"),
  member2Email: z.string().email("Invalid email for member 2"),
  member3Name: z.string().optional(),
  member3Email: z.string().email("Invalid email for member 3").optional().or(z.literal("")),
  member4Name: z.string().optional(),
  member4Email: z.string().email("Invalid email for member 4").optional().or(z.literal("")),
});

export type InsertTeam = z.infer<typeof insertTeamSchema>;

export interface Certificate {
  id: string;
  name: string;
  email: string;
  certificateUrl: string;
}
