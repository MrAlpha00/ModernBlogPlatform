import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Search, Download as DownloadIcon, AlertCircle } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { type Certificate } from "@shared/schema";

export default function Download() {
  const [email, setEmail] = useState("");
  const [searchEmail, setSearchEmail] = useState("");

  const { data, isLoading, isError } = useQuery<{ success: boolean; certificates: Certificate[]; message?: string }>({
    queryKey: ["/api/certificate", searchEmail],
    queryFn: async () => {
      const res = await fetch(`/api/certificate?email=${encodeURIComponent(searchEmail)}`);
      if (!res.ok) {
        throw new Error("Failed to fetch certificates");
      }
      return res.json();
    },
    enabled: !!searchEmail,
  });

  const handleSearch = () => {
    if (!email.trim()) return;
    setSearchEmail(email);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="w-full max-w-3xl mx-auto space-y-6">
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

        {/* Download Card */}
        <Card className="border-2 border-primary/60 neon-glow bg-card">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-foreground neon-text">
              Download Certificate
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Enter your registered email address to find and download your certificates.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Search Section */}
            <div className="space-y-4">
              <Label htmlFor="email" className="text-foreground">
                Email Address
              </Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1 bg-card border-2 border-primary/60 focus:border-primary focus:ring-2 focus:ring-primary/50 neon-glow transition-all duration-300 min-h-11"
                  data-testid="input-email"
                  disabled={isLoading}
                />
                <Button
                  onClick={handleSearch}
                  disabled={isLoading || !email.trim()}
                  className={cn(
                    "min-w-[140px] neon-glow-strong transition-all duration-300",
                    !isLoading && "hover:scale-105"
                  )}
                  data-testid="button-check-certificate"
                >
                  <Search className="mr-2 h-4 w-4" />
                  Check Certificate
                </Button>
              </div>
            </div>

            {/* Results Section */}
            {searchEmail && (
              <div className="pt-6 border-t border-primary/20">
                {isLoading ? (
                  <div className="space-y-3">
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-24 w-full" />
                  </div>
                ) : isError || !data?.success || data.certificates.length === 0 ? (
                  <Card className="border-2 border-destructive/60 bg-destructive/10">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-semibold text-destructive">Email Not Registered</p>
                          <p className="text-sm text-muted-foreground mt-1">
                            We couldn't find any certificates associated with this email address. 
                            Please check your email or register your team first.
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-primary border-b border-primary/30 pb-2">
                      Your Certificates
                    </h3>
                    <div className="space-y-3">
                      {data.certificates.map((cert) => (
                        <Card
                          key={cert.id}
                          className="border-2 border-primary/40 neon-glow hover:border-primary transition-all duration-300"
                        >
                          <CardContent className="p-4">
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                              <div className="flex-1">
                                <p className="font-semibold text-foreground">{cert.name}</p>
                                <p className="text-sm text-muted-foreground">InnovateX Certificate</p>
                                <p className="text-xs text-muted-foreground mt-1 break-all">{cert.certificateUrl}</p>
                              </div>
                              <Button
                                asChild
                                variant="outline"
                                className="border-primary bg-background hover:bg-primary/10 neon-glow transition-all duration-300"
                                data-testid={`button-download-${cert.id}`}
                              >
                                <a href={cert.certificateUrl} download target="_blank" rel="noopener noreferrer">
                                  <DownloadIcon className="mr-2 h-4 w-4" />
                                  Download
                                </a>
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Helper Text */}
            {!searchEmail && (
              <div className="pt-6 border-t border-primary/20">
                <p className="text-sm text-muted-foreground text-center">
                  Enter the email address you used during team registration to retrieve your certificates.
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
