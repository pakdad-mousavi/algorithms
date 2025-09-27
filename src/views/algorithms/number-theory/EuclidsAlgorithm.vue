<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <!-- Explanation for "Euclid's Algorithm" goes here -->
        <p>
          <span class="text-main">Euclid's Algorithm</span> is a method of finding the <span class="text-main">greatest
            common divisor (GCD)</span> of two numbers. The GCD of two numbers is the largest number that can divide
          both of them without leaving a remainder.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Understanding the Greatest Common Divisor (GCD)
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Lets say we have two numbers, 48 and 18. We will be looking for the greatest common divisor, which is the
          number that can divide both numbers without leaving any remainder. In this case, the GCD is 6, as its the
          largest factor of both numbers.
        </p>
        <p>
          One way to do this is by <span class="text-main">prime factorization</span>. We'll need to split our two
          numbers into their prime factors, and then multiply all the factors that both numbers have. Although this
          works for small numbers, doing this process for larger ones is extremely slow.
        </p>
        <p>
          We'll be looking at a more efficient solution to this problem: Euclid's Algorithm.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          The Farmland Analogy
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Imagine you have a rectangular piece of farmland. This farmland is 660m long and 420m wide, and you are tasked
          with dividing the farmland into square plots.
        </p>
        <Figure src="/algorithms/number-theory/euclids-algorithm/empty-farmland.svg" class="max-w-xl"
          caption="A Piece of Farmland"></Figure>
        <p>
          The only catch is, the square plots cannot simply be any size, they must be the largest possible size, i.e,
          all of the plots must be equal squares of the largest size. The question is, how can we figure out the largest
          size a square can be?
        </p>
        <Figure src="/algorithms/number-theory/euclids-algorithm/finding-the-gcd.svg" class="max-w-xl"
          caption="Finding the Size of a Plot in the Farmland"></Figure>
        <p>
          We can solve this using Euclid's Algorithm. To do this, we need to repeatedly take the larger side of the
          farmland and divide it by the smaller side, and seeing if we get a remainder.
        </p>
        <p>
          If we get a remainder, then we need to repeat the process with the smaller side from earlier, and the newly
          calculated remainder. If there is no remainder, then we've successfully found our GCD! Lets go back to our
          farmland:
        </p>
        <Figure src="/algorithms/number-theory/euclids-algorithm/division-1.svg" class="max-w-xl"
          caption="The First Division of Euclid's Algorithm"></Figure>
        <p>
          First we'll take the smaller side of 420m and try to fit as many squares as we can inside the farmland. As
          illustrated above, we can only fit one, with a 240m by 420m strip of empty space left.
        </p>
        <p>
          Since we have empty space, we'll have to redo the process for this empty space, now taking using a 240m square
          (the smaller side of the strip) to fill the space:
        </p>
        <Figure src="/algorithms/number-theory/euclids-algorithm/division-2.svg" class="max-w-xl"
          caption="The Second Division of Euclid's Algorithm"></Figure>
        <p>
          Again, we can only fit a single square of 240m in this empty space. This time, we are left with an empty strip
          of space of 240m by 180m.
        </p>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              Notice how after each step a huge portion of the empty space is filled up? That's what makes this
              algorithm so much more efficient than prime factorization!
            </p>
            <p>
              The <span class="text-main">time complexity</span> of this algorithm is <span
                class="text-main">O(log(min(a, b)))</span>, making it much faster in finding the GCD of a pair of
              numbers than that of breaking each number down to its consectutive prime factors.
            </p>
          </div>
        </Alert>
        <p>
          Lets repeat the process for the leftover empty space, using the smaller side of 180m:
        </p>
        <Figure src="/algorithms/number-theory/euclids-algorithm/division-3.svg" class="max-w-xl"
          caption="The Third Division of Euclid's Algorithm"></Figure>
        <p>
          Yet again, we could only fit a single square, leaving us with a 180m by 60m empty strip of space. We'll have
          to do this one more time, using the smaller side of 60m:
        </p>
        <Figure src="/algorithms/number-theory/euclids-algorithm/division-4.svg" class="max-w-md"
          caption="The Final Division of Euclid's Algorithm"></Figure>
        <p>
          This time we managed to fit 3 squares of 60m, leaving no empty space (i.e, our remainder is now zero), so GCD
          is 60, or in other words, the largest size squares we can divide the field up into are squares of 60m by 60m.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          The Fibonacci Sequence
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Notice any special pattern in our plot of farmland from earlier? If you look closely, it resembles the shape
          of the <span class="text-main">Fibonacci Spiral</span> very closely! Turns out that using Euclid's algorithm
          on two numbers from the Fibonacci sequence have the slowest performance times of all.
        </p>
        <p>
          If you try the same process using an adjacent pair of fibonacci numbers, you'll see that the resulting
          remainder is always the previous number in the series; certainly a cool pattern to know about!
        </p>
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
          <div class="flex gap-x-4">
            <div class="flex flex-col w-1/2 gap-2">
              <label class="font-medium">Number 1:</label>
              <input type="number" class="!w-full field" v-model="numberOne">
            </div>
            <div class="flex flex-col w-1/2 gap-2">
              <label class="font-medium">Number 2:</label>
              <input type="number" class="!w-full field" v-model="numberTwo">
            </div>
          </div>
          <button type="submit" class="btn" @click.prevent="runAlgorithm">Run Algorithm</button>
        </form>

        <!-- Result component -->
        <h2 class="mt-10 text-xl font-semibold">
          Results
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div v-if="hasAlgorithmBeenRan">
          <EuclidsAlgorithm :number-one="numberOne" :number-two="numberTwo"></EuclidsAlgorithm>
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
import { ref, watch } from 'vue';
import EuclidsAlgorithm from '@/components/algorithms/number-theory/EuclidsAlgorithm.vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';

const form = ref(null);

// Initialize sample data
const numberOne = ref(660);
const numberTwo = ref(420);

// Keep track of algorithm state
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([numberOne, numberTwo], () => {
  hasAlgorithmBeenRan.value = false;
});

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>