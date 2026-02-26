import { useState, useCallback, useRef, useEffect } from "react";
import { ZodSchema } from "zod";

type FieldErrors<T> = Partial<Record<keyof T, string>>;

interface UseZodFormOptions<T> {
  initialValues: T;
  schema: ZodSchema<T>;
}

/**
 * Simple form hook with Zod validation
 */
export const useZodForm = <T extends Record<string, any>>({
  initialValues,
  schema,
}: UseZodFormOptions<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<FieldErrors<T>>({});
  const initialValuesRef = useRef(initialValues);

  useEffect(() => {
    initialValuesRef.current = initialValues;
  }, [initialValues]);

  const setValue = useCallback(<K extends keyof T>(field: K, value: T[K]) => {
    setValues((prev) => {
      if (prev[field] === value) return prev;
      return { ...prev, [field]: value };
    });
    // Clear error for this field when value changes
    setErrors((prev) => {
      if (!prev[field]) return prev;
      const next = { ...prev };
      delete next[field];
      return next;
    });
  }, []);

  const validate = useCallback((): boolean => {
    const result = schema.safeParse(values);

    if (result.success) {
      setErrors({});
      return true;
    }

    const newErrors: FieldErrors<T> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as keyof T;
      if (!newErrors[field]) {
        newErrors[field] = issue.message;
      }
    });

    setErrors(newErrors);
    return false;
  }, [schema, values]);

  const reset = useCallback((newValues?: T) => {
    setValues(newValues || initialValuesRef.current);
    setErrors({});
  }, []);

  const setFormValues = useCallback((newValues: Partial<T>) => {
    setValues((prev) => ({ ...prev, ...newValues }));
  }, []);

  return {
    values,
    errors,
    setValue,
    validate,
    reset,
    setFormValues,
  };
};

export default useZodForm;

