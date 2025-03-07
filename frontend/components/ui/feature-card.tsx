import { Card, CardContent } from "./card";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="overflow-hidden border bg-background/50 hover:bg-background/10 duration-150 ease-in">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold">{title}</h3>
            <p className="text-xs text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
