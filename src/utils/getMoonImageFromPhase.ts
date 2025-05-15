export function getMoonImageFromPhase(phase: string): string {
    const map: { [key: string]: string } = {
      new_moon: '00001',
      waxing_crescent: '00005',
      first_quarter: '00009',
      waxing_gibbous: '00013',
      full_moon: '00016',
      waning_gibbous: '00019',
      last_quarter: '00023',
      waning_crescent: '00027',
    };
  
    const key = phase.toLowerCase().replace(/\s+/g, '_');
    const index = map[key] || '00001';
    return `/moon-images/moon_image_${index}.png`;
  }
  