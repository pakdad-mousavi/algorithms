<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Quick Sort</span> is a <span class="text-main">divide and conquer</span> used to sort
          a series of numbers in order, either from smallest to largest (ascending order), or from largest to smallest
          (descending order).
        </p>
        <p>
          To learn more about how the sorting problem, see <span class="cursor-pointer text-main"
            @click="$router.push('/sorting-numbers/bubble-sort')">Bubble Sort</span>.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How Quick Sort Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Similarly to <span class="cursor-pointer text-main" @click="$router.push('/sorting-numbers/merge-sort')">merge
            sort</span>, this algorithm relies on splitting the list of numbers repeatedly. It works picking a <span
            class="text-main">pivot</span>, and then creating two subgroups where the first subgroup contains all
          numbers smaller than the pivot, and the right subgroup contains all numbers larger than the pivot.
        </p>
        <p>
          This process is repeated for all resulting subgroups until every subgroup contains only a single value.
        </p>
        <p>
          Consider the following list of numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/quick-sort/unsorted-numbers.svg" class="max-w-md"
          caption="A Series of Unsorted Numbers"></Figure>
        <p>
          First, a pivot needs to be chosen. Although the pivot can be any value in the list, choosing a poor pivot can
          affect the efficiency of the algorithm. For the sake of brevity, the middle value of the list will be our
          pivot.
        </p>
        <p>
          After a pivot is chosen, the each of the other values are compared to it. The values smaller than the pivot
          are separated into one subgroup, and the ones larger than it go into another.
        </p>
        <Figure src="/algorithms/sorting-numbers/quick-sort/sample-split-1.svg" class="max-w-md"
          caption="The First Split of Quick Sort"></Figure>
        <p>
          The process is then repeated for all subgroups with more than one value (which is both of them in this case).
        </p>
        <p>
          A pivot is chosen for both subgroups, and they are split into their own subgroups containing elements
          smaller than and greater than the pivot. Note that if all the values are smaller than or greater than the
          pivot, then only one subgroup is made.
        </p>
        <Figure src="/algorithms/sorting-numbers/quick-sort/sample-split-2.svg" class="max-w-md"
          caption="The Second Split of Quick Sort"></Figure>
        <p>
          Now, there is only one subgroup left containing more than one value. The process is repeated one final time
          for that subgroup like so:
        </p>
        <Figure src="/algorithms/sorting-numbers/quick-sort/sample-split-3.svg" class="max-w-md"
          caption="The Third and Final Split of Quick Sort"></Figure>
        <p>
          If you look closely, you'll notice that the numbers are already sorted from left to right. To put back the
          list together, join each subgroup together repeatedly in the following order: smaller subgroup - pivot -
          larger subgroup.
        </p>
        <Figure src="/algorithms/sorting-numbers/quick-sort/sample-result.svg" class="max-w-md"
          caption="The Final Pass of Selection Sort"></Figure>
        <p>
          By repeatedly finding the smallest number from the unsorted portion of the list and moving them to the
          beginning, we have sucessfully sorted the list!
        </p>
        <Alert alert-style="note">
          <p>
            Like <span class="text-main">merge sort</span>, quick sort has an <span class="text-main">average time
              complexity</span> of <span class="text-main">O(n log n)</span>, making it a highly efficient algorithm. To
            learn more about the significance of a logarithmic time complexity, see the "Key Metrics" section in <span
              class="cursor-pointer text-main" @click="$router.push('/sorting-numbers/merge-sort')">merge
              sort</span>.
          </p>
        </Alert>
        <h2 class="mt-10 text-xl font-semibold">
          Creating a BST for Quick Sort
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Quick sort can also lead to efficient searches for elements inside the list using a <span
            class="text-main">binary search tree (BST)</span>.
        </p>
        <p>
          To create a BST for quick sort, create a BST for each group/subgroup of values in the list; the root of the
          BST will be the pivot, the left child will be the smaller subgroup, and the right child will be the greater
          subgroup.
        </p>
        <Figure src="/algorithms/sorting-numbers/quick-sort/creating-quicksort-bst.svg" class="max-w-xl"
          caption="Creating a Binary Search Tree (BST) with Quick Sort"></Figure>
        <p>
          Then, simply put together all of the BST's to form a single BST. Each sub-BST's root is connected to its
          parent.
        </p>
        <Figure src="/algorithms/sorting-numbers/quick-sort/quicksort-bst-final.svg" class="max-w-md"
          caption="The Final Binary Search Tree (BST)"></Figure>
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
          <QuickSort :log="algResults.log"></QuickSort>
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
import { quickSort } from '@/composables/sorting-numbers';
import QuickSort from '@/components/algorithms/sorting-numbers/QuickSort.vue';

const form = ref(null);
const MAX_NUM = 100;

// Initialize sample data
const unsortedNumbers = reactive([27, 32, 47, 19, 12, 18, 13]);
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
  const log = quickSort(unsortedNumbers, isAscending.value);
  algResults.log = log;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>