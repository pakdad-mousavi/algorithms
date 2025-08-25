<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Merge Sort</span> is a <span class="text-main">divide and conquer</span> sorting
          algorithm used to sort a series of numbers in order, either from smallest to largest (ascending order), or
          from largest to smallest (descending order).
        </p>
        <p>
          To learn more about how the sorting problem, see <span class="cursor-pointer text-main"
            @click="$router.push('/sorting-numbers/bubble-sort')">Bubble Sort</span>.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          How Merge Sort Works
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Consider the following list of numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/unsorted-numbers.svg" class="max-w-xs"
          caption="A List of Unsorted Numbers"></Figure>
        <p>
          Merge sort works by repeatedly <span class="text-main">dividing</span> the list of numbers into halves until
          it reaches a single element (which is already sorted):
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/splitting-numbers.svg" class="max-w-xl"
          caption="Splitting a List Into Halves"></Figure>
        <p>
          You are then left with a series of number pairs. You may also have a singular number value if the total number
          of values in the list was odd:
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/split-number-pairs.svg" class="max-w-md"
          caption="A Series of Number Pairs and a Singular Value"></Figure>
        <p>
          Sorting the list is easy now! Each singular value can already be considered to be sorted, since it is only one
          value. All that's left to do is put the numbers back together in the correct order.
        </p>
        <p>
          The merge sort algorithm <span class="text-main">conquers</span> by merging the small sorted arrays back
          together into bigger sorted arrays. It repeat merging until you have one fully sorted array:
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/merging-number-pairs.svg" class="max-w-md"
          caption="Merging Smaller Sorted Arrays Into a Singular Sorted Array"></Figure>
        <p>
          Just like that, merge sort has successfully sorted the list, by breaking the problem down into smaller more
          manageable subproblems, solving those problems, and putting the result back up together.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          Merging Two Piles Together
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Now that the concept of merge sort has been explained, lets move onto the details. How does merge sort know
          how to correctly merge two sorted subarrays together, to form a larger sorted array?
        </p>
        <p>
          First, the algorithm assigns a <span class="text-main">head</span> to each pile. The head will point to the
          first item in each pile:
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/intializing-pile-merge.svg" class="max-w-xs"
          caption="Initializing the Merge of Two Piles"></Figure>
        <p>
          The algorithm then compares the two values that each of the heads point to. The lesser value is added to the
          new sorted pile.
        </p>
        <p>
          Afterwards, the head position of the pile which had the lesser value is incremented by 1, to point to the next
          value inside of the pile:
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/pile-merge-1.svg" class="max-w-xs"
          caption="The First Pass of Merging the Pile Together"></Figure>
        <p>
          This works because the algorithm no longer needs to worry about the other values in the piles, because they
          are already sorted!
        </p>
        <p>
          The same process is then repeated:
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/pile-merge-2.svg" class="max-w-xs"
          caption="The Second Pass of Merging the Pile Together"></Figure>
        <p>
          And once more:
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/pile-merge-3.svg" class="max-w-xs"
          caption="The Third Pass of Merging the Pile Together"></Figure>
        <p>
          Note that if the items in a pile finish, the process is stopped, and the rest of the values from the remaining
          pile are dumped to the end of the new pile:
        </p>
        <Figure src="/algorithms/sorting-numbers/merge-sort/pile-merge-4.svg" class="max-w-xs"
          caption="The Final Pass of Merging the Pile Together"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          Key Metrics
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Merge sort has a <span class="text-main">time complexity</span> of <span class="text-main">O(n log n)</span>
          (where "n" is the total number of values being sorted). This means that it exponentially decreases the time
          needed to sort the array, making it an extremely efficient algorithm when it comes to sorting numbers.
        </p>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              To put this into perspective, imagine sorting 1000 numbers.
            </p>
            <p>
              With algorithms like <span class="text-main">bubble sort</span>, <span class="text-main">selection
                sort</span>, or <span class="text-main">insertion sort</span>, with a time complexity of <span
                class="text-main">O(n<sup>2</sup>)</span>, there would be 1,000 * 1,000 = 1,000,000 operations made,
              taking about 16.6 minutes (assuming that each operation takes 1 ms)!
            </p>
            <p>
              With merge sort, there would be 1000 * log<sub>2</sub>(1000) ≈ 9,966 operations made, taking about just 10
              seconds; a significant difference.
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
          <MergeSort :log="algResults.log" :is-ascending="isAscending" :initial="unsortedNumbers"></MergeSort>
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
import MergeSort from '@/components/algorithms/sorting-numbers/MergeSort.vue';
import { mergeSort } from '@/composables/sorting-numbers';

const form = ref(null);
const MAX_NUM = 100;

// Initialize sample data
const unsortedNumbers = reactive([5, 1, 4, 2, 8, 6, 9, 7]);
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
  const log = mergeSort(unsortedNumbers, isAscending.value);
  algResults.log = log;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>