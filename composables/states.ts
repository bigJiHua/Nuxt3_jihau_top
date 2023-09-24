export function useCounter() {
  return useState<number>('counter', () => 0);
}