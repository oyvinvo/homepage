export class ReadingTimeCalculator {
  public static readonly WORDS_PER_MINUTE = 200;

  /**
   * Counts words in a string, ignoring excessive whitespace.
   */
  public static countWords(text: string): number {
    const trimmed = text.trim();
    if (!trimmed) return 0;
    return trimmed.split(/\s+/).length;
  }

  /**
   * Estimates reading duration in integer minutes, with a minimum of 1 minute.
   */
  public static estimateReadingTimeMinutes(text: string): number {
    const wordCount = this.countWords(text);
    if (wordCount === 0) return 0;
    return Math.max(1, Math.ceil(wordCount / this.WORDS_PER_MINUTE));
  }

  /**
   * Formats a human-readable duration label.
   */
  public static formatReadingTime(wordCount: number): string {
    const minutes = Math.max(1, Math.ceil(wordCount / this.WORDS_PER_MINUTE));
    return `${minutes} min read`;
  }
}
