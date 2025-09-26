<template>
  <TabSwitcher>
    <template #[tabs.howItWorks.id]>
      <div class="mb-10 space-y-4">
        <p>
          <span class="text-main">Bucket Sort</span> is a sorting algorithm used to sort relatively <span
            class="text-main">evenly distributed</span> numbers which are in a certain <span
            class="text-main">range</span>, either from smallest to largest (ascending order), or from largest to
          smallest (descending order).
        </p>
        <p>
          This algorithm tries to simplify the sorting problem by splitting the large number of values that need to be
          sorted into smaller <span class="text-main">buckets</span> which can be sorted much faster.
        </p>
        <p>
          To learn more about how the sorting problem, see <span class="cursor-pointer text-main"
            @click="$router.push('/sorting-numbers/bubble-sort')">Bubble Sort</span>.
        </p>
        <h2 class="mt-10 text-xl font-semibold">
          The Lottery Ticket Analogy
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          To best understand bucket sort, we will be sorting lottery ticket numbers.
        </p>
        <p>
          Lottery tickets are usually numbered from 0 to a large number in the millions. This means that they are evenly
          distributed, and they are in a known range; bucket sort works best under these conditions. Lets assume we have
          100 lottery tickets, numbered from 1 - 100:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/ticket-sample.svg" class="max-w-lg"
          caption="100 Lottery Tickets Numbered From 1 - 100"></Figure>
        <p>
          This algorithm relies on splitting the numbers (or in our case, lottery ticket numbers) into different piles,
          or <span class="text-main">buckets</span>. Usually, given that we have n items, we will need √n buckets. In
          our case, that would be √100 piles, which is exactly 10 different piles.
        </p>
        <p>
          Each pile will be given an equal range of numbers. In our case, that will be that will be 001 - 010 for the
          first pile, 011 - 020 for the second pile, and so on:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/empty-piles.svg" class="max-w-2xl"
          caption="A Series of Empty Piles"></Figure>
        <p>
          Once we have our empty piles, we'll need to fill them up. We go through all of our jumbled lottery tickets and
          put them in the pile that they belong to:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/filled-piles.svg" class="max-w-2xl"
          caption="Filled Up Piles"></Figure>
        <p>
          The piles now contain a very similar number of items; this is why it is important that the values to be sorted
          with bucket sort are evenly distributed. If they weren't one pile may have had 90 of the tickets, while the
          other would only have 10, which would greatly slow down bucket sort.
        </p>
        <p>
          Now that we only have 10 items in each pile, we can sort the lottery ticket numbers in each one very quickly,
          using an algorithm like <span class="text-main hover:cursor-pointer"
            @click="$router.push('/sorting-numbers/insertion-sort')">insertion sort</span>:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/sorting-piles.svg" class="max-w-2xl"
          caption="Sorting the Filled Piles"></Figure>
        <p>
          Once all of the piles are sorted, we can simply put each pile one after the other to create our final sorted
          list of lottery ticket numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/joint-piles.svg" class="max-w-md"
          caption="Joining the Piles"></Figure>
        <h2 class="mt-10 text-xl font-semibold">
          Bucket Sort With Example Numbers
        </h2>
        <hr class="mb-4 border-neutral-800">
        <p>
          Lets look at an actual example. Consider the following series of numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/unsorted-numbers.svg" class="max-w-lg"
          caption="A Series of Unsorted Numbers"></Figure>
        <p>
          The numbers span from 0 to 9, and are relatively evenly distributed; bucket sort is a viable option!
        </p>
        <p>
          To continue, we'll make 3 empty buckets to sort our numbers in. All values from 0 - 2 will be go in the first
          bucket, values 3 - 5 will go in the second bucket, and finally, values 6 - 9 will go in the third and final
          bucket:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/empty-buckets.svg" class="max-w-xl"
          caption="Three Empty Buckets"></Figure>
        <p>
          Now that we have our buckets, we'll have to fill them up with our values:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/filled-buckets.svg" class="max-w-xl"
          caption="Three Filled Buckets"></Figure>
        <p>
          Next comes the sorting. Similarly to our lottery ticket number sorting, we will need to sort each bucket on
          its own, using an algorithm such as <span class="text-main">insertion sort</span>:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/sorted-buckets.svg" class="max-w-xl"
          caption="Three Filled and Sorted Buckets"></Figure>
        <p>
          Finally, we simply join the buckets back together in order, giving us our final sorted array of numbers:
        </p>
        <Figure src="/algorithms/sorting-numbers/bucket-sort/sorted-numbers.svg" class="max-w-lg"
          caption="Sorted Numbers Using Bucket Sort"></Figure>
        <Alert alert-style="note">
          <div class="space-y-4">
            <p>
              Bucket sort has very specific requirements: the input values must lie within a known range and be
              reasonably evenly distributed. Because of this, it is most commonly demonstrated with floating-point
              numbers in the interval [0.0, 1.0).
            </p>
            <p>
              These constraints limit its usefulness in practice, so bucket sort is rarely applied outside of
              educational or highly specialized contexts.
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
            <button type="button" class="btn" :disabled="unsortedNumbers.length === 10" @click="addRow">Add Row</button>
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
                  <input type="number" v-model="unsortedNumbers[index]" min="0" :max="MAX_NUM" step="0.01">
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
          <BucketSort :k="algResults.k" :unsorted-buckets="algResults.unsortedBuckets"
            :sorted-buckets="algResults.sortedBuckets" :sorted-nums="algResults.sortedNums"></BucketSort>
          {{ algResults.log }}
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
import { bucketSort } from '@/composables/sorting-numbers';
import BucketSort from '@/components/algorithms/sorting-numbers/BucketSort.vue';
import Alert from '@/components/general/Alert.vue';

const form = ref(null);
const MAX_NUM = 0.99;

// Initialize sample data
const unsortedNumbers = reactive([0.78, 0.17, 0.39, 0.26, 0.72, 0.94, 0.21, 0.12, 0.23, 0.68]);
const direction = ref('ascending');
const isAscending = computed(() => direction.value === 'ascending');

// Store results and keep track of algorithm state
const algResults = reactive({
  k: null,
  unsortedBuckets: null,
  sortedBuckets: null,
  sortedNums: null,
});
const hasAlgorithmBeenRan = ref(false);

// Hide results
watch([unsortedNumbers, direction], () => {
  hasAlgorithmBeenRan.value = false;
});

const addRow = () => {
  const randomNumber = Math.round(Math.random() * 100) / 100;
  unsortedNumbers.push(randomNumber);
};

const removeRow = (index) => {
  unsortedNumbers.splice(index, 1);
};

const runAlgorithm = () => {
  const isFormValid = form.value.checkValidity();
  if (!isFormValid) return form.value.reportValidity();

  // Run the algorithm
  const { k, unsortedBuckets, sortedBuckets, sortedNums } = bucketSort(unsortedNumbers, isAscending.value);
  algResults.k = k;
  algResults.unsortedBuckets = unsortedBuckets;
  algResults.sortedBuckets = sortedBuckets;
  algResults.sortedNums = sortedNums;

  // Display results
  hasAlgorithmBeenRan.value = true;
}

</script>