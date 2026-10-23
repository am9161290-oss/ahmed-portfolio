import DOMPurify from "dompurify";

/**
 * Strips all HTML tags and attributes from user input.
 * Strictly enforces ALLOWED_TAGS: [] and ALLOWED_ATTR: [].
 *
 * @param input Raw user input string
 * @returns Clean, plain text string without any HTML markup
 */
export function sanitizeInput(input: string): string {
  if (typeof input !== "string") return "";
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: [],
    ALLOWED_ATTR: [],
  }).trim();
}

export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  isEmail?: boolean;
  fieldName?: string;
}

export interface ValidationResult {
  isValid: boolean;
  error?: string;
  sanitizedValue: string;
}

/**
 * Validates and sanitizes a single user input field.
 *
 * @param value Raw string input
 * @param rules Constraints to validate against
 * @param isAr Whether error messages should be in Arabic
 * @returns ValidationResult containing validity, error message, and sanitized string
 */
export function validateInput(
  value: string,
  rules: ValidationRule = {},
  isAr: boolean = false
): ValidationResult {
  const sanitized = sanitizeInput(value);
  const name = rules.fieldName || (isAr ? "هذا الحقل" : "This field");

  if (rules.required && !sanitized) {
    return {
      isValid: false,
      error: isAr ? `يرجى ملء ${name}.` : `${name} is required.`,
      sanitizedValue: sanitized,
    };
  }

  if (rules.minLength && sanitized.length < rules.minLength) {
    return {
      isValid: false,
      error: isAr
        ? `يجب ألا يقل ${name} عن ${rules.minLength} أحرف.`
        : `${name} must be at least ${rules.minLength} characters.`,
      sanitizedValue: sanitized,
    };
  }

  if (rules.maxLength && sanitized.length > rules.maxLength) {
    return {
      isValid: false,
      error: isAr
        ? `يجب ألا يتجاوز ${name} ${rules.maxLength} حرفاً.`
        : `${name} cannot exceed ${rules.maxLength} characters.`,
      sanitizedValue: sanitized,
    };
  }

  if (rules.isEmail && sanitized) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(sanitized)) {
      return {
        isValid: false,
        error: isAr
          ? "يرجى إدخال بريد إلكتروني صحيح."
          : "Please enter a valid email address.",
        sanitizedValue: sanitized,
      };
    }
  }

  return {
    isValid: true,
    sanitizedValue: sanitized,
  };
}
