<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Linear Search</span> is a searching technique for finding an item inside of a list of
          items. It is the most basic searching algorithm and is the cornerstone of searching algorithms.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Using Linear Search With Searching Problem
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Linear search, and all other searching algorithms, attempt to solve <span class="text-main">the searching
            problem</span>. To illustrate the searching problem, imagine that you are tasked with finding a number
          inside of a phone book.
        </p>
        <p>
          The phone book contains pages, and each page contains the phone numbers of a bunch of people.
        </p>
        <Figure src="/algorithms/searching-algorithms/linear-search/address-book-analogy.svg" class="max-w-xs"
          caption="A Phone Book and its Contents"></Figure>
        <p>
          The most basic and elementary way to solve this problem is to flip through each page and check each phone
          number until you find the one you are looking for; this is linear search.
        </p>
        <p>
          Let's assume the phone number you are look for is 555-369-1470. The following diagram illustrates how you can
          find the number using linear search:
        </p>
        <Figure src="/algorithms/searching-algorithms/linear-search/finding-a-phone-number.svg" class="max-w-lg"
          caption="Finding a Phone Number in a Phone Book"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          An Example of Linear Search
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Lets look at another example of using linear search, this time with the following list of integers. We will be
          tasked with finding the number "59":
        </p>
        <Figure src="/algorithms/searching-algorithms/linear-search/linear-search-problem-statement.svg"
          class="max-w-sm" caption="A List of Numbers and a Number to Search For"></Figure>
        <p>
          Often, the number that we will be searching for is referred to as the <span class="text-main">target</span>.
        </p>
        <p>
          Linear search will begin searching the list of numbers from left to right. First it will check if 14 = 59. If
          it does, then it has successfully found the number! If not, then it moves on to the next number.
        </p>
        <p>
          The process repeats until either a match is found, or the list runs out of numbers (meaning the target is not
          in the list). The following diagram demonstrates how linear search would find the target in the following list
          of numbers:
        </p>
        <Figure src="/algorithms/searching-algorithms/linear-search/linear-search-example.svg" class="max-w-sm"
          caption="Linear Search Looking For a Target of 59"></Figure>
        <Alert alert-style="note">
          <p>
            It is important to grasp the concept of linear search, regardless of how simple it seems, before moving on
            to other searching algorithms, as it provides the building blocks needed for learning them.
          </p>
        </Alert>
        <h2 class="mt-10 text-xl font-semibold">
          Key Metrics
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Linear search has a <span class="text-main">time complexity</span> of <span class="text-main">O(n)</span>,
          where n is the number of elements inside of the list.
        </p>
        <p>
          This means that for the worst case scenario, where the item we are looking for is at the very end of the list,
          linear search will have to check all "n" elements until it finds the match. Although this may not be a problem
          for a few numbers, it can become quite slow for large datasets with tens of millions of elements.
        </p>
        <p>
          The next searching algorithm will demonstrate a way to radically decrease the time needed for finding an
          element inside of the list.
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
          <div class="flex items-end gap-4">
            <div class="flex flex-col flex-1 gap-2">
              <label class="font-medium">Target:</label>
              <input type="number" class="w-full field" v-model="target" min="0" max="100">
            </div>
            <button type="button" class="btn" :disabled="numbers.length === 8" @click="addRow">Add Row</button>
          </div>
          <!-- Input table -->
          <table>
            <thead>
              <tr>
                <th>Numbers</th>
                <th></th> <!-- Extra header for delete button -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(_, idx) in numbers">
                <td>
                  <input type="number" v-model="numbers[idx]" min="0" max="100">
                </td>
                <td class="w-20 mx-auto text-center">
                  <TrashButton @click="removeRow(idx)" v-if="numbers.length > 1"></TrashButton>
                </td>
              </tr>
            </tbody>
          </table>
          <button type="submit" class="btn" @click.prevent="runAlgorithm">Run Algorithm</button>
        </form>

        <!-- Result component -->
        <h2 class="mt-10 text-xl font-semibold">
          Results
        </h2>
        <hr class="mb-4 border-neutral-800">
        <div v-if="hasAlgorithmBeenRan">
          <LinearSearch :target="target" :numbers="numbers" :log="algResults.log" :position="algResults.position">
          </LinearSearch>
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
import TrashButton from '@/components/general/TrashButton.vue';
import TabSwitcher from '@/components/TabSwitcher.vue';
import { reactive, ref, watch } from 'vue';
import { linearSearch } from '@/composables/searching-algorithms';
import EmptySpace from '@/components/general/EmptySpace.vue';
import LinearSearch from '@/components/algorithms/searching-algorithms/LinearSearch.vue';
import Alert from '@/components/general/Alert.vue';

const form = ref(null);

// Initialize sample data
const numbers = reactive([14, 5, 83, 3, 59, 76,]);
const target = ref(3);

// Store results and keep track of algorithm state
const algResults = reactive({
  log: null,
  position: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([numbers, target], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const num = Math.floor(Math.random() * 100);
  numbers.push(num);
};

const removeRow = (index) => {
  numbers.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Run the algorithm
  const { log, position } = linearSearch(numbers, target.value);
  algResults.log = log;
  algResults.position = position;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>