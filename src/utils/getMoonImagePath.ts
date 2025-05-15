export function getMoonImagePath(phase: string): string {
    const formatted = phase.toLowerCase().replace(/[\s_]+/g, '-');
    return `/moon-phases/${formatted}.png`;
  }
  