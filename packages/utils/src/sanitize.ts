/**
 * Content sanitization utilities
 * Gift messages and user input are treated as untrusted user content.
 */

export const MAX_GIFT_MESSAGE_LENGTH = 300;

export function sanitizeGiftMessage(message: string): { clean: string; isValid: boolean; error?: string } {
  if (!message) {
    return { clean: '', isValid: true };
  }

  // Strip HTML tags and script elements
  const stripped = message
    .replace(/<[^>]*>?/gm, '')
    .replace(/javascript:/gi, '')
    .trim();

  if (stripped.length > MAX_GIFT_MESSAGE_LENGTH) {
    return {
      clean: stripped.slice(0, MAX_GIFT_MESSAGE_LENGTH),
      isValid: false,
      error: `Gift message exceeds maximum length of ${MAX_GIFT_MESSAGE_LENGTH} characters`,
    };
  }

  return {
    clean: stripped,
    isValid: true,
  };
}

