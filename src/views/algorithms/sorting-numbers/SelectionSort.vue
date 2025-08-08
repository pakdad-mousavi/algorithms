<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Selection Sort</span> is a sorting algorithm used to sort a series of numbers in
          order, either from smallest to largest (ascending order), or from largest to smallest (descending order).
        </p>
        <p>
          To learn more about how the sorting problem, see <span class="cursor-pointer text-main"
            @click="$router.push('/sorting-numbers/bubble-sort')">Bubble Sort</span>.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How Selection Sort Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Unlike <span class="text-main">bubble sort</span>, selection sort works by repeatedly finding the smallest
          number in the list of numbers and swapping it with the number in front of the previously swapped number at the
          beginning of the list.
        </p>
        <p>
          Consider the following list of numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/selection-sort/unsorted-numbers.svg" class="max-w-xs"
          caption="A Series of Unsorted Numbers"></Figure>
        <p>
          First, the algorithm will find the smallest number in the list. After doing so, it will swap it with the first
          number in the list. This is the first pass of the algorithm over the numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/selection-sort/selection-sort-pass-1.svg" class="max-w-xs"
          caption="The First Pass of Selection Sort"></Figure>
        <p>
          The algorithm then begins its second pass over the numbers. This time, it only scans from the second number
          onwards, and finds the smallest number, since the first number is in the correct place.
        </p>
        <p>
          After finding the smallest number, it swaps it with the number in from of the previously swapped number:
        </p>
        <Figure src="/algorithms/sorting-numbers/selection-sort/selection-sort-pass-2.svg" class="max-w-xs"
          caption="The Second Pass of Selection Sort"></Figure>
        <p>
          The same process is repeated for the third pass:
        </p>
        <Figure src="/algorithms/sorting-numbers/selection-sort/selection-sort-pass-3.svg" class="max-w-xs"
          caption="The Third Pass of Selection Sort"></Figure>
        <p>
          As well as for the fourth pass:
        </p>
        <Figure src="/algorithms/sorting-numbers/selection-sort/selection-sort-pass-4.svg" class="max-w-xs"
          caption="The Final Pass of Selection Sort"></Figure>
        <p>
          By repeatedly finding the smallest number from the unsorted portion of the list and moving them to the
          beginning, we have sucessfully sorted the list!
        </p>
        <Alert alert-style="note">
          <p>
            Selection sort makes much less swaps than bubble sort, however, given a list of "n" elements, it has to make
            n - 1 passes through the list in order to ensure it is fully sorted; unlike bubble sort, it cannot stop
            early.
          </p>
        </Alert>
        <p>
          Below is the final sorted version of the unsorted numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/selection-sort/sorted-numbers.svg" class="max-w-xs"
          caption="Sorted Numbers"></Figure>
        <p>
          To sort the list in descending order, the exact same process is repeated, with the exception that instead of
          finding the smallest number, the largest number is found.
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
          <SelectionSort :log="algResults.log"></SelectionSort>
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
import { selectionSort } from '@/composables/sorting-numbers';
import SelectionSort from '@/components/algorithms/sorting-numbers/SelectionSort.vue';

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
  const log = selectionSort(unsortedNumbers, isAscending.value, 'bubble');
  algResults.log = log;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>