import Link from "next/link";
import { AUTH_FORM_TEXTS } from "@/constants/auth";

export function AuthFormFooter() {
  return (
    <div className="text-center pt-4 border-t border-gray-100">
      <p className="text-muted-foreground text-center text-xs text-balance">
        {AUTH_FORM_TEXTS.FOOTER.termsText}{" "}
        <Link
          href="/terms"
          className="text-brand-primary hover:text-brand-secondary underline underline-offset-4"
          aria-label="Leia nossos termos de uso"
        >
          {AUTH_FORM_TEXTS.FOOTER.termsLink}
        </Link>{" "}
        {AUTH_FORM_TEXTS.FOOTER.andText}{" "}
        <Link
          href="/privacy"
          className="text-brand-primary hover:text-brand-secondary underline underline-offset-4"
          aria-label="Leia nossa política de privacidade"
        >
          {AUTH_FORM_TEXTS.FOOTER.privacyLink}
        </Link>
      </p>
    </div>
  );
}
