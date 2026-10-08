import { ToastMessage } from './types';

export class ClipboardActionCalculator {
  /**
   * Trims whitespace and normalizes email string.
   */
  public static sanitizeEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * Generates a success toast message when text is copied.
   */
  public static createSuccessToast(itemText: string, customMessage?: string): ToastMessage {
    const cleanText = this.sanitizeEmail(itemText);
    return {
      id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: 'success',
      message: customMessage || `Copied ${cleanText} to clipboard!`,
    };
  }

  /**
   * Generates an error toast message when automated clipboard copy fails.
   */
  public static createFailureToast(itemText: string, customMessage?: string): ToastMessage {
    const cleanText = this.sanitizeEmail(itemText);
    return {
      id: `toast-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      type: 'error',
      message: customMessage || `Clipboard access denied. Please manually copy: ${cleanText}`,
    };
  }

  /**
   * Builds an RFC 6068 compliant mailto URL with encoded parameters.
   */
  public static buildMailtoUri(email: string, subject?: string, body?: string): string {
    const base = `mailto:${this.sanitizeEmail(email)}`;
    const params: string[] = [];

    if (subject) {
      params.push(`subject=${encodeURIComponent(subject)}`);
    }

    if (body) {
      params.push(`body=${encodeURIComponent(body)}`);
    }

    return params.length > 0 ? `${base}?${params.join('&')}` : base;
  }
}
