export function pluralise(
  count: number,
  single: string,
  plural: string,
  includeNumber = true
) {
  const countStr = count === 1 ? single : plural;
  return includeNumber ? `${count} ${countStr}` : countStr;
}
