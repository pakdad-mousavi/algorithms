<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          The <span class="text-main">Sieve of Eratosthenes</span> introduces a very efficient way of finding all <span
            class="text-main">prime numbers</span> up to a certain number. A prime number is a number that is only
          divisible by 1 and itself.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          The Bouncer Analogy
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          The Sieve of Eratosthenes works by crossing out all multiples of the numbers that are uncrossed. Imagine
          you're at a giant party with all the numbers standing in a line.
        </p>
        <p>
          The bouncer (the sieve) starts letting the numbers in one by one. First up is the number 2. The bouncer says
          "cool, you're a prime number, welcome in! But all your multiples? Sorry, you're not special enough", and
          proceeds to remove 4, 6, 8, 10... from the line.
        </p>
        <p>
          Next is the number 3. Again, the bouncer lets 3 in the party, but gets rid of all of its multiples, 6, 9, 12,
          15... Some of them might already have been kicked out, but thats fine.
        </p>
        <p>
          This process keeps repeating until the only numbers left inside the party are actually prime numbers; that is
          the concept behind the sieve of Eratosthenes.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Understanding the Sieve of Eratosthenes
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          To begin using this algorithm, we need to first define a total. We will be finding all prime numbers up to
          this number. For this example, we'll take the total to be 20.
        </p>
        <p>
          Once we have a total, we can calculate a limit. The limit is calculated as the square root of the total; we
          will have to repeat the algorithm's process all the way up to this number.
        </p>
        <Figure src="/algorithms/number-theory/sieve-of-eratosthenes/total-and-limit.svg" class="max-w-xs"
          caption="Choosing a Total and Calculating the Limit"></Figure>
        <p>
          The next step is to list all of the numbers from 1 to our total in an array. We'll be finding all of the prime
          numbers in this list:
        </p>
        <Figure src="/algorithms/number-theory/sieve-of-eratosthenes/numbers-to-total.svg" class="max-w-xl"
          caption="Listing All Numbers Up To the Total"></Figure>
        <p>
          We can now start using the sieve of Eratosthenes! The first step is to simply cross out the 1, since 1 is a
          factor of all integers:
        </p>
        <Figure src="/algorithms/number-theory/sieve-of-eratosthenes/removal-1.svg" class="max-w-xl"
          caption="Crossing Out the First Number"></Figure>
        <p>
          We now move on to the next number: 2. Is 2 smaller than or equal to our limit (4) and uncrossed? Yes, so we
          need to cross out all multiples of 2 (except 2 itself).
        </p>
        <Figure src="/algorithms/number-theory/sieve-of-eratosthenes/removal-2.svg" class="max-w-xl"
          caption="Crossing Out All Multiples of 2"></Figure>
        <p>
          Just like that, we've already gotten ridden of 50% of our list of numbers. Now we can move on to the next
          number, 3. Just like before, we'll have to check: is 3 less that or equal to our limit (4) and uncrossed?
          Again, the answer is yes, so we'll cross out all multiples of 3:
        </p>
        <Figure src="/algorithms/number-theory/sieve-of-eratosthenes/removal-3.svg" class="max-w-xl"
          caption="Crossing Out All Multiples of 3"></Figure>
        <p>
          Great! Lets continue with the next number, 4. Is 4 less than or equal to our limit (4) and uncrossed? Well,
          while it is equal to our limit, it is already crossed out, so we can skip it:
        </p>
        <Figure src="/algorithms/number-theory/sieve-of-eratosthenes/removal-4.svg" class="max-w-xl"
          caption="Skipping the Number 4"></Figure>
        <p>
          Since the next number (5) is greater than our limit (4), we won't have to bother crossing it out.
        </p>
        <p>
          Just like that, we're done. The numbers that we are left with should all be prime numbers: 2, 3, 5, 7, 11, 13,
          17, and 19:
        </p>
        <Figure src="/algorithms/number-theory/sieve-of-eratosthenes/prime-numbers.svg" class="max-w-lg"
          caption="List of Prime Numbers"></Figure>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              Why do we only need to cross out numbers up to the limit, the square root of the total?
            </p>
            <p>
              Given that n is our total, supposed a number <span class="text-main">m ≤ n</span> is <span
                class="text-main">composite</span> (not prime), then it can be written as <span class="text-main">m = a
                × b</span>, where a and b are two integers.
            </p>
            <p>
              If both a and b were greater than √n, then their product a × b would be greater than n, but that can't
              happen, since m ≤ n, so at least one of the factors have to be ≤ √n. In other words, if m is composite, it
              will definitely be crossed out by the time we handle all primes up to √n.
            </p>
            <p>
              Lets look at a quick example with n = 25, and the limit being √25 = 5. We'll use 21 as m. The factors of
              21 are 3 and 7; since 3 ≤ 5, 21 will get crossed out when we process 3.
            </p>
            <p>
              Now lets take 25: its factors are 5 and 5. Since 5 ≤ 5, it gets crossed out at exactly 5. We never have to
              actually cross out numbers larger than √25, because by then all their multiples ≤ 25 are already gone.
            </p>
          </div>
        </Alert>
      </div>
    </template>

    <template #[tabs.visualizer.id]>
      <div class="mb-10 space-y-4">
        <!-- Visualizer goes here -->
        <h1 class="mb-4 text-xl font-semibold">
          Step By Step Illustration
        </h1>
        <hr class="mb-4 border-neutral-800">
        <form class="space-y-4" ref="form">
          <!-- Top bar -->
          <div class="flex flex-col w-full gap-2">
            <label class="font-medium">Total:</label>
            <input type="number" class="!w-full field" v-model="total" :min="10" :max="100">
          </div>
          <button type="submit" class="btn" @click.prevent="runAlgorithm">Run Algorithm</button>
        </form>

        <!-- Result component -->
        <h2 class="mt-10 text-xl font-semibold">
          Results
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div v-if="hasAlgorithmBeenRan">
          <SieveOfEratosthenes :total="total" :primes="algResults.primes" :log="algResults.log"></SieveOfEratosthenes>
        </div>
        <EmptySpace v-else>
          <p class="mb-4">
            No results to display yet, try running the algorithm...
          </p>
          <button @click.prevent="() => runAlgorithm()" class="btn">
            Run Algorithm
          </button>
        </EmptySpace>
      </div>
    </template>
  </TabSwitcher>
</template>

<script setup>
import { tabs } from '@/state/tabState';
import Figure from '@/components/general/Figure.vue';
import TabSwitcher from '@/components/TabSwitcher.vue';
import { reactive, ref, watch } from 'vue';
import SieveOfEratosthenes from '@/components/algorithms/number-theory/SieveOfEratosthenes.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';
import { sieveOfEratosthenes } from '@/composables/number-theory';

const form = ref(null);

// Initialize sample data
const total = ref(30);

// Keep track of algorithm state
const algResults = reactive({
  log: null,
  primes: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch(total, () => {
  hasAlgorithmBeenRan.value = false;
});

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Update algorithm results
  const { primes, log } = sieveOfEratosthenes(total.value);
  algResults.primes = primes;
  algResults.log = log;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>