export function sortTextAnalysis(
  a: [string, number],
  b: [string, number]
): number {
  // Sort by count in descending order
  if (a[1] !== b[1]) {
    return b[1] - a[1];
  }
  // If counts are equal, sort by character in ascending order
  return a[0].localeCompare(b[0]);
}
