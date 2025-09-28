export const sieveOfEratosthenes = (n) => {
  const log = [];

  // Create an array filled with true (potential primes)
  const isPrime = new Array(n + 1).fill(true);
  isPrime[0] = false;
  isPrime[1] = false;

  // Cross out multiples
  for (let p = 2; p * p <= n; p++) {
    if (isPrime[p]) {
      // Cross out all multiples of p
      for (let multiple = p * p; multiple <= n; multiple += p) {
        isPrime[multiple] = false;
      }

      // Collect current uncrossed numbers
      const currPrimes = [];
      for (let i = 2; i <= n; i++) {
        if (isPrime[i]) currPrimes.push(i);
      }

      // Update log
      log.push([p, currPrimes.slice()]);
    }
  }

  // Collect final remaining primes
  const primes = [];
  for (let i = 2; i <= n; i++) {
    if (isPrime[i]) primes.push(i);
  }

  return { primes, log };
};
