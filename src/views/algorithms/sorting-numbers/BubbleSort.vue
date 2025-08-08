<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Bubble Sort</span> is a sorting algorithm used to sort a series of numbers in order,
          either from smallest to largest (ascending order), or from largest to smallest (descending order).
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          The Sorting Problem
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Lets say we have a series of numbers, in no particular order:
        </p>
        <Figure src="/algorithms/sorting-numbers/bubble-sort/unsorted-numbers.svg" class="max-w-lg"
          caption="A Series of Unsorted Numbers"></Figure>
        <p>
          These numbers need to be sorted in ascending order for us to work with. Now, a person can just compare the
          values and order them accordingly with ease, but a computer needs detailed instructions to do so.
        </p>
        <p>
          This is the problem that bubble sort, and all other sorting algorithms, try to solve. The following diagram
          shows the sorted version of the numbers above:
        </p>
        <Figure src="/algorithms/sorting-numbers/bubble-sort/sorted-numbers.svg" class="max-w-lg"
          caption="The Unsorted Numbers Sorted in Ascending Order"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          How Bubble Sort Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Bubble sort works by repeatedly comparing and swapping adjacent numbers if they are in the wrong order. It
          does this until the entire list of numbers is sorted. If a full pass is made with no swaps, the list is
          sorted.
        </p>
        <p>
          As the name suggests, larger numbers "bubble" up to the end of the list of numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/bubble-sort/numbers-bubble-up.svg" class="max-w-lg"
          caption="A Visual Representation of Bubble Sort"></Figure>
        <p>
          Lets look at an example. Take the following list of numbers (arranged vertically as well for easier
          representation):
        </p>
        <Figure src="/algorithms/sorting-numbers/bubble-sort/bubble-sort-example.svg" class="max-w-xs"
          caption="An Example List of Numbers"></Figure>
        <p>
          The algorithm starts comparing each pair of values one by one. If the bottom value is larger than the top
          value, they swap places. The following figure illustrates the first pass that bubble sort makes:
        </p>
        <Figure src="/algorithms/sorting-numbers/bubble-sort/bubble-sort-pass-1.svg" class="max-w-xl"
          caption="The First Pass of Bubble Sort"></Figure>
        <p>
          In the first pair (5 and 1), 5 is greater than 1, so they swap places. The current list order is now 1, 5, 4,
          2, and 8.
        </p>
        <p>
          In the second pair (5 and 4), 5 is greater than 4, so again, a swap occurs. The new list order is 1, 4, 5, 2,
          8. Then in the third pair (5 and 2), there is also another swap, as 5 is greater than 2.
        </p>
        <p>
          In the last pair (5 and 8), 5 is not greater than 8, therefore no swap occurs and the order remains the same.
        </p>
        <p>
          Since there were swaps made, we need to make another pass. The following diagram illustrates the second pass
          through the list:
        </p>
        <Figure src="/algorithms/sorting-numbers/bubble-sort/bubble-sort-pass-2.svg" class="max-w-xl"
          caption="The Second Pass of Bubble Sort"></Figure>
        <p>
          In the second pass, only the second pair (4 and 2) requires a swap since 4 is greater than 2. The rest of the
          pairs remain unchanged. The list is now sorted in ascending order!
        </p>
        <p>
          However, since a swap was made, the algorithm will make another pass through the numbers:
        </p>
        <Alert alert-style="note">
          <p>
            Although the list is already sorted, the algorithm still needs to make a pass through the numbers. This is
            because it cannot recognize that the list is already sorted, so it relies on whether a swap was made to
            determine if further passes are required or not.
          </p>
        </Alert>
        <Figure src="/algorithms/sorting-numbers/bubble-sort/bubble-sort-pass-3.svg" class="max-w-xl"
          caption="The Third and Final Pass of Bubble Sort"></Figure>
        <p>
          To order the numbers in descending order, simply reverse the greater than sign during the check: only swap if
          the first number is less than the other!
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
              <label class="font-medium">Ascending / Descending:</label>
              <select class="field" v-model="direction">
                <option value="ascending">Ascending</option>
                <option value="descending">Descending</option>
              </select>
            </div>
            <button type="button" class="btn" :disabled="unsortedNumbers.length === 8" @click="addRow">Add Row</button>
          </div>
          <!-- Input table -->
          <table>
            <thead>
              <tr>
                <th>Numbers to Sort</th>
                <th></th> <!-- Extra header for delete button -->
              </tr>
            </thead>
            <tbody>
              <tr v-for="(_, index) in unsortedNumbers">
                <td>
                  <input type="number" v-model="unsortedNumbers[index]" min="1" :max="MAX_NUM">
                </td>
                <td class="w-20 mx-auto text-center">
                  <TrashButton @click="removeRow(index)" v-if="unsortedNumbers.length > 1"></TrashButton>
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
          <BubbleSort :log="algResults.log" :is-ascending="isAscending"></BubbleSort>
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
import { computed, reactive, ref, watch } from 'vue';
import EmptySpace from '@/components/general/EmptySpace.vue';
import Alert from '@/components/general/Alert.vue';
import BubbleSort from '@/components/algorithms/sorting-numbers/BubbleSort.vue';
import { bubbleSort } from '@/composables/sorting-numbers';

const form = ref(null);
const MAX_NUM = 100;

// Initialize sample data
const unsortedNumbers = reactive([5, 1, 4, 2, 8]);
const direction = ref('ascending');
const isAscending = computed(() => direction.value === 'ascending');

// Store results and keep track of algorithm state
const algResults = reactive({
  log: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([unsortedNumbers, direction], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const randomNumber = Math.round((Math.random() * MAX_NUM));
  unsortedNumbers.push(randomNumber);
};

const removeRow = (index) => {
  unsortedNumbers.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Run the algorithm
  const log = bubbleSort(unsortedNumbers, isAscending.value, 'bubble');
  algResults.log = log;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>