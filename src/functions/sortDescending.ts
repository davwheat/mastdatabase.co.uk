const collator = new Intl.Collator('en-GB')

export default function sortDescending(a: unknown, b: unknown): number {
  if (typeof a === 'string' && typeof b === 'string') {
    return collator.compare(a, b)
  }

  // @ts-expect-error eek
  return a - b
}
