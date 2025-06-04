import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { MeetAILogo } from "@/components/features/brand";

interface AuthFormHeaderProps {
  title: string;
  description: string;
  logoSize?: number;
}

export function AuthFormHeader({
  title,
  description,
  logoSize = 48,
}: AuthFormHeaderProps) {
  return (
    <CardHeader className="text-center pb-4">
      <div className="flex justify-center mb-4">
        <MeetAILogo animated size={logoSize} variant="default" />
      </div>
      <CardTitle className="text-2xl font-semibold text-gray-900">
        {title}
      </CardTitle>
      <CardDescription className="text-gray-600">{description}</CardDescription>
    </CardHeader>
  );
}
