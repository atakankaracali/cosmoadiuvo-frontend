export function getMoonImageByIllumination(illumination: string): string {
    const value = parseFloat(illumination);
  
    if (isNaN(value)) {
      console.warn('Invalid illumination value:', illumination);
      return '/moon-phases/moon_image_00001.png';
    }
  
    const index = Math.min(31, Math.max(1, Math.round((value / 100) * 30)));
    const paddedIndex = index.toString().padStart(5, '0');
    return `/moon-phases/moon_image_${paddedIndex}.png`;
  }
  