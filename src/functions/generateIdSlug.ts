export default function generateIdSlug(text: string, instance?: number): string {
  const slug = text
    .toLowerCase()
    .replace(/[,. ]/g, '-')
    .replace(/-{2,}/g, '-')
    .replace(/[^a-z0-9-]/g, '')

  if (instance && instance > 1) return `${slug}-${instance}`

  return slug
}
