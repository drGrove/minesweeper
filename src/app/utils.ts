export function eqSet(a, b): boolean {
  if (a.size !== b.size) {
    return false;
  }
  for (const aa of a) {
    if (!b.has(aa)) {
      return false;
    }
  }

  return true;
}

