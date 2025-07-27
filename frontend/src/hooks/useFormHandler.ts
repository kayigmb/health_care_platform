import React, { useCallback, useState } from "react";

type FieldErrors<T> = Partial<Record<keyof T, string>>;

interface UseFormHandlerOptions<T> {
  validate: (values: T) => FieldErrors<T>;
  onSubmit: (values: T) => Promise<void>;
}

function RawDataToString(value: FormDataEntryValue | null): string {
  return typeof value === "string" ? value.trim() : "";
}

export function useFormHandler<T>({ validate, onSubmit }: UseFormHandlerOptions<T>) {
  const [errors, setErrors] = useState<FieldErrors<T>>({});

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const values = Object.fromEntries(
        [...formData.entries()].map(([k, v]) => [k, RawDataToString(v)])
      ) as T;

      const validationErrors: FieldErrors<T> = validate(values);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setErrors({});
      await onSubmit(values);
    },
    [validate, onSubmit]
  );

  return {
    handleSubmit,
    errors
  };
}
