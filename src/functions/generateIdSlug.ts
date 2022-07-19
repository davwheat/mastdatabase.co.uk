export default function generateIdSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[,. ]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/[^a-z0-9-]/g, '')
}
