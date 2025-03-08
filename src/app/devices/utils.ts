export function formatHddCapacity(gb: number | string): string {
  gb = typeof gb === "string" ? Number(gb) : gb;

  if (gb >= 1024) {
    return `${gb / 1024} TB`;
  }

  return `${gb} GB`;
}
