"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { SuccessIcon, LoadingSpinner } from "@/components/custom/icons";
import { AUTH_FORM_TEXTS } from "@/constants/auth";

export function AuthSuccessMessage() {
  const router = useRouter();

  return (
    <CardContent className="text-center py-8">
      <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
        <SuccessIcon size={32} />
      </div>
      <h2 className="text-xl font-semibold mb-2 text-gray-900">
        {AUTH_FORM_TEXTS.SUCCESS.title}
      </h2>
      <p className="text-gray-600 mb-4 max-w-sm mx-auto text-sm">
        {AUTH_FORM_TEXTS.SUCCESS.description}
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-4">
        <LoadingSpinner
          size={16}
          className="border-gray-300 border-t-purple-600"
        />
        <span>{AUTH_FORM_TEXTS.SUCCESS.preparing}</span>
      </div>
      <Button
        onClick={() => router.push("/welcome")}
        variant="outline"
        className="h-10 px-6 bg-white hover-purple"
      >
        {AUTH_FORM_TEXTS.SUCCESS.continueButton}
      </Button>
    </CardContent>
  );
}
