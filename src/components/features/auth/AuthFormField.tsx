import Link from "next/link";
import { Input } from "@/components/ui/input";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Control,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
} from "react-hook-form";

interface AuthFormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  type?: string;
  placeholder: string;
  tabIndex?: number;
  isLoading?: boolean;
  showForgotPassword?: boolean;
  onFocus: (fieldName: FieldPath<T>) => void;
  onBlur: (
    fieldName: FieldPath<T>,
    field: ControllerRenderProps<T, FieldPath<T>>
  ) => void | Promise<void>;
  onChange: (
    fieldName: FieldPath<T>,
    field: ControllerRenderProps<T, FieldPath<T>>,
    value: string
  ) => void | Promise<void>;
  getFieldStyles: (fieldName: FieldPath<T>) => string;
  getLabelStyles: (fieldName: FieldPath<T>) => string;
  shouldShowError: (fieldName: FieldPath<T>) => boolean;
}

export function AuthFormField<T extends FieldValues>({
  control,
  name,
  label,
  type = "text",
  placeholder,
  tabIndex,
  isLoading = false,
  showForgotPassword = false,
  onFocus,
  onBlur,
  onChange,
  getFieldStyles,
  getLabelStyles,
  shouldShowError,
}: AuthFormFieldProps<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        const showError = shouldShowError(name);

        return (
          <FormItem>
            <FormLabel
              className={`text-sm font-medium transition-colors ${getLabelStyles(
                name
              )}`}
            >
              {label}
            </FormLabel>
            <FormControl>
              <Input
                type={type}
                placeholder={placeholder}
                disabled={isLoading}
                value={field.value}
                onFocus={() => onFocus(name)}
                onBlur={() => onBlur(name, field)}
                onChange={(e) => onChange(name, field, e.target.value)}
                className={`h-11 transition-all duration-200 ${getFieldStyles(
                  name
                )}`}
                tabIndex={tabIndex}
              />
            </FormControl>
            <div
              className={`${
                showForgotPassword ? "flex items-center" : ""
              } h-3 -mt-1`}
            >
              <div className="flex-1">
                {showError && <FormMessage className="text-xs ml-1" />}
              </div>
              {showForgotPassword && (
                <Link
                  href="#"
                  className="text-xs text-brand-primary hover:text-brand-secondary transition-colors ml-auto"
                  tabIndex={(tabIndex || 0) + 10}
                >
                  Esqueceu a senha?
                </Link>
              )}
            </div>
          </FormItem>
        );
      }}
    />
  );
}
