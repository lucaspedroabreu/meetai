import { Button } from "@/components/ui/button";
import { ErrorMessage } from "@/components/custom-ui/error-message";
import { LoadingSpinner } from "@/components/custom/icons";
import { cn } from "@/lib/utils";

interface AuthFormActionsProps {
  submitLabel: string;
  isLoading: boolean;
  loadingLabel: string;
  areAllFieldsValid: () => boolean;
  error: string | null;
  onErrorRetry: () => void;
  tabIndex?: number;
}

export function AuthFormActions({
  submitLabel,
  isLoading,
  loadingLabel,
  areAllFieldsValid,
  error,
  onErrorRetry,
  tabIndex = 3,
}: AuthFormActionsProps) {
  const isDisabled = !areAllFieldsValid() && !isLoading;

  return (
    <>
      <div className="pt-1">
        <Button
          type="submit"
          variant="default"
          size="lg"
          disabled={isLoading}
          className={cn(
            "w-full transition-all duration-200",
            isDisabled
              ? "bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300"
              : "bg-brand-gradient hover:bg-brand-gradient-hover"
          )}
          tabIndex={tabIndex}
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <LoadingSpinner size={16} />
              {loadingLabel}
            </div>
          ) : (
            submitLabel
          )}
        </Button>
      </div>

      {error && (
        <ErrorMessage error={error} onRetry={onErrorRetry} className="mt-2" />
      )}
    </>
  );
}
