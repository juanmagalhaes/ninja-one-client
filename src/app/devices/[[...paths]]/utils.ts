export function formatHddCapacity(gb: number | string): string {
  gb = typeof gb === "string" ? Number(gb) : gb;

  if (gb >= 1024) {
    return `${Number(gb / 1024).toFixed(2)} TB`;
  }

  return `${gb} GB`;
}
