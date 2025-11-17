import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { FileText, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto text-center space-y-12">
        {/* Title */}
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground neon-text leading-tight">
            InnovateX
            <br />
            <span className="text-primary">Registration & Certificate Portal</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-lg mx-auto">
            Register your team for the event or download your achievement certificates
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/register">
            <Button
              size="lg"
              className="w-full sm:w-auto min-w-[200px] text-base font-semibold neon-glow-strong transition-all duration-300 hover:scale-105"
              data-testid="button-register-team"
            >
              <Users className="mr-2 h-5 w-5" />
              Register Team
            </Button>
          </Link>

          <Link href="/download">
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto min-w-[200px] text-base font-semibold border-2 border-primary bg-background hover:bg-primary/10 neon-glow transition-all duration-300 hover:scale-105"
              data-testid="button-download-certificate"
            >
              <FileText className="mr-2 h-5 w-5" />
              Download Certificate
            </Button>
          </Link>
        </div>

        {/* Decorative elements */}
        <div className="mt-16 flex justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary neon-glow animate-pulse" style={{ animationDelay: "0ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary neon-glow animate-pulse" style={{ animationDelay: "150ms" }}></div>
          <div className="w-2 h-2 rounded-full bg-primary neon-glow animate-pulse" style={{ animationDelay: "300ms" }}></div>
        </div>
      </div>
    </div>
  );
}
