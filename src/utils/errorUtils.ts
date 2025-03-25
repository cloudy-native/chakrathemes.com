/**
 * Custom error class for validation errors
 */
export class ValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ValidationError";
  }
}

/**
 * Custom error class for color parsing errors
 */
export class ColorParseError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "ColorParseError";
  }
}

/**
 * Validate hex color format
 * @param hex Hex color string to validate
 * @returns True if valid, false otherwise
 */
export const isValidHexColor = (hex: string): boolean => {
  // Basic check for #fff or #ffffff format
  return /^#([0-9A-F]{3}){1,2}$/i.test(hex);
};

/**
 * Validate a color before using it
 * @param color Color to validate
 * @throws ValidationError if color is invalid
 */
export const validateColor = (color: string): void => {
  if (!color) {
    throw new ValidationError("Color value is required");
  }

  if (color.startsWith("#") && !isValidHexColor(color)) {
    throw new ValidationError(`Invalid hex color format: ${color}. Use #RGB or #RRGGBB format.`);
  }
};

/**
 * Validate a color name before creating a palette
 * @param name Name to validate
 * @throws ValidationError if name is invalid
 */
export const validateColorName = (name: string): void => {
  if (!name || !name.trim()) {
    throw new ValidationError("Color name is required");
  }

  if (name.length > 30) {
    throw new ValidationError("Color name must be 30 characters or less");
  }

  if (!/^[a-zA-Z0-9\s-_]+$/.test(name)) {
    throw new ValidationError(
      "Color name must contain only letters, numbers, spaces, hyphens, and underscores"
    );
  }
};

/**
 * Safely execute an operation with proper error handling
 * @param operation Function to execute
 * @param errorHandler Function to handle errors
 * @returns The result of the operation or undefined if an error occurred
 */
export const safeExec = <T>(
  operation: () => T,
  errorHandler: (error: unknown) => void
): T | undefined => {
  try {
    return operation();
  } catch (error) {
    errorHandler(error);
    return undefined;
  }
};
