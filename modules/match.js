export function createMatch(data) {
  return {
    ...data,
    id: crypto.randomUUID()
  };
}