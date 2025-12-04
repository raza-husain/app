// Lightweight Gregorian -> Hijri conversion utility
// Uses an astronomical algorithm adapted for civil Islamic calendar conversion
export function gregorianToHijri(date: Date): { day: number; month: number; year: number; formatted: string } {
  const g_y = date.getFullYear();
  const g_m = date.getMonth() + 1; // 1-12
  const g_d = date.getDate();

  const jd = Math.floor((1461 * (g_y + 4800 + Math.floor((g_m - 14) / 12))) / 4)
    + Math.floor((367 * (g_m - 2 - 12 * Math.floor((g_m - 14) / 12))) / 12)
    - Math.floor((3 * Math.floor((g_y + 4900 + Math.floor((g_m - 14) / 12)) / 100)) / 4)
    + g_d - 32075;

  let l = jd - 1948440 + 10632;
  const n = Math.floor((l - 1) / 10631);
  l = l - 10631 * n + 354;
  const j = (Math.floor((10985 - l) / 5316)) * (Math.floor((50 * l) / 17719)) + (Math.floor(l / 5670)) * (Math.floor((43 * l) / 15238));
  l = l - (Math.floor((30 - j) / 15)) * (Math.floor((17719 * j) / 50)) - (Math.floor(j / 16)) * (Math.floor((15238 * j) / 43)) + 29;
  const m = Math.floor((24 * l) / 709);
  const d = l - Math.floor((709 * m) / 24);
  const y = 30 * n + j - 30;

  const day = d;
  const month = m;
  const year = y;

  const dd = String(day).padStart(2, '0');
  const mm = String(month).padStart(2, '0');
  const yyyy = String(year);

  return { day, month, year, formatted: `${dd}/${mm}/${yyyy}` };
}

export function formatDDMMYYYY(d: Date) {
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yyyy = d.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export function formatInputToDDMMYYYY(raw: string) {
  const digits = raw.replace(/\D/g, '').slice(0, 8);
  const parts: string[] = [];
  if (digits.length >= 2) {
    parts.push(digits.slice(0, 2));
    if (digits.length >= 4) {
      parts.push(digits.slice(2, 4));
      if (digits.length > 4) {
        parts.push(digits.slice(4));
      }
    } else if (digits.length > 2) {
      parts.push(digits.slice(2));
    }
  } else if (digits.length > 0) {
    parts.push(digits);
  }
  return parts.join('/');
}
