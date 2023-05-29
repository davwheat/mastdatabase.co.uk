/**
 * Truncates a string to a given length, adding an ellipsis if necessary.
 *
 * @param text String to truncate
 * @param length Length to truncate to
 * @returns Truncated string
 */
export default function truncateString(text: string, length: number): string {
  if (text.length <= length) {
    return text
  }

  return text.substring(0, length) + '…'
}
