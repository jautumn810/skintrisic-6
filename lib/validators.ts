export function isValidLettersOnly(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  // Letters + spaces + hyphen + apostrophe (common names/cities). Disallow digits/symbols.
  return /^[A-Za-z\s'-]+$/.test(v);
}

