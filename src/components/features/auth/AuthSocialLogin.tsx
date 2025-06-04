import { Button } from "@/components/ui/button";
import { GoogleIcon, GitHubIcon } from "@/components/custom/icons";
import { authClient } from "@/lib/auth-client";
import { AUTH_FORM_TEXTS } from "@/constants/auth";

interface AuthSocialLoginProps {
  isLoading?: boolean;
}

export function AuthSocialLogin({ isLoading = false }: AuthSocialLoginProps) {
  return (
    <>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-gray-200" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-white px-4 text-gray-500 font-medium">
            {AUTH_FORM_TEXTS.SOCIAL_LOGIN.dividerText}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          variant="outline"
          disabled={isLoading}
          className="h-11 border-gray-300 hover-purple transition-colors bg-white"
          onClick={() => {
            authClient.signIn.social({
              provider: "google",
              callbackURL: "/",
              newUserCallbackURL: "/welcome",
            });
          }}
        >
          <GoogleIcon size={20} className="mr-2" />
          {AUTH_FORM_TEXTS.SOCIAL_LOGIN.googleButton}
        </Button>
        <Button
          variant="outline"
          disabled={isLoading}
          className="h-11 border-gray-300 hover-purple transition-colors bg-white"
          onClick={() => {
            authClient.signIn.social({
              provider: "github",
              callbackURL: "/",
              newUserCallbackURL: "/welcome",
            });
          }}
        >
          <GitHubIcon size={20} className="mr-2" />
          {AUTH_FORM_TEXTS.SOCIAL_LOGIN.githubButton}
        </Button>
      </div>
    </>
  );
}
