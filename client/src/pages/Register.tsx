import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "wouter";
import { ArrowLeft, Loader2, CheckCircle } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { insertTeamSchema, type InsertTeam } from "@shared/schema";
import { cn } from "@/lib/utils";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Register() {
  const [showSuccess, setShowSuccess] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertTeam>({
    resolver: zodResolver(insertTeamSchema),
    defaultValues: {
      teamName: "",
      projectTitle: "",
      member1Name: "",
      member1Email: "",
      member2Name: "",
      member2Email: "",
      member3Name: "",
      member3Email: "",
      member4Name: "",
      member4Email: "",
    },
  });

  const registerMutation = useMutation({
    mutationFn: async (data: InsertTeam) => {
      return apiRequest("POST", "/api/register", data);
    },
    onSuccess: () => {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        form.reset();
      }, 3000);
    },
    onError: (error: Error) => {
      console.error("Registration error:", error);
      toast({
        variant: "destructive",
        title: "Registration Failed",
        description: "An error occurred. Please try again.",
      });
    },
  });

  const onSubmit = (data: InsertTeam) => {
    registerMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="w-full max-w-4xl mx-auto space-y-6">
        {/* Back Button */}
        <Link href="/">
          <Button
            variant="ghost"
            className="text-primary hover:text-primary/80"
            data-testid="button-back"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        {/* Registration Card */}
        <Card className="border-2 border-primary/60 neon-glow bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground neon-text">
              Team Registration
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Register your team for InnovateX. All fields marked with * are required.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                {/* Team Details Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary border-b border-primary/30 pb-2">
                    Team Details
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="teamName"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-foreground">Team Name *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your team name"
                              className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                              data-testid="input-team-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="projectTitle"
                      render={({ field }) => (
                        <FormItem className="md:col-span-2">
                          <FormLabel className="text-foreground">Project Title *</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="Enter your project title"
                              className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                              data-testid="input-project-title"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                {/* Members Section */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-primary border-b border-primary/30 pb-2">
                    Team Members
                  </h3>

                  {/* Member 1 - Required */}
                  <div className="space-y-4 p-4 rounded-lg bg-muted/20 border border-primary/20">
                    <p className="text-sm font-medium text-foreground">Member 1 *</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="member1Name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Full name"
                                className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                                data-testid="input-member1-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="member1Email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Email *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="email@example.com"
                                className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                                data-testid="input-member1-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Member 2 - Required */}
                  <div className="space-y-4 p-4 rounded-lg bg-muted/20 border border-primary/20">
                    <p className="text-sm font-medium text-foreground">Member 2 *</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="member2Name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Name *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Full name"
                                className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                                data-testid="input-member2-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="member2Email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Email *</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="email@example.com"
                                className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                                data-testid="input-member2-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Member 3 - Optional */}
                  <div className="space-y-4 p-4 rounded-lg bg-muted/20 border border-primary/20">
                    <p className="text-sm font-medium text-muted-foreground">Member 3 (Optional)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="member3Name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Full name"
                                className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                                data-testid="input-member3-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="member3Email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="email@example.com"
                                className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                                data-testid="input-member3-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>

                  {/* Member 4 - Optional */}
                  <div className="space-y-4 p-4 rounded-lg bg-muted/20 border border-primary/20">
                    <p className="text-sm font-medium text-muted-foreground">Member 4 (Optional)</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="member4Name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Full name"
                                className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                                data-testid="input-member4-name"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="member4Email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-foreground">Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                type="email"
                                placeholder="email@example.com"
                                className="bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                                data-testid="input-member4-email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center pt-4">
                  <Button
                    type="submit"
                    size="lg"
                    disabled={registerMutation.isPending}
                    className={cn(
                      "min-w-[200px] text-base font-semibold neon-glow-strong transition-all duration-300",
                      !registerMutation.isPending && "hover:scale-105"
                    )}
                    data-testid="button-submit-registration"
                  >
                    {registerMutation.isPending ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Registering...
                      </>
                    ) : (
                      "Register Team"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        {/* Success Message */}
        {showSuccess && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <Card className="border-2 border-primary neon-glow-strong max-w-md w-full">
              <CardContent className="pt-6">
                <div className="text-center space-y-4">
                  <CheckCircle className="h-16 w-16 text-primary mx-auto neon-glow" />
                  <h3 className="text-2xl font-bold text-foreground neon-text">
                    Registration Successful!
                  </h3>
                  <p className="text-muted-foreground">
                    Your team has been registered successfully. Certificates will be available for download soon.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
