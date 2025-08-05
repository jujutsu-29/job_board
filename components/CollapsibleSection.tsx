import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./ui/collapsible";

interface CollapsibleSectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export function CollapsibleSection({
  title,
  icon,
  children,
  defaultOpen = true,
}: CollapsibleSectionProps) {

  return (
    <Card className="shadow-sm border-0 bg-white/50 dark:bg-neutral-900/60 backdrop-blur-sm">
      <Collapsible open={defaultOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 dark:hover:bg-neutral-800/60 transition-colors rounded-t-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 dark:bg-primary/20 rounded-lg">
                  {icon}
                </div>
                <CardTitle className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                  {title}
                </CardTitle>
              </div>
            </div>
          </CardHeader>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <CardContent className="pt-0">{children}</CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}